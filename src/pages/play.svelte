<script>
  import Game from "../components/game.svelte";
  import GameInfo from "../components/gameinfo.svelte";
  import GameOver from "../components/gameover.svelte";
  import game_status from "../stores/gamestatus.js";

  import ModesPicker from "../components/modes-picker.svelte";
  import gameconfig from "../stores/gameconfig.js";

  import { Button, ButtonGroup } from "sveltestrap";
  import { url } from "@roxi/routify";
</script>

<div class="w-100 h-100 d-flex flex-column justify-content-center">

  <div class="w-75 align-self-center mt-4 mb-auto">
    <GameInfo />
  </div>

  <div class="align-self-center" style="margin-bottom: 20px;">
    {#if $game_status.state !== 'DONE'}
      <Game />
    {:else}
      <GameOver />
    {/if}
  </div>

  <div class="d-flex flex-column pb-2 mt-auto">
    <ButtonGroup vertical>
      <ButtonGroup class="align-self-end">
        <Button href="settings"> Settings </Button>
        <Button
          disabled={$game_status.state === 'READY'}
          color="danger"
          on:click={() => gameconfig.update((mode) => mode)}>
          Restart
        </Button>
      </ButtonGroup>
      <ModesPicker />
      <Button href="leaderboard" color="info">Leaderboard</Button>
    </ButtonGroup>
  </div>
</div>
