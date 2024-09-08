//		/js/sound.js

let play = document.querySelector("#play");
let playing = document.querySelector("#playing");

play.addEventListener("click", () => {
	play.style = "display: none";
	playing.style = " ";
});

/*
Tone.start();

let synth = new Tone.Synth({
	oscillator: {type: "sine"},
	envelope: {attack: 0, decay: 0, sustain: 1, release: 0},
	volume: -6
}).toDestination();

synth.triggerAttackRelease("A4", 2, 0);
*/

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");
