import { writable } from 'svelte/store';

let colors = [
    {
        name: "Default",
        val: ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#9A6324", "#800000", "#a9a9a9"]
    },
    {
        name: "Sofi's mix",
        val: ["#00ff80", "#d40000", "#0600ff", "#ffff00", "#c87137", "#1c1f24", "#ff6600", "#ccaaff", "#800033", "#00ffff", "#808000", "#ef1a80"]
    }
];


const colorchoice  = writable(JSON.parse(localStorage.getItem("colorchoice")) || colors[0]);
colorchoice.subscribe(val => localStorage.setItem("colorchoice", JSON.stringify(val)));

let modes = [
    {name: "3x3", cols: 3, rows: 3, no_blocks: 3*3*4, active: true},
    {name: "1x1", cols: 3, rows: 3, no_blocks: 1*1*1, active: true},
    {name: "4x4", cols: 4, rows: 4, no_blocks: 4*4*4, active: true},
    {name: "5x5", cols: 5, rows: 5, no_blocks: 5*5*4, active: true},
    {name: "zen", cols: 3, rows: 3, no_blocks: -1,    active: true},
];

const gameconfig =  writable(JSON.parse(localStorage.getItem("gameconfig")) || modes[0]);
gameconfig.subscribe(val => localStorage.setItem("gameconfig", JSON.stringify(val)));

export const colorschemes = colors;
export const mode_list = modes;
export const color = colorchoice;
export default gameconfig;
