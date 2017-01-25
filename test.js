/**
 * Created by Vlad on 08-Dec-16.
 */
var _ = require('underscore');

var dict = [
    {
        "nume":"Dobos",
        "prenume":"Dorin",
        "grupa":"FI-131",
        "telefon":"079153216"
    },
    {
        "nume":"Tabirta",
        "prenume":"Adrian",
        "grupa":"FI-121",
        "telefon":"078945676"
    },
    {
        "nume":"Ploaia",
        "prenume":"Vladislav",
        "grupa":"FI-121",
        "telefon":"079123456"
    },
    {
        "nume":"Brodicico",
        "prenume":"Grigore",
        "grupa":"FI-131",
        "telefon":"069365749"
    },
    {
        "nume":"Burlac",
        "prenume":"Victor",
        "grupa":"FI-131",
        "telefon":"068235478"
    },
    {
        "nume":"Fedco",
        "prenume":"Boris",
        "grupa":"FI-131",
        "telefon":"079875672"
    },
    {
        "nume":"Filipescu",
        "prenume":"Radu",
        "grupa":"FI-131",
        "telefon":"078317892"
    },
    {
        "nume":"Frunze",
        "prenume":"Iacob",
        "grupa":"FI-131",
        "telefon":"079124571"
    },
    {
        "nume":"Ganta",
        "prenume":"Veaceslav",
        "grupa":"FI-131",
        "telefon":"060264189"
    },
    {
        "nume":"Gherman",
        "prenume":"Olga",
        "grupa":"FI-131",
        "telefon":"079092154"
    },
    {
        "nume":"Macovei",
        "prenume":"Ion",
        "grupa":"FI-131",
        "telefon":"079171213"
    },
    {
        "nume":"Railean",
        "prenume":"Igor",
        "grupa":"FI-131",
        "telefon":"079554412"
    },
    {
        "nume":"Suicimezov",
        "prenume":"Georgeta",
        "grupa":"FI-131",
        "telefon":"079337121"
    },
    {
        "nume":"Resetnic",
        "prenume":"Andrei",
        "grupa":"FI-131",
        "telefon":"078234412"
    },
    {
        "nume":"Rotaru",
        "prenume":"Dorin",
        "grupa":"FI-131",
        "telefon":"069227842"
    },
    {
        "nume":"Tuchila",
        "prenume":"Ion",
        "grupa":"FI-131",
        "telefon":"078126652"
    },
    {
        "nume":"Turcan",
        "prenume":"Dorin-Teodor",
        "grupa":"FI-131",
        "telefon":"069378913"
    },
    {
        "nume":"Untila",
        "prenume":"Valeriu",
        "grupa":"FI-131",
        "telefon":"079293371"
    }
];


var groupDictionar = function (array, group, result) {

    var groupByValue = _.groupBy(array, function(obj){
        return obj.grupa == group;
    });

    result(groupByValue[true]);
};


groupDictionar(dict, "FI-121", function(obj){
 console.log(obj);
});


/*var sortDictionar = function (dict, sort, result) {
    // Vlad
    //dict = dictAll;
    if (sort == "asc") {
        var dict1;
        dict1 = _.sortBy(dict,"nume");
        console.log("in sortDictionar asc " + dict1);
        result(dict1);


    } else if (sort == "desc") {
        var dict2;
        dict2 =  _.sortBy(dict,"nume").reverse();
        console.log("in sortDictionar desc " + JSON.stringify(dict2));
        result(dict2);

    }
};

sortDictionar(dict, "desc", function(obj){
    console.log(obj);
});*/


/*var filterDictionar = function (array, filter, result) {


   // console.log("in fffff>>" + array);

    var some = _.filter(array, function (item) {
        return item.prenume === filter;
    });

   // console.log(">>>>>!"+some);
    result(some);

};

filterDictionar(dict,"Adrian",function (obj) {
    console.log(obj);

});*/
