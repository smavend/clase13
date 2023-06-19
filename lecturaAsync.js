const fs = require("fs");

fs.readFile("texto.txt", function (error, data){
    if(error) throw error;

    console.log(data.toString());
});

console.log("Fin de archivo")