<script>
  import game_status from "../stores/gamestatus.js";
  import game_config from "../stores/gameconfig.js";
  import user from "../stores/user.js";
  import { Badge } from "sveltestrap";

</script>


<h3 class="align-self-center" style="text-align: center;"> <Badge>Mode { $game_config.name }</Badge> </h3>
<h2 class="align-self-center" style="text-align: center;"> Done in {($game_status.duration/1000).toFixed(2)} seconds </h2>


<style>
  @keyframes blockEntrance {
    from {
      opacity: 0;
      transform: scale(0.3);
      filter: hue-rotate(180deg);
    }
    to {
      opacity: 1.0;
      transform: scale(1);
      filter: hue-rotate(0deg);
    }
  }

  h3, h2 {
    animation: blockEntrance 700ms ease-in-out;
    transition: all 200ms ease-in-out;
  }

  pop {
    animation: blockEntrance 700ms ease-in-out;
  }
</style>
