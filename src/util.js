import {imx_pub_submit} from "./api.js";
import { getNotificationsContext } from "svelte-notifications";

export function shuffle(array) {
	let counter = array.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);

		counter--;

		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}


export async function upload_score(username, country, result, modename) {
	let attributes = {
		username: username,
		country: country,
		modename: modename,
		result: result
	};


	let resp = await imx_pub_submit("feedback", "yamo", null, attributes);
	if (resp.results[0].status !== "success") {
		const { addNotification } = getNotificationsContext();
		addNotification({
			text: "Failed to submit new record...",
			position: "bottom-center",
			type: "error",
			removeAfter: 4000
		});
	}
}