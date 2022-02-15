const displayValorAnt = document.getElementById('valorAnterior');
const displayValorAct = document.getElementById('valorActual');
const buttonsNumb = document.querySelectorAll('.numero');
const buttonsOper = document.querySelectorAll('.operador');

const displayInt = new DisplayClass(displayValorAnt, displayValorAct);

// Interacción, al presionar click en los botones numeros, el display agregue el valor en la pantalla.
buttonsNumb.forEach(tecla =>{
	tecla.addEventListener('click', () =>{
		displayInt.agregarNum(tecla.innerHTML);
	});// al presionar boton se pasa su innerHTML como parámetro para agregar a la calculadora.
});


buttonsOper.forEach(tecla =>{
	tecla.addEventListener('click', () =>{
		displayInt.operarDef(tecla.value);
	});
});


