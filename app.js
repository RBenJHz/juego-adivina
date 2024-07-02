//Variable declarada para el número aleatorio
let numeroAleatorio = 0;
//Variable declarada para el número de intentos
let intentos = 0;
//Variable declarada para la lista de números aleatorios
let listaNumerosAleatorios = [];
//Variable para definir el rango del numero aleatorio
let numeroMaximo = 10;

//Función para asignar texto los elementos establecidos en el HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
//Función para comparar los valores ingresados por el usuario con el número aleatorio generado
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorDeUsuario").value);
    //Condición para la validación del número que ingresa el usuario
    if(numeroDeUsuario === numeroAleatorio) {
        //Si el usuario acierta genera la respuesta incluyendo el número de intentos que le tomó
        asignarTextoElemento("p", `Acertaste en ${intentos} ${(intentos === 1) ? "intento." : "intentos."}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        //El usuario no acertó, entonces genera la respuesta indicando si el número aleatorio es menos o mayor dependiendo del número ingresado por el usuario
        if(numeroDeUsuario > numeroAleatorio){
            asignarTextoElemento("p", "El número es menor.");
        } else {
            asignarTextoElemento("p", "El número es mayor.");
        }
        //Incremento para el número de intentos que el usuario requiere para acertar
        intentos++;
        //LLamado de la función limpiarCaja para cada que el usuario haga la comprobación si su número ingresado es o no correcto la caja donde se ingresan los valores se vacíe
        limpiarCaja();
    }
    return;
}

//Función para limpiar la caja de texto cada que el usuario compruebe si su valor es o no correcto 
function limpiarCaja() {
   document.querySelector("#valorDeUsuario").value = "";
}
//Función que se encarga de generar el número aleatorio y condiciona la amplitud
function generarNumeroAleatorio() {
   let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
   
   //Si ya se generaron todos lon números posibles genera el siguiente aviso
   if (listaNumerosAleatorios.length == numeroMaximo) {
       asignarTextoElemento("p","Ya se sortearon todos los números posibles")
   } else {
       //Si el número generado está incluido en la lista genera uno nuevo
       if (listaNumerosAleatorios.includes(numeroGenerado)) {
           return generarNumeroAleatorio();
       } else {
           listaNumerosAleatorios.push(numeroGenerado);
           return numeroGenerado;
       }
    }
}

//Función para reiniciar el juego a sus condiciones iniciales
function condicionesIniciales() {
    asignarTextoElemento("h1","Adivina el número");
    asignarTextoElemento("p",`Elige un número del 1 al ${numeroMaximo}`);
    numeroAleatorio = generarNumeroAleatorio();
    //Muestra en la consola el número aleatorio generado
    console.log(numeroAleatorio);
    //Muestra en la consola el número alestorio guardado en el arreglo.
    console.log(listaNumerosAleatorios);
    intentos = 1;
}

//Función para iniciar un nuevo juego
function nuevoJuego() {
    //Limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled", "true");

}
//Llamado de la función condicionesIniciales
condicionesIniciales();