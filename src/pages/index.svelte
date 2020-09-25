<script>
  import { Button, ButtonGroup } from "sveltestrap";
  import { url } from "@roxi/routify";
</script>

<div class="w-100 h-100 d-flex flex-column justify-content-center">
  <ButtonGroup class="btn-group-vertical">
      <Button color="primary"   href="play"       >Play</Button>
      <Button color="secondary" href="leaderboard">Leaderboard</Button>
    </ButtonGroup>
</div>
