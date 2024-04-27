var vz = {
	init : () => {
            vz.showLastModified();
	},
	showLastModified : () => {
		document.querySelector("footer span").innerHTML = document.lastModified;		
	},
	
};

window.onload = vz.init;

let loc = window.location.pathname;
let dir = loc.substring(0, loc.lastIndexOf('/'));

// Used only once: no need to create VARs for them
document.querySelector("#head-title").innerHTML = dir;
document.querySelector("#body-title").innerHTML = dir;

let  ul = document.querySelector("#idx");
let root = 'https://api.github.com/repos/vovabob/vovabob.github.io/contents';
let myRequest = new Request(root + dir); 

fetch(myRequest)
.then(
	(res) => {if (!res.ok) {throw new Error("fetch error! Status: " + res.status);} return res.json();
})
.then(function(obj) {
  for(var i = 0; i < obj.length; i++) {
	var li = document.createElement('li');
	li.innerHTML +='<a href="' + obj[i].name + '">' + obj[i].name + '</a>' + ', path: ' + obj[i].path;        
	ul.appendChild(li);
  }
})
.catch( (e) => {
  var p = document.createElement('p');
  p.appendChild(document.createTextNode('Error: ' + e.message));
  document.body.insertBefore(p, ul);
});


