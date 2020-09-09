<script>
  import Yamo from './yamo.svelte';
  import ModesPicker from '../components/modes-picker.svelte';
  import { Button, ButtonGroup } from 'sveltestrap';
  import { url } from '@roxi/routify'
</script>



<Yamo />
<div class="d-flex flex-column pb-2">
<ButtonGroup vertical>
<ModesPicker />
<Button href="leaderboard" color="info"> Leaderboard </Button>
</ButtonGroup>
</div>
