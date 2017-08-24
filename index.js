var vz = {
	init : function () {
    vz.showLastModified();
//    vz.showOut();
	},
	showLastModified : function () {
		document.querySelector("footer span").innerHTML = document.lastModified;		
	},
	showOut : function () {
		document.querySelector("aside").innerHTML = "From 'index.js': using init...";
	}	
};

window.onload = vz.init;
