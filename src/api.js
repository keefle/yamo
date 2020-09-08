const website = { space_name: "wwwimx", backend: "https://imx.sh" };

export async function imx_pub_query(subpath, resource_types, resource_shortnames = [], query_type = "subpath", search ="*", limit=10, offset=0) {
	const browse_url = `${website.backend}/query/${website.space_name}/${subpath}?query_type=${query_type}&search=${encodeURI(search)}&resource_types=${resource_types}&resource_shortnames=${resource_shortnames.join(',')}&offset=${offset}&limit=${limit}`;
	const browse_headers = {'Accept': 'application/json', 'Connection': 'close'};
	const browse_request = {
			method: 'GET',
			headers: browse_headers,
			credentials: 'include',
			cache: 'no-cache',
			mode: 'cors'
	};
	const json = await imx_fetch(browse_url, browse_request);
    return json;
}

export async function imx_pub_submit(interaction_type, subpath, parent_shortname=null, attributes = {}) {
  let curruser = "anon";
  const request = {
    actor_shortname: curruser,
    space_name: website.space_name,
    request_type: "submit",
    records:[{
      resource_type: interaction_type,
      shortname: "dummy",
      subpath: subpath,
      attributes: attributes
    }]
  };

  if(parent_shortname)
    request.records[0].parent_shortname = parent_shortname;

  let formdata = new FormData();
  formdata.append("request", JSON.stringify(request));
  const browse_url = `${website.backend}/submit`;
  const browse_headers = {'Accept': 'application/json', 'Connection': 'close'};
  const browse_request = {
      method: 'POST',
      headers: browse_headers,
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors',
      body: formdata
  };
  return imx_fetch(browse_url, browse_request);
}


async function imx_fetch(url, request) {
    let response = await fetch(url, request);
    const reader = response.body.getReader();
    var td = new TextDecoder("utf-8");
    var chunks = [];
    var total_length = 0;
    while(true) {
      const result = await reader.read();
      if(result.done) {
        break;
      } else {
        chunks.push(result.value);
        total_length += result.value.length;
      }
    }
    let data = new Uint8Array(total_length);
    let position = 0;
    for(let chunk of chunks) {
      data.set(chunk, position);
      position+=chunk.length;
    }

    let decoded = td.decode(data);
    return JSON.parse(decoded);
}
