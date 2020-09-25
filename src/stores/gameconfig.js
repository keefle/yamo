import { writable } from "svelte/store";

let colors = [
	{
		name: "Default",
		val: [
			"#1b9e77",
			"#d95f02",
			"#7570b3",
			"#e7298a",
			"#66a61e",
			"#e6cb02",
			"#a6761d",
			"#666666",
		]
	},
	{
		name: "Lightish",
		val: [
			"#66c2a5",
			"#fc8d62",
			"#8da0cb",
			"#e78ac3",
			"#a6d854",
			"#ffd92f",
			"#e5c494",
			"#b3b3b3",
		]
	},
	{
		name: "Sofi's mix",
		val: ["#00ff80", "#d40000", "#0600ff", "#ffff00", "#c87137", "#1c1f24", "#ff6600", "#ccaaff", "#800033", "#00ffff", "#808000", "#ef1a80"]
	}
];


const colorchoice = writable(JSON.parse(localStorage.getItem("colorchoice")) || colors[0]);
colorchoice.subscribe(val => localStorage.setItem("colorchoice", JSON.stringify(val)));

let modes = [
	{ name: "3x3", cols: 3, rows: 3, no_blocks: 3 * 3 * 4, active: true },
	{ name: "4x4", cols: 4, rows: 4, no_blocks: 4 * 4 * 4, active: true },
	{ name: "5x5", cols: 5, rows: 5, no_blocks: 5 * 5 * 4, active: true },
	{ name: "zen", cols: 3, rows: 3, no_blocks: -1, active: true },
];

const gameconfig = writable(JSON.parse(localStorage.getItem("gameconfig")) || modes[0]);
gameconfig.subscribe(val => localStorage.setItem("gameconfig", JSON.stringify(val)));

export { colors };
export const mode_list = modes;
export const color = colorchoice;
export default gameconfig;
