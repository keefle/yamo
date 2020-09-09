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
  import { fetch_country_code } from '../api.js';
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

  let username = $user.name;
  let country  = $user.country;

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

  let setCountryCode = async() => {
    if (country) {
      return;
    }
    console.log("lets try")

    fetch_country_code().then(resp => country = countries[resp]).catch(e => country = countries[0]);
    // if (cr) {
    //   country = countries[cr];
    // }
    console.log("survive dis?")
  }

  let promise = setCountryCode();

</script>


{#await promise then data}

  <Container>
    <InputGroup>
    <InputGroupAddon addonType="prepend">
    <InputGroupText>@</InputGroupText>
</InputGroupAddon>
<Input bind:value={username} placeholder={$user.name} />
</InputGroup>

<br>
<InputGroup>
<InputGroupAddon addonType="prepend">
<InputGroupText>Country</InputGroupText>
</InputGroupAddon>
<Input bind:value={country} type="select" name="select" id="exampleSelect">
{#each Object.keys(countries) as country_code}
  <option value={countries[country_code]}>{countries[country_code]}</option>
{/each}
  </Input>
  </InputGroup>
  </Container>

  {/await}
