<script>
  import Notifications from "svelte-notifications";
  import { Container } from "sveltestrap";
</script>

<style>
  :global(.makespace) {
    margin-bottom: 20px;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href="/bootstrap.min.css" />
</svelte:head>

<Notifications>
  <div class="w-100 h-100 user-select-none">
    <Container class="w-100 h-100 d-flex justify-content-center flex-column">
      <slot />
    </Container>
  </div>
</Notifications>