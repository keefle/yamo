import { writable } from 'svelte/store';

let colors = [ "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#9A6324", "#800000", "#a9a9a9"];

let modes = [
 {name: "3x3", cols: 3, rows: 3, no_blocks: 3*3*3, colors: colors, active: true},
 {name: "4x4", cols: 4, rows: 4, no_blocks: 4*4*4, colors: colors, active: true},
 {name: "5x5", cols: 5, rows: 5, no_blocks: 5*5*5, colors: colors, active: true},
 {name: "zen", cols: 3, rows: 3, no_blocks: -1, colors: colors, active: false},
]
export const mode_list = modes;

const gameconfig =  writable(JSON.parse(localStorage.getItem("gameconfig")) || modes[0]);
gameconfig.subscribe(val => localStorage.setItem("gameconfig", JSON.stringify(val)));

export default gameconfig;
