/*const resta = function (x,y) { //No se mapea como function al inicio, depende de posicion
    return x - y;
}
function suma (x, y) {
    return x + y;
}*/

const funciones = require("./funciones");
const fs = require("fs");

var x = 5;
let y = 6;

let json = {
    nombre : "Beatriz",
    "apellido": "Manrique",
}

console.log(funciones.suma(x,y));
console.log(funciones.resta(x,y));
console.log(json);

//fs.readFile();

let archivo = fs.readFileSync("texto.txt");

console.log(archivo.toString());
console.log("Fin de archivo")