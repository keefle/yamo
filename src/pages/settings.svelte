<script>
  import {
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Container,
  } from 'sveltestrap';

  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  import countries from '../stores/countries.js';

  import user from '../stores/user.js';

  function valid_username(value) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (value == "") {
        error = "You didn't enter a username";
          addNotification({
            text: error,
            position: 'bottom-center',
            type: 'error',
            removeAfter: 4000
          })
        return false;

    } else if (illegalChars.test(value)) {
        error = "The username contains illegal characters";
          addNotification({
            text: error,
            position: 'bottom-center',
            type: 'error',
            removeAfter: 4000
          })
		return false;
    }

    return true;
  }

  let oldname;
  user.subscribe(userdata => (oldname = userdata.name));

  let oldcountry;
  user.subscribe(userdata => (oldcountry = userdata.country));

  let username = oldname;
  let country  = oldcountry;

  $: { user.update(userdata => {
      if (valid_username(username)) {
         userdata.name = username;
      }
      return userdata;
      })
  }

  $: { user.update(userdata => {
      userdata.country = country;
      return userdata;
      })
  }
</script>


<svelte:head>
  <link rel="stylesheet" href="/bootstrap.min.css">
</svelte:head>

<Container>
    <h1> Settings Page </h1>
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>@</InputGroupText>
      </InputGroupAddon>
      <Input bind:value={username} placeholder={oldname} />
    </InputGroup>

    <br>
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Country</InputGroupText>
      </InputGroupAddon>
    <Input bind:value={country} type="select" name="select" id="exampleSelect">
      {#each countries as country}
          <option value={country}>{country}</option>
      {/each}
    </Input>
    </InputGroup>
</Container>
