<script>
  import Yamo from './yamo.svelte';
  import ModesPicker from '../components/modes-picker.svelte';
  import { Button, ButtonGroup } from 'sveltestrap';
  import { fade } from 'svelte/transition';
  import { url } from '@roxi/routify'

</script>



<div class="w-100 h-100" in:fade="{{ duration: 1000 }}">
  <Yamo />
  <div class="d-flex flex-column pb-2">
    <ButtonGroup vertical>
      <ModesPicker />
      <Button href="leaderboard" color="info"> Leaderboard </Button>
    </ButtonGroup>
  </div>
</div>
