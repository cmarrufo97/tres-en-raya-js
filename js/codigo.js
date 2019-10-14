var turno = 0;          // 0-1 (Jugador 1: 0, Jugador 2: 1)
var pintados = [];      // Array auxiliar para ir guardando los botones que han sido pulsados.

function principal(){
    
    var uno = document.getElementById("1");
    var dos = document.getElementById("2");
    var tres = document.getElementById("3");
    var cuatro = document.getElementById("4");
    var cinco = document.getElementById("5");
    var seis = document.getElementById("6");
    var siete = document.getElementById("7");
    var ocho = document.getElementById("8");
    var nueve = document.getElementById("9");
    var reset = document.getElementById("reiniciar");

    // AGREGAMOS LOS BOTONES AL ARRAY BOTONES.
    var botones = [];
    botones.push(uno);
    botones.push(dos);
    botones.push(tres);
    botones.push(cuatro);
    botones.push(cinco);
    botones.push(seis);
    botones.push(siete);
    botones.push(ocho);
    botones.push(nueve);

    eventos();

    // EVENTOS

    function eventos(){

        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click",function(e){
                if (!estaPintado(botones[i].id)) {                                // COMPROBAMOS PRIMERO QUE EL ID DEL BOTON QUE ESTAMOS CLICKANDO NO HA SIDO PULSADO.
                    if(turno == 0){
                        document.getElementById(botones[i].id).innerHTML = "X";
                        pintados.push(botones[i].id);                             // GUARDA LOS ID'S DE LOS BOTONES QUE HAS PULSADO, SI VUELVES A PULSAR NO SE CAMBIA PORQUE YA FUE CLICKADO.
                        
                        // COMPROBAR SI HAY GANADOR.
                        if (esLinea() || esColumna() || esDiagonal()) {
                            alert("GANA EL JUGADOR 1");
                        }else {                                                     // SI NO HA HABIDO GANADOR EN LA JUGADA ANTERIOR, CAMBIAMOS EL TURNO
                        cambiarTurno();
                        }
                    }else if(turno == 1) {
                        document.getElementById(botones[i].id).innerHTML = "O";
                        pintados.push(botones[i].id);

                        // COMPROBAR SI HAY GANADOR.
                        if (esLinea() || esColumna() || esDiagonal()) {
                            alert("GANA EL JUGADOR 2");
                        }else {                                                     // SI NO HA HABIDO GANADOR EN LA JUGADA ANTERIOR, CAMBIAMOS EL TURNO
                        cambiarTurno();
                        }
                    }
                }

                // COMPROBAMOS SI EL JUEGO HA QUEDADO EN TABLAS. (ESTA EN TABLAS SI NO HAY NADA VACIO Y NO SE HA DADO GANADOR)
                if (esTablas()) {
                    alert("LA PARTIDA HA QUEDADO EN TABLAS.");
                }

            });
        }
    }

    /**
     * La función estaPintado() es una función que comprueba si en el array auxiliar pintados
     * hay algun ID de algun botón. Si lo hay quiere decir que ése botón ha sido pulsado y que el botón ya tiene texto.
     * De este modo impediremos que se cambie el texto del botón una vez pulsado y el cambio de turno.
     * @param {string} s 
     */

    function estaPintado(s){
        var s2 = ""+s;
        var pintado = false;

        for (let i = 0; i < pintados.length; i++) {
            if (s2 === pintados[i]) {
                pintado = true;
                break;
            }
        }
        return pintado;
    }

    function cambiarTurno(){

        if(turno == 0) {
            turno = 1;
        }else if(turno == 1)
            turno = 0;
    }

    function esLinea(){
        var linea = false;
        for (let i = 0; i <= 6; i+=3) {
            if(botones[i].innerHTML != "" && botones[i].innerHTML == botones[i+1].innerHTML && botones[i].innerHTML == botones[i+2].innerHTML){
                linea = true;
                break;
            }
        }
        return linea;
    }

    function esColumna() {
        var col = false;

        for (let i = 0; i <= 2; i++) {
            if (botones[i].innerHTML != "" && botones[i].innerHTML == botones[i+3].innerHTML && botones[i].innerHTML == botones[i+6].innerHTML) {
                col = true;
                break;
            }
        }
        return col;
    }

    function esDiagonal() {
        var diagonal = false;

        for (let i = 0; i <= 2; i+=2) {
            if (botones[0].innerHTML != "" && botones[0].innerHTML == botones[4].innerHTML && botones[4].innerHTML == botones[8].innerHTML) {
                diagonal = true;
                break;
            } else if (botones[2].innerHTML != "" && botones[2].innerHTML == botones[4].innerHTML && botones[4].innerHTML == botones[6].innerHTML) {
                diagonal = true;
                break;
            }
        }
        return diagonal;
    }

    /**
     * COMPROBAR TABLAS. 
     * LAS TABLAS SE DA CUANDO LOS BOTONES NO ESTAN VACIOS Y NO HA HABDIDO JUGADA GANADORA,
     * ES DECIR, NO HA HABDIDO NINGUNA LINEA NI COLUMNA NI DIAGONAL. 
     */

    function estaVacio() {
        var v = false;
        
        for (let i = 0; i < botones.length; i++) {
            if (botones[i].innerHTML == "") {
                 v = true;
            }
        }
        return v;
    }

    function esTablas() {
        var t = false;

        for (let i = 0; i < botones.length; i++) {
            if (!estaVacio() && !esLinea() && !esColumna() && !esDiagonal()) {
                t = true;
                break;
            }
        }
        return t;
    }

    // REINICIAR LA PARTIDA (REFRESCAMOS LA PAGINA Y RESETEAMOS TAMBIEN EL ARRAY DE PINTADOS.)

    reset.onclick = function(e){
        document.location.reload();
        
        // RESETEAMOS EL ARRAY
        pintados = [];
    }
}
