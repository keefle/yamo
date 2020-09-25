<script>
  import {
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Button,
    ButtonGroup,
    Container,
  } from "sveltestrap";

  import { colors, color } from "../stores/gameconfig.js";

  let selected_color = $color;

  $: {
    color.update((old) => selected_color);
  }
</script>

<ButtonGroup>
  {#each colors as color}
    <Button active={color.name === selected_color.name} on:click={() => (selected_color = color)}> {color.name} </Button>
  {/each}
</ButtonGroup>
