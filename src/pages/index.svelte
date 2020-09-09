<script>
  import Yamo from './yamo.svelte';
  import ModesPicker from '../components/modes-picker.svelte';
  import { Button } from 'sveltestrap';
  import { url } from '@roxi/routify'
</script>



<Yamo />
<br/>
<ModesPicker class="align-self-center" />
<br/>
<Button href="leaderboard" color="primary"> Leaderboard </Button>
