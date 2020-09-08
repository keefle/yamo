<script>
import { imx_pub_query } from './../api.js';
import { Table } from 'sveltestrap';

let leaderboard = [];
let records = [];

let load = async() => {
let resp = await imx_pub_query("submissions/yamo", ["feedback"], [], "subpath", "*", 10, 0)
    records = resp.records;
    records = records.map((record) => (record.attributes))

    let userRecords = {}
    for (let i = 0; i < records.length; i++) {
        if (userRecords[records[i].username] == null || records[i].result < userRecords[records[i].username].result) {
            userRecords[records[i].username] = records[i]
        }
    }


    records = []
    for (var username of Object.keys(userRecords)) {
        records.push(userRecords[username]);
    }

    leaderboard = records.sort(
        function(a, b) {
            return a.result - b.result;
        }
    )
}

load()
</script>

<h3> Leaderboard </h3>

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
    {#each records as record, index}
        <tr>
          <th scope="row">{index+1}</th>
          <td>{record.username}</td>
          <td>{record.country}</td>
          <td>{record.result}</td>
        </tr>
    {/each}
  </tbody>
</Table>
