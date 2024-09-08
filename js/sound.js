//		/js/sound.js

let play = document.querySelector("#play");
let playing = document.querySelector("#playing");

// NB: Browsers will not play any audio until a user clicks something!
// Run your Tone.js code only after calling Tone.start() from an event 
// listener which is triggered by a “click” or “keydown”.
play.addEventListener("click", async () => 
	{
		await Tone.start();
		console.log("audio is ready");
		play.style = "display: none";
		playing.style = " ";	
	},
	false
);

const synth = new Tone.Synth({
	oscillator: {type: "sine"},
	envelope: {attack: 0, decay: 0, sustain: 1, release: 0},
	volume: -6
}).toDestination();

synth.triggerAttackRelease("A4", 2, 0);

