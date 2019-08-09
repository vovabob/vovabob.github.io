const myInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'text/plain'
  },
  mode: 'cors',
  cache: 'no-store'
};

let myRequest = new Request('https://api.github.com/repos/vovabob/vovabob.github.io/contents/projects', myInit);  
  
var ul = document.querySelector("#idx");

fetch(myRequest).then(function(response) {if (!response.ok) {throw new Error("fetch error! Status: " + response.status);} return response.json();})
// the previous Promise resolved by returning a JSON object
.then(function(obj) {
  for(var i = 0; i < obj.length; i++) {
	var li = document.createElement('li');
	li.innerHTML +='<a href="' + obj[i].name + '">' + obj[i].name + '</a>' + ', path: ' + obj[i].path;        
	ul.appendChild(li);
  }
})
.catch(function(error) {
  var p = document.createElement('p');
  p.appendChild(
	document.createTextNode('Error: ' + error.message)
  );
  document.body.insertBefore(p, ul);
});
