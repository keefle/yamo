<script>
  import Notifications from 'svelte-notifications';

  import { Navbar, NavbarToggler,NavbarBrand, Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Button, Nav, NavItem, NavLink, Container, Row } from 'sveltestrap';


  let size;
  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>


<svelte:head>
  <link rel="stylesheet" href="/bootstrap.min.css">
</svelte:head>

<Notifications>
  <div class="w-100 h-100 user-select-none">
    <Container class="w-100 h-100 d-flex justify-content-center flex-column">
      <slot />
    </Container>
  </div>
</Notifications>
<style>
  :global(.makespace) {
  margin-bottom: 20px;
  }
</style>
