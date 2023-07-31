const btnStart = document.getElementById('btnStart');
const divGameboard = document.getElementById('gameboard');
var statusGame = 0; //0 = sin empezar. 1 = en curso, 2 = acabó 
var canSelecctCard = true; // puedes 

var winCon = new Array;

var num1 = {
    val: "NaN",
    _id: "NaN",
};
var num2 = {
    val: "NaN",
    _id: "NaN",
}; 

btnStart.addEventListener('click', generarTablero);

function generarValores(n = 24){
    const dif = document.getElementById('dificultad');
    n = parseInt(dif.value);
    if ((n % 2)!= 0 ) n++;
    let tablero = new Array(n);
    let nOptions = n/2;
    for(let i = 0; i< tablero.length; i++ ){
        let newNum = 0;
        do{
            aprobe = false; 
            newNum = Math.floor(Math.random()*nOptions)+1;
            
            let count = 0;
            for(let j = 0; j < i; j++){
                if(tablero[j] == newNum) count++;
            }

            if(count < 2) aprobe = true; 
        } while(aprobe != true);
        tablero[i] = newNum;
    }
    winCon = new Array(n);
    winCon.fill(false);
    return tablero;
}

function generarTablero(){
    divGameboard.innerHTML = "";
    
    if(statusGame != 0){
        //divGameboard.innerHTML = "";
        num1 = {
            val: "NaN",
            _id: "NaN",
        };
        num2 = {
            val: "NaN",
            _id: "NaN",
        }; 
    }
    
    const tablero = generarValores();

    for(let i = 0; i < tablero.length; i++){
        let n = document.createElement("div");
        n.id = i;
        n.value = tablero[i];
        n.className = "memoryCard";
        n.innerText = "?";
        n.status = 0; //0 = oculto, 1 = observación, 2 = aprobado
        n.addEventListener("click", revisarValor);
        divGameboard.appendChild(n);
    }
    statusGame = 1;
}

function compararNumeros(){
    let div1 = document.getElementById(num1._id);
    let div2 = document.getElementById(num2._id);

    if(num1.val == num2.val){
        div1.status = 2;
        div2.status = 2;
        div1.innerText = "💚";
        div2.innerText = "💚";

        winCon[div1.id] = true;
        winCon[div2.id] = true;
        setTimeout(checkWinCon, 300)
    
    } else {
        div1.status = 0;
        div2.status = 0;
        div1.innerText = "? ";
        div2.innerText = "? ";
    }

    num1 = {
        val: "NaN",
        _id: "NaN",
    };
    num2 = {
        val: "NaN",
        _id: "NaN",
    };

    canSelecctCard = true;
}

function checkWinCon(){
    if( !winCon.includes(false)){
        alert("Ganaste c:");
    }
}

/*********************************
    Funciones para componentes
**********************************/

function revisarValor(){
    if(canSelecctCard == true && this.status == 0){
        
            this.innerText = this.value;
            this.status = 1; 
        
    
        if(num1.val == "NaN"){
            num1 = {
                val: this.value,
                _id: this.id,
            }
        }
        else if(num2.val == "NaN" && num1._id != this.id){
            num2 = {
                val: this.value,
                _id: this.id,
            }
            canSelecctCard = false;
            //compararNumeros();
            setTimeout(compararNumeros, 500)
            
        }
    } 
}