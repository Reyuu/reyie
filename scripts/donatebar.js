function createRequestObject() {
    var obj;
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        obj = new XMLHttpRequest();
    }
    return obj;
}

function sendReq(req) {   
    var http = createRequestObject();
    http.open('get', req);
    http.onreadystatechange = handleResponse;
    http.send(null);
}

function handleResponse() {    
    if (http.readyState == 4) {
        var response = http.responseText;
        document.querySelector('body').innerHTML=response;
    }
}

 sendReq('/donatebar.html');