<script>
  import { Button, ButtonGroup } from "sveltestrap";
  import { url } from "@roxi/routify";
</script>

<style>
  img {
    height: 20%;
  }
</style>

<div class="w-100 h-100 d-flex flex-column justify-content-center">
  <img class="align-self-center mt-auto mb-4" alt="yamo logo" src="/yamo.svg" />
  <h1 class="align-self-center mb-auto"> Yamo </h1>

  <ButtonGroup class="mb-auto mt-auto" vertical>
    <Button size="lg" color="primary" href="play">Play</Button>
    <Button size="lg" color="info" href="leaderboard">Leaderboard</Button>
    <Button size="lg" color="secondary" href="settings">Settings</Button>
  </ButtonGroup>
</div>
