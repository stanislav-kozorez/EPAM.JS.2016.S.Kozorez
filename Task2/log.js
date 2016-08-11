
// Evaluates total count in every type
function log() {
    var result = {
        type1: 0,
        type2: 0,
        type3: 0
    };

    for (var i = 0; i < 5; i++) {
        result[data[i].toString()] += getCount.call(data[i]);
    }

    console.log("count type1 = %d", result.type1);
    console.log("count type2 = %d", result.type2);
    console.log("count type3 = %d", result.type3);
}