<script>
  import { url } from '@roxi/routify'
  import game_mode from "../stores/gameconfig.js";
  import user_detail from "../stores/user.js";
  import {Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'sveltestrap';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();

  import { onMount } from "svelte";
  import { imx_pub_submit } from "../api.js";
  import { Canvas, Layer, t} from "svelte-canvas";



  let mode;
  let user;

  let innerWidth;
  let innerHeight;

  let tileSize;
  let width;
  let height;
  let cwidth;
  let cheight;
  let strip;
  let grid;
  let notify;
  let start_time;
  let end_time;
  let result;
  let grid_size;
  let last_select;

  let size;
  const toggle = () => {
    size = undefined;
    result = !result;
  };


  let init = () => {
      tileSize = 0;
      width = 0;
      height = 0;
      cwidth = 0;
      cheight = 0;
      strip = [];
      grid = [];
      notify = false;
      start_time = false;
      end_time = false;
      result = false;
      grid_size = 0;
      grid_size = mode.cols * mode.rows;
      last_select = true;

      if (Math.ceil(innerHeight/innerWidth) == 2) {
          tileSize = Math.min(innerHeight, innerWidth)/(0.5+mode.cols)
      } else {
          tileSize = Math.min(innerHeight, innerWidth)/(2+mode.cols)
      }
      width  = 10 + tileSize * mode.cols
      height = tileSize * mode.rows + tileSize

      strip  = generate_blocks(mode.no_blocks, mode.colors.length);
      grid   = shuffle(strip.slice(strip.length - grid_size, strip.length));
  }

  game_mode.subscribe(
      (gameMode) => {
          mode = gameMode;
          init();
      });

  user_detail.subscribe((userdetail) => (user = userdetail));
  onMount(() => {
    init();
  })

  function shuffle(array) {
      let counter = array.length;

      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);

          counter--;

          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
  }

  function generate_blocks(no_blocks, no_colors) {
      let blocks = [];

      for (let i = 0; i < no_blocks; i++) {
          let color = Math.floor(Math.random() * Math.floor(no_colors-1));
          blocks.push(color);
      }

      return blocks;
  }

  function draw_block(context, x, y, width, height, color) {
       context.fillStyle = mode.colors[color];
       context.fillRect(x, y, width, height);
       context.strokeStyle = "black"
       context.strokeRect(x, y, width, height);
  }

  function draw_stroke(context, x, y, width, height, color) {
       context.fillStyle = mode.colors[color];
       context.fillRect(x, y, width, height);
       context.strokeStyle = "black"
       context.strokeRect(x, y, width, height);
       context.clearRect(x+5, y+5, width-10, height-10);
  }

  function draw_bars(context) {
    for (let i = 0; i < mode.cols+1; i++) {
        context.beginPath();
        context.rect(Math.min(Math.max(0, tileSize*i-1), tileSize*mode.cols-2), 0, 2, tileSize*mode.rows)
        context.fillStyle = "black";
        context.fill();
        context.closePath();
    }

    for (let i = 0; i < mode.rows+1; i++) {
        context.beginPath();
        context.rect(0, Math.min(Math.max(0, tileSize*i-1), tileSize*mode.rows-2), tileSize*mode.cols, 2)
        context.fillStyle = "black";
        context.fill();
        context.closePath();
    }
  }

  function draw_grid(context) {
      for (let i = 0; i < grid.length; i++) {
          let y = 5 + (tileSize) * Math.floor(i / mode.cols)
          let x = 5 + tileSize * (i % mode.cols)
          if (typeof grid[i] !== 'undefined') {
              draw_block(context, x, y, tileSize, tileSize, grid[i]);
          }
      }
  }

  function  draw_strip(context) {
        let y = tileSize * mode.rows + tileSize/2;

        let displayed_strip = strip.slice(strip.length - Math.min(grid_size, strip.length) ,strip.length);

        let tileSize_here = mode.cols * tileSize / grid_size;

        let shift = (grid_size - displayed_strip.length)*tileSize_here
        for (let i = 0; i < displayed_strip.length; i++) {
            let x = 5 + shift + tileSize_here * i;
            draw_block(context, x, y, tileSize_here, tileSize_here, displayed_strip[i]);
        }
    }

    function check_status() {
        if (strip.length == 0) {
            let end_time = Date.now()
            let date = new Date(end_time-start_time);
            result = date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000;
            upload_score(user.name, user.country, result);
        }
    }

    async function upload_score(username, country, result) {
        let attributes = {
          username: username,
          country: country,
          result: result
        };


        let resp = await imx_pub_submit("feedback", "yamo", null, attributes);
        if (resp.results[0].status === "success") {

          addNotification({
            text: 'Submitted New Record!',
            position: 'bottom-center',
            type: 'success',
            removeAfter: 4000
          })
        }
      }


  function draw_flash(context) {
    draw_stroke(context, 0, 0, tileSize*mode.cols+10, tileSize*mode.rows+10, "red");
    setTimeout(() => {
      last_select = true;
    }, 50)
  }

  $: render = ({ context, width, height }) => {
    strip;
    if(!last_select) {
        draw_flash(context)
    }
    draw_grid(context);
    draw_strip(context);
  };

  function handleClick(e) {
      e.preventDefault();

      var rect = e.target.getBoundingClientRect();
      if (e.touches) {
          var layerX = e.targetTouches[0].pageX - rect.left;
          var layerY = e.targetTouches[0].pageY - rect.top;
      } else {
          var layerX = e.pageX - rect.left;
          var layerY = e.pageY - rect.top;
      }

      let x = Math.floor((layerX - 5)/ tileSize)
      let y = Math.floor((layerY - 5)/ tileSize)

      if (grid[y * mode.cols + x] === strip[strip.length-1]) {
          grid[y * mode.cols + x] = strip[strip.length-1-grid_size];
          strip.pop();
          strip = strip
      } else {
         strip = strip
         last_select = false;
      }

      if (!start_time) {
        start_time = Date.now();
      }

      check_status();
  }

 //
</script>


<svelte:window bind:innerHeight={innerHeight} bind:innerWidth={innerWidth}/>

<div>
    {#if strip.length != 0}
    <wrapper>
        <Canvas on:touchstart={handleClick}  on:mousedown={handleClick} width={width} height={height}>
          <Layer {render} />
        </Canvas>
    </wrapper>
    {/if}

        <Modal isOpen={result} {toggle} {size}>
        <ModalHeader {toggle}>Kaboomed it</ModalHeader>
        <ModalBody>
            {user.name}, you have finished {mode.name} in {result} seconds!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" on:click={() => { toggle(); init();}}> Try Again? </Button>
          <Button color="info"    href={$url('leaderboard')}> Visit Leader Board</Button>
        </ModalFooter>
      </Modal>
</div>


<style>
    wrapper {
       display: flex;
       justify-content: center;
    }
</style>
