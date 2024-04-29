// chars.js 

let allTab = document.querySelectorAll('a');
let allSec = document.querySelectorAll('section');

allTab.forEach( el => {
    el.addEventListener("click", e => {
        openTab(e.target.id.slice(0,-3))
        setColor(e.target.id)
    });
});

function openTab(sec) {
  let i;
  for (i = 0; i < allSec.length; i++) {
	  allSec[i].style.display = "none";
  }
  document.getElementById(sec).style.display = "block";
}

function setColor(tab) {
    let i;
    for (i=0; i < allTab.length; i++) {
        if (allTab[i].id == tab) {
            allTab[i].style.backgroundColor = '#fdf5e6'
        } else {
            allTab[i].style.backgroundColor = '#d1e7ef'
        }
    }
}

function sb_open() {
  document.getElementById("sb1").style.display = "block";
}

function sb_close() {
  document.getElementById("sb1").style.display = "none";
}
