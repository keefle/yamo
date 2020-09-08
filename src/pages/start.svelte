<script>
  import Yamo from './yamo.svelte';
  import { mode_list } from '../stores/gameconfig.js';
  import gamemode from '../stores/gameconfig.js';

  import {
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Button,
    Container
  } from 'sveltestrap';


   let selected_mode = mode_list[0];

   $: { gamemode.update((old) => (selected_mode)) }
</script>



<div>
    <Yamo />
    <br/>
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Mode</InputGroupText>
      </InputGroupAddon>
      <Input bind:value={selected_mode} type="select" name="select" id="modeSelect">
       {#each mode_list as mode}
           <option value={mode}> {mode.name} </option>
       {/each}
      </Input>
    </InputGroup>
</div>
