import { writable } from "svelte/store";

const game_status  = writable({state: "READY", blocks_remaining: 0, duration: 0});

game_status.setRunning = function() {
	game_status.update((gstatus) => {
		gstatus.state = "RUNNING";
		return gstatus;
	});
};

game_status.setDone = function() {
	game_status.update((gstatus) => {
		gstatus.state = "DONE";
		return gstatus;
	});
};

game_status.setReady = function() {
	game_status.update((gstatus) => {
		gstatus.state = "READY";
		gstatus.duration = 0;
		return gstatus; });
};

game_status.is_running = function() {
	return this.state === "RUNNING";
};



export default game_status;
