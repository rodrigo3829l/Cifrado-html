const cifrar = document.getElementById("cifrar-btn")
const descifrar = document.getElementById("descifrar-btn")

cifrar.addEventListener("click", encrypt)
descifrar.addEventListener("click", decrypt)

function encrypt() {
    const message = document.getElementById("cifrar").value;
    const encryptedMessage = performEncrypt(message);
    document.getElementById("result").value = encryptedMessage;
}

function decrypt() {
    const encryptedMessage = document.getElementById("message_decrypt").value;
    const decryptedMessage = performDecrypt(encryptedMessage);
    document.getElementById("result_decrypt").value = decryptedMessage;
}

function performEncrypt(message) {
    const longitudMensaje = message.length;
    let filas, columnas;
    
    if (longitudMensaje <= 4) {
        filas = 2;
        columnas = longitudMensaje - 1;
    } else if(longitudMensaje > 4 && longitudMensaje <= 5){
        filas = 2;
        columnas = longitudMensaje -2;
    }else {
        filas = Math.ceil(longitudMensaje / 5);
        columnas = 5;
    }

    const matriz = new Array(filas);
    let posicion = 0;

    for (let i = 0; i < filas; i++) {
        matriz[i] = new Array(columnas);

        for (let j = 0; j < columnas; j++) {
            if (posicion < longitudMensaje) {
                matriz[i][j] = message.charAt(posicion);
                posicion++;
            } else {
                matriz[i][j] = ' ';
            }
        }
    }
    let resultado = '';

    for (let j = 0; j < columnas; j++) {
        for (let i = 0; i < filas; i++) {
            const letra = matriz[i][j];
            resultado += letra;
        }
    }
    return resultado
}


function performDecrypt(message) {
    const longitudMensaje = message.length;
    let filas;

    if (longitudMensaje <= 5) {
        filas = 2;
    } else {
        filas = Math.ceil(longitudMensaje / 5);
    }

    let resultado = '';
    let posicion = 0;
    let pos_usadas = new Set();

    let band = true;

    while (band) {
        resultado += message[posicion];
        pos_usadas.add(posicion);

        posicion += filas;
        if (pos_usadas.size === longitudMensaje) {
            band = false;
        } else if (pos_usadas.has(posicion) || posicion >= longitudMensaje) {
            for (let i = 0; i < longitudMensaje; i++) {
                if (!pos_usadas.has(i)) {
                    posicion = i;
                    break;
                }
            }
        }
    }

    return resultado;
}