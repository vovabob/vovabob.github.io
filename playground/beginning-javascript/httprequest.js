function HttpRequest(url, callback) {
	
    this.request = new XMLHttpRequest();
    this.request.open("GET", url);
	
	// this is a workaround a scoping issue: ideally, you would use
	// this.request inside the reqReadyStateChange(), howerver "this"
	// point to the function instead of the XMLHttpRequest object...
    var tempRequest = this.request;
    
    function reqReadyStateChange() {
        if (tempRequest.readyState == 4) {
            if (tempRequest.status == 200) {
                callback(tempRequest.responseText);
            } else {
                alert("An error occurred trying to contact the server.");
            }
        }
    }
    
    this.request.onreadystatechange = reqReadyStateChange;
}
// simplified version of send() method which does not need any arguments
// BUT: do we really need it?
HttpRequest.prototype.send = function () {
    this.request.send(null);
};
