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
  <div class="user-select-none">
    <!--Navbar class="makespace" color="light" light>
      <NavbarBrand href="/" class="mr-auto">YaMo</NavbarBrand>
      <NavbarToggler on:click={toggle} className="mr-2" />
      <Collapse {isOpen} navbar>
      <Nav navbar>
        <NavItem>
          <NavLink on:click={toggle} href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink on:click={toggle} href="start">Play</NavLink>
        </NavItem>
        <NavItem>
          <NavLink on:click={toggle} href="leaderboard">Leader Board</NavLink>
        </NavItem>
        <NavItem>
          <NavLink on:click={toggle} href="settings">Settings</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar-->

  <Container class="w-100 d-flex justify-content-center flex-column pt-4">
    <slot />
  </Container>
  </div>
  </Notifications>
<style>
  :global(.makespace) {
    margin-bottom: 20px;
  }
</style>
