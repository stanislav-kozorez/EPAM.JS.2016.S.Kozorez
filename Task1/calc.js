console.log("calc.js");

for (var i = 0; i < data.length; i++) {
    if (isNumeric(data[i])) {
        if (data[i] == 0) {
            data[i] = +data[i] + 10;
        }
        else if (data[i] > 100) {
            data[i] = +data[i] - 100;
        }
        else if (data[i] < 100) {
            data[i] = +data[i] + 100;
        }
    }
}

log(data);

// Checks if argument is number.
// true, false, null, undefined, "" are treated as NaN
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}