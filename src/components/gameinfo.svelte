<script>
  import game_status from "../stores/gamestatus.js";
  import game_config from "../stores/gameconfig.js";
  import user from "../stores/user.js";
  import Settings from "../components/settings.svelte";

  import {Modal, ModalHeader} from "sveltestrap";

  let size;
  let showuserdetails = false; // $user.name === "anon";
  let userdetailsToggle = () => (showuserdetails = !showuserdetails);
</script>

<Modal isOpen={showuserdetails} {userdetailsToggle} {size}>
  <ModalHeader {userdetailsToggle}> User Details </ModalHeader>
  <Settings onSave={userdetailsToggle}/>
</Modal>

<div class="d-flex align-self-stretch justify-content-between align-items-center">
  <span class="text-secondary h5"> {$game_config.no_blocks !== -1 ?  $game_status.blocks_remaining : "∞" } / {$game_config.no_blocks === -1 ? "∞": $game_config.no_blocks} </span>
  <span class="text-secondary h5"> {$game_config.no_blocks === -1 ? "∞" : ($game_status.duration/1000).toFixed(2)} s</span>
</div>

<div class="d-flex align-self-stretch justify-content-center align-items-center">
  <span on:click={userdetailsToggle} class="text-dark h3"> {$user.name.toUpperCase()} </span>
</div>
