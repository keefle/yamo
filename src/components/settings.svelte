<script>
  import {
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Input,
    Label,
    Button,
  } from "sveltestrap";

  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();
  import countries from "../stores/countries.js";
  import { fetch_country_code } from "../api.js";
  import user from "../stores/user.js";
  export let onSave = () => "";
  import ColorSelector from "../components/colorscheme-picker.svelte";

  function valid_username(value) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (value == "") {
      error = "You didn't enter a username";
      addNotification({
        text: error,
        position: "bottom-center",
        type: "error",
        removeAfter: 4000,
      });
      return false;
    } else if (illegalChars.test(value)) {
      error = "The username contains illegal characters";
      addNotification({
        text: error,
        position: "bottom-center",
        type: "error",
        removeAfter: 4000,
      });
      return false;
    }

    return true;
  }

  let username = $user.name;
  let country = $user.country;

  function updateName() {
    user.update((userdata) => {
      userdata.country = country;
      if (valid_username(username)) {
        userdata.name = username;
      }
      return userdata;
    });

    onSave();
  }

  $: {
    username;
    country;
    updateName();
  }

  let setCountryCode = async () => {
    if (country) {
      return;
    }
    fetch_country_code()
      .then((resp) => {
        country = countries[resp];
        updateName();
      })
      .catch((e) => {
        country = countries[0];
        updateName();
      });
  };

  let promise = setCountryCode();
</script>

<container>
  {#await promise then data}
    {#if $user.name === 'anon'}
      <Label>Choose a user name</Label>
    {/if}
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>@</InputGroupText>
      </InputGroupAddon>
      <Input bind:value={username} placeholder={$user.name} />
    </InputGroup>

    <br />

    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Country</InputGroupText>
      </InputGroupAddon>
      <Input
        bind:value={country}
        type="select"
        name="selectCountry"
        id="countrySelect">
        {#each Object.keys(countries) as country_code}
          <option value={countries[country_code]}>
            {countries[country_code]}
          </option>
        {/each}
      </Input>
    </InputGroup>

    <br />

    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Colorscheme</InputGroupText>
      </InputGroupAddon>
      <ColorSelector />
    </InputGroup>
  {/await}
</container>
