function getFirstType() {
    return {
        count: random(1, 10),
        getCount1: getCount,
        toString: function () {
            return "type1";
        }
    };
}

function getSecondType() {
    return {
        count: random(1, 10),
        getCount2: getCount,
        toString: function () {
            return "type2";
        }
    };
}

function getThirdType() {
    return {
        count: random(1, 10),
        getCount3: getCount,
        toString: function () {
            return "type3";
        }
    };
}

function getCount() {
    return this.count;
}


var objectHelper = [getFirstType, getSecondType, getThirdType]; // created to avoid using if statements
var data = [];

for (var i = 0; i < 5; i++) {
    data[i] = objectHelper[random(0, 3)]();
    console.log("type = %s, count = %d", data[i].toString(), getCount.call(data[i]));
}

log();