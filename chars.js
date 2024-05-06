// chars.js 

const char = document.getElementById('char')
const pinyin = document.getElementById('pinyin')
const meaning = document.getElementById('meaning')
const find = document.getElementById('find')
const show = document.getElementById('show')

let allTab = document.querySelectorAll('a');
let allSec = document.querySelectorAll('section');

// Keep a copy of 'data' for use with 'prev' & 'next' buttons
let arr = [];   
let idx = -1; 

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("load-btn").addEventListener('click', (e) => loadFile() )
  document.getElementById("prev").addEventListener('click', (e) => prevChar() )
  document.getElementById("next").addEventListener('click', (e) => nextChar() )
  document.getElementById("find-btn").addEventListener('click', (e) => findChar() )
});

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

async function fetchData(url) {
    let res = await fetch( url, {cache:"no-store"} )
    return await res.json()
}

async function loadFile() {
  let url = document.getElementById('file').value
  if (url) {
    // IMPORTANT: if I put 'await' in front of fetchData(), everything is broken!
    // EXPLANATION: Instead of a Promise, a normal Array is returned, 
    // so makeSelect() is screwed up - it expects a Promise.

    let data = fetchData(url)
    makeOptions(data, 'pinyin-sel')
    makeOptions(data, 'meaning-sel', 'YES')
    addEvents('select')

    arr = await fetchData(url)
    
    // build & output a list of chars
    let txt = ''
    for (const val of arr) {
			txt += val[0]
		}
		show.innerText = txt
  }
}

// if any 4th parameter is passed - the "Meaning" column will be used.
async function makeOptions(promise, elem) {
  // ALL code (incl. 'let s = ...' and 'doc.getElementById') must be INSIDE .then(...)
  promise.then(obj => {
    let s = '';
    if (arguments.length < 3) 
      obj.forEach( i => { s += `<option value="${i}">${i[0]} ${i[2]}</option>` }) 
    else
      obj.forEach( i => { s += `<option value="${i}">${i[3]}</option>` }) 
    // Do NOT quote variables!
    let el = document.getElementById(elem)
    el.innerHTML = s
    el.addEventListener('change', (e) => {
      char.innerText = e.target.value[0] 
      trad.innerText = e.target.value.split(',')[1]
      pinyin.innerText = e.target.value.split(',')[2]
      meaning.innerText = e.target.value.split(',')[3]
      idx = e.target.selectedIndex      
    })
  })
}

function addEvents(query) {
  let els = document.querySelectorAll(query)
  let char = document.getElementById("char")
  if (els) {
    els.forEach(el => {el.addEventListener("change", (evt) => 
        { char.innerText = evt.target.value })
    })
  }
}    

function prevChar() {
  if (arr[idx-1]) {
    if ( idx <= 0 ) idx = 1;
    char.innerText = arr[idx-1][0]
    trad.innerText = arr[idx-1][1]    
    pinyin.innerText = arr[idx-1][2]
    meaning.innerText = arr[idx-1][3]
    idx--
  }
}      

function nextChar() {
  if (arr[idx+1]) {
    if ( idx == arr.length-1) idx = -1;
    char.innerText = arr[idx+1][0]
    trad.innerText = arr[idx+1][1]    
    pinyin.innerText = arr[idx+1][2]
    meaning.innerText = arr[idx+1][3]
    idx++
  }
}

function findChar() {
  if (find.value != '' && arr.length != 0) {
    let found = false
    let val = find.value.trim()
    // Three params are passed into the callback: 
    // the element (e), index (i) and array itself (a)
    arr.findIndex( (e,i,a) => {
      if ( e[0] === val ) {
        char.innerText = e[0]
        pinyin.innerText = a[i][2]
        meaning.innerText = a[i][3]
        found = true
      }
    })
    if (!found) {
      char.innerText = ''
      pinyin.innerText = `${val} is not included in the file.`
      meaning.innerText = 'It\'s either a radical or very common.'
    }
  }
}

// eof

