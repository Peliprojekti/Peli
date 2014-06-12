
var xmlGetter = {
    getXML: function (url) {
        "use strict";
        var request = new XMLHttpRequest();

        request.open("GET", url, false /* Not async! Will block execution */);
        request.send();

        return responseXML;
    }
};
