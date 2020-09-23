<script>
  import { shuffle, upload_score } from "../util.js";
  import { color } from "../stores/gameconfig.js";
  import game_mode from "../stores/gameconfig.js";
  import game_status from "../stores/gamestatus.js";
  import user from "../stores/user.js";

  function new_block(color, disabled) {
    if (color < 0) {
      color = "white";
    } else {
      color = colors[color];
    }
    return { color: color, disabled: disabled };
  }

  let colors = $color.val;
  let cols = $game_mode.cols;
  let rows = $game_mode.rows;
  let grid_size = cols * rows;
  let no_blocks = $game_mode.no_blocks;
  let time_interval_id;

  let flash = "white";
  let grid = Array(grid_size);
  let strip = Array(grid_size);

  let start_time;
  let end_time;

  $: game_status.update((gstatus) => {
    gstatus.blocks_remaining = no_blocks;
    return gstatus;
  });

  $: game_status.update((gstatus) => {
    if (end_time - start_time < 0) {
      gstatus.duration = 0;
    } else {
      gstatus.duration = end_time - start_time;
    }
    return gstatus;
  });

  function init() {
    game_status.setReady();
    colors = $color.val;
    cols = $game_mode.cols;
    rows = $game_mode.rows;
    grid_size = cols * rows;
    no_blocks = $game_mode.no_blocks;
    flash = "white";
    grid = Array(grid_size);
    strip = Array(grid_size);
    start_time = null;
    end_time = null;
    clearInterval(time_interval_id);

    for (let i = 0; i < grid_size; i++) {
      grid[i] = new_block(Math.floor(Math.random() * colors.length), false);
    }

    grid = shuffle(grid);
    strip = shuffle(grid.slice());
  }

  game_mode.subscribe(init);
  color.subscribe(init);

  let innerWidth;
  let innerHeight;

  function correctChoice(index) {
    let block;
    if (no_blocks === -1) {
      block = new_block(Math.floor(Math.random() * colors.length), false);
    } else if (no_blocks > grid_size) {
      block = new_block(Math.floor(Math.random() * colors.length), false);
    } else {
      block = new_block(-1, true);
    }

    if (no_blocks > 0) {
      no_blocks--;
    }

    strip.pop();
    grid[index] = block;
    strip = [block, ...strip];

    if (no_blocks === 0) {
      clearInterval(time_interval_id);
      game_status.setDone();
      upload_score(
        $user.name,
        $user.country,
        ($game_status.duration / 1000).toFixed(2),
        $game_mode.name
      );
    }
  }

  function wrongChoice(index) {
    flash = "red";
    setTimeout(() => (flash = "white"), 50);
    window.navigator.vibrate(50);
  }

  function handleClick(index) {
    return (clickEvent) => {
      clickEvent.preventDefault();
      if (!start_time) {
        start_time = Date.now();
        time_interval_id = setInterval(() => (end_time = Date.now()), 0);
        game_status.setRunning();
      }

      if (
        flash == "white" &&
        grid[index].color === strip[strip.length - 1].color
      ) {
        correctChoice(index, index);
        return;
      }

      wrongChoice(index);
    };
  }
</script>

<style>
  board {
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-gap: 5px;
    height: var(--width);
    width: var(--width);
    margin-bottom: 5%;
  }

  .glowing {
    animation: pulse-animation 2s infinite !important;
  }

  @keyframes pulse-animation {
    50% {
      transform: scale(0.5);
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes blockEntrance {
    from {
      opacity: 0;
      transform: scale(0.3);
      filter: hue-rotate(180deg);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: hue-rotate(0deg);
    }
  }

  .block {
    animation: blockEntrance 700ms ease-out;
    border: none;
    outline: none !important;
    border-radius: 5px;
    transition: all 200ms ease-in-out;
  }

  .block:hover {
    transform: scale(1.02);
  }

  .block:focus {
    transform: scale(1.02);
    outline: none;
  }

  strip {
    --gridsize: calc(var(--cols) * var(--rows));
    width: var(--width);
    height: calc(var(--width) / (9.5));
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 5px;
  }
</style>

<main
  style="display: flex; align-self: center; justify-content: center; flex-direction: column; --cols: {cols}; --rows: {rows}; --width: {innerHeight > innerWidth ? '90vw' : '70vh'};">
  {#if no_blocks !== 0}
    <board
      style="border: solid; border-color: {flash}; padding: 5px; border-width: 5px; border-radius: 5px;">
      {#each grid as block, index}
        <button
          class={!start_time && block.color === strip[strip.length - 1].color ? 'block glowing' : 'block'}
          disabled={block.disabled}
          on:touchstart={handleClick(index, block.color)}
          on:mousedown={handleClick(index, block.color)}
          style="background-color: {block.color};" />
      {/each}
    </board>

    <strip>
      {#each strip.slice(Math.max(strip.length - 9, 0), strip.length) as block, index}
        <button
          class="block {!start_time && index === 8 ? 'glowing' : ''}"
          style="background-color: {block.color};" />
      {/each}
    </strip>
  {/if}
</main>

<svelte:window bind:innerHeight bind:innerWidth />
