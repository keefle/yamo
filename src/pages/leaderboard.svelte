<script>
  import { imx_pub_query } from "./../api.js";
  import { Spinner, Button, Table } from "sveltestrap";
  import ModesPicker from "../components/modes-picker.svelte";
  import game_mode from "../stores/gameconfig.js";
  import { mode_list } from "../stores/gameconfig.js";

  let mode;

  game_mode.subscribe((gameMode) => {
    mode = gameMode;
  });

  let leaderboard = {};
  let records = [];
  let current_leaderboard = [];
  let loading = true;

  let load = async () => {
    let resp = await imx_pub_query(
      "submissions/yamo",
      ["feedback"],
      [],
      "subpath",
      "*",
      500,
      0
    );
    records = resp.records;
    records = records.map((record) => record.attributes);
    let recordsByMode = {};

    for (let i = 0; i < mode_list.length; i++) {
      recordsByMode[mode_list[i].name] = records.filter(
        (record) => record.modename === mode_list[i].name
      );
    }

    Object.keys(recordsByMode).map((mode) => {
      let leaderboard = recordsByMode[mode];
      let userRecords = {};
      for (let i = 0; i < leaderboard.length; i++) {
        if (
          userRecords[leaderboard[i].username] == null ||
          leaderboard[i].result <= userRecords[leaderboard[i].username].result
        ) {
          userRecords[leaderboard[i].username] = leaderboard[i];
        }
      }

      recordsByMode[mode] = [];
      for (var username of Object.keys(userRecords)) {
        recordsByMode[mode].push(userRecords[username]);
      }
      recordsByMode[mode].sort(function (a, b) {
        return a.result - b.result;
      });
    });

    loading = false;
    leaderboard = recordsByMode;
    current_leaderboard = leaderboard[mode.name];
  };

  let promise = load();

  $: {
    current_leaderboard = leaderboard[mode.name];
  }
</script>

<div class="justify-content-center flex-column d-flex h-100 w-100">
  <h3 class="mt-4 mb-auto align-self-center">Leaderboard</h3>

  <ModesPicker />

  <div style="min-height: 70%; max-height: 70%; overflow: auto;">
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
        {#if !loading}
          {#each current_leaderboard as record, index}
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{record.username}</td>
              <td>{record.country}</td>
              <td>{record.result}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </Table>
    {#if loading}
      <div class="d-flex justify-content-center">
        <Spinner color="info" />
      </div>
    {/if}
  </div>

  <Button class="mt-auto mb-2" href="/" color="primary">Back to game</Button>
</div>
