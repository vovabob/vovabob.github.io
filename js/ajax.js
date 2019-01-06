// From: w3schools.com/xml/ajax_intro.asp
// Modified: accept "el" argument: an element's ID to show the response
function loadFile(el) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "ajax_info.txt", true);
  
  // add the event handler  
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		el.innerHTML = this.responseText;
    }
  };
  xhr.send();
}
