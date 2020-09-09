<script>
  import Yamo from './yamo.svelte';
  import ModesPicker from '../components/modes-picker.svelte';
  import { Button } from 'sveltestrap';
  import { url } from '@roxi/routify'
</script>



<Yamo />
<ModesPicker />
<Button href="leaderboard" color="info"> Leaderboard </Button>
