console.log("log.js");

function log(data) {
    for (var i = 0; i < data.length; i++) {
        console.log("data[%d]= %s", i, stringRepresentation(data[i]));
    }
}

function stringRepresentation(item) {
    if (item === undefined)
        return "not defined";
    if (item === null)
        return "not initialized";

    return item;
}