<script>
  import { Button, ButtonGroup } from "sveltestrap";
  import Settings from "../components/settings.svelte";
</script>

<style>
  h3 {
    text-align: center;
  }
</style>

<h3 class="mt-4 pb-4 text-align-center">Settings</h3>
<Settings />
<ButtonGroup  class="mt-auto mb-2">
<Button color="primary" href="play">Play</Button>
<Button color="secondary" href="/">Main Page</Button>
</ButtonGroup>
