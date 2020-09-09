<script>
  import { imx_pub_query } from './../api.js';
  import { Button, Table } from 'sveltestrap';
  import ModesPicker from '../components/modes-picker.svelte';
  import game_mode from "../stores/gameconfig.js";
  import { mode_list } from "../stores/gameconfig.js";

  let mode;

  game_mode.subscribe(
    (gameMode) => {
      mode = gameMode;
    });


  let leaderboard = {};
  let records = [];
  let current_leaderboard = [];

  let load = async() => {
    let resp = await imx_pub_query("submissions/yamo", ["feedback"], [], "subpath", "*", 100, 0)
    records = resp.records;
    records = records.map((record) => (record.attributes))
    let recordsByMode = {};

    for (let i = 0; i < mode_list.length; i++) {
      recordsByMode[mode_list[i].name] = records.filter(record => (record.modename === mode_list[i].name));
    }


    Object.keys(recordsByMode).map((mode) => {
      let leaderboard = recordsByMode[mode]
      let userRecords = {}
      for (let i = 0; i < leaderboard.length; i++) {
        if (userRecords[leaderboard[i].username] == null || leaderboard[i].result <= userRecords[leaderboard[i].username].result) {
          userRecords[leaderboard[i].username] = leaderboard[i]
        }
      }

      recordsByMode[mode] = []
      for (var username of Object.keys(userRecords)) {
        recordsByMode[mode].push(userRecords[username]);
      }
      recordsByMode[mode].sort(
        function(a, b) {
          return a.result - b.result;
        })

    })

    leaderboard = recordsByMode;
    current_leaderboard = leaderboard[mode.name];
  }

  let promise = load();

  $: { current_leaderboard = leaderboard[mode.name]; }
</script>

{#await promise then data}

<h3 style="height: 10%;" class="pt-4 align-self-center"> Leaderboard </h3>
<ModesPicker />

<div style="min-height: 70%;">
<Table hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Country</th>
      <th>Record (seconds)</th>
    </tr>
  </thead>
  <tbody>
    {#each current_leaderboard as record, index}
      <tr>
        <th scope="row">{index+1}</th>
        <td>{record.username}</td>
        <td>{record.country}</td>
        <td>{record.result}</td>
      </tr>
    {/each}
  </tbody>
</Table>
</div>

<Button class="pb-2" href="/" color="primary"> Back to game </Button>
{/await}
