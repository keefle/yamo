<script>
  import {
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Button,
    ButtonGroup,
    Container
  } from 'sveltestrap';

  import { mode_list } from '../stores/gameconfig.js';
  import gamemode from '../stores/gameconfig.js';

  let selected_mode = mode_list[0];

  $: { gamemode.update((old) => (selected_mode)) }
</script>


<ButtonGroup>
  {#each mode_list as mode}
    <Button disabled={!mode.active} active={mode.name === selected_mode.name} on:click={() => (selected_mode = mode)}> {mode.name} </Button>
  {/each}
</ButtonGroup>

