class DisplayClass{ //pasar valores para instanciarla
	constructor(displayValorAnt, displayValorAct){ //Variables a utilizar.
		this.displayValorAct = displayValorAct; //Valor observado en la parte inferior de la pantalla de la calculadora.
		this.displayValorAnt = displayValorAnt; //Valor observado en la parte superior de la pantalla de la calculadora.
		this.calculadora = new CalculadoraClass(); // llama las funciones de la calculadora (.js) para hallar el resultado.
		this.OpSign = undefined; // Tipo de operación a realizar (obtenida de los valores de los botones operadores)
		this.operacion = undefined; // Variable para validar los diferentes procesos para cada operación matemática.
		this.valAct = ''; // Valor actual a modificar (NO CONFUNDIR con displayValorAct)
		this.valAnt = ''; // valor anterior modificado de this.valAnt (NO CONFUNDIR con displayValorAnt)
		this.simbolos = { //Signos de las Operaciones que se ingresan en la calculadora.
			sumar:'+',
			restar: '-',
			multiplicar: '*',
			dividir: '/',
			vacio: '=',
		}
	}

	//Agregar números a la pantalla de respuesta de la Calculadora
	agregarNum(numero){
		if(numero == '.' && this.valAct.includes('.')){ // Revisar si cada número o valor ingresado tiene más de un punto decimal (lo que estaría mal).
			return; // No hacer nada/regresar.
		}else { 	// Validar que SOLO haya UN punto decimal por cada número ingresado.
			this.valAct = this.valAct + numero; // Concatenar cada dato actual ingresado con el siguiente.
			this.imprimirValores(); 			//Mostrar resultado en la pantalla de la calculadora.
		}
		
	}


	//Metodo para imprimir valores
	imprimirValores(){
		this.displayValorAct.textContent = this.valAct; //Valor de valAct observado en la parte inferior de la pantalla de la calculadora
		this.displayValorAnt.textContent = `${this.valAnt} ${this.simbolos[this.OpSign] || ''}`; // Valor de valAnt observado en la esquina superior de la pantalla de la calculadora	
	}																							// valorAnt signo.de.operador || No mostrar nada.

	
	//Método utilizar las variables ingresadas solicitándole a la calculadora que utilice dichas variables.
	calcular(){
		const valAnt = parseFloat(this.valAnt); // transformar vaAnt de String a Número para hacer el cálculo.
		const valAct = parseFloat(this.valAct); // ditto, pero con vaAct

		if(isNaN (valAct) || isNaN (valAnt)){ // Si alguno de los valores NO es número, no hacer nada/retorna nada.
			return
		}else {
			this.valAct = this.calculadora[this.operacion](valAnt, valAct); // Cálculo de los datos ingresados.
		}
	}

	//Acciones a realizar según el tipo de operación matemática solicitado.
	operarDef(tipo){
		switch (tipo) {
			//PARA SUMA (+)
			case 'sumar':
				if (this.valAct == '.') { //Evita errores como: 3.2 + . = .
					return
				}else {
					if(this.valAnt == '' && this.valAct == ''){ // Si no hay valores, no mostrar signos ni hacer nada (no se ha ingresado los datos necesarios para ello).
						return
					}else {
						this.operacion = this.OpSign; // Guardar la operación que debe realizarse en la calculadora.
						this.OpSign = tipo; // Guardar el signo de la operación ingresado y mostrarlo en pantalla con this.simbolos[]
						
						if(this.valAnt !== '' && this.valAct !==''){ // Para: número + número
							this.calcular();
							this.valAnt = this.valAct; // Guardar resultado para mostrar en la parte superior de la pantalla.
						}
						
						if(this.valAnt == '' && this.operacion == undefined){ // Para: número + vacío.
							this.valAnt = this.valAct; // Dejar mismo número, pero ahora en la parte superior de la pantalla.
						}
						
						if(this.valAnt == '' && this.operacion == 'restar'){ // Para negativos: - número + vacío.
							this.valAnt = '0'; // Para: 0 - número + --> -número +
							this.calcular();
							this.valAnt = this.valAct;
						}
						
						this.valAct = ''; // Deja vacío la variable Valor Actual para ingresar otros valores.
					}
				}

				break;

			// PARA MOSTRAR RESTA (-)
			case 'restar':
				
				if (this.valAct == '.') { 
					return
				}else { 
					
					this.operacion = this.OpSign;
					this.OpSign = tipo;

					if(this.valAnt !== '' && this.valAct !==''){ // Para: número - número.
						this.calcular();
						this.valAnt = this.valAct;
					}
					
					if(this.valAnt == '' && this.operacion == undefined){ // Para: numero - vacío.
						this.valAnt = this.valAct;
					}
					
					if(this.valAnt == '' && this.operacion == 'restar'){ // Para: - número - vacío.
							this.valAnt = '0';
							this.calcular();
							this.valAnt = this.valAct;
					}					
					
					this.valAct = '';
				}

				break;
			
			// PARA MULTIPLICACIÓN (*)
			case 'multiplicar':
				if (this.valAct == '.') { 
					return
				}else {
					if(this.valAnt == '' && this.valAct == ''){ 
						return
					}else {
						this.operacion = this.OpSign;
						this.OpSign = tipo; 
						
						if(this.valAnt !== '' && this.valAct !==''){ // Para: número * número
							this.calcular();
							this.valAnt = this.valAct;
						}

						if(this.valAnt == '' && this.operacion == undefined){ // Para: número * vacío.
							this.valAnt = this.valAct;
						}

						if(this.valAnt == '' && this.operacion == 'restar'){ // Para: negativos: - número * vacío.
								this.valAnt = '0';
								this.calcular();
								this.valAnt = this.valAct;
						}
						
						this.valAct = ''; 
					}
				}

				break;

			// PARA DIVISIÓN (/)
			case 'dividir':
				if (this.valAct == '.') { 
					return
				}else {
					if(this.valAnt == '' && this.valAct == ''){ 
						return
					}else {
						this.operacion = this.OpSign;
						this.OpSign = tipo; 
						
						if(this.valAnt !== '' && this.valAct !==''){ // Para: número / número. = 6 / 2 / --> 3/
							this.calcular();
							this.valAnt = this.valAct;
						}

						if(this.valAnt == '' && this.operacion == undefined){ // Para: número / 'otro valor a insertar'.
							this.valAnt = this.valAct;
						}
						
						if(this.valAnt == '' && this.operacion == 'restar'){ // Para: - número / 'otro valor a insertar'.
								this.valAnt = '0';
								this.calcular();
								this.valAnt = this.valAct;
						}
						
						this.valAct = ''; // Deja vacío la variable Valor Actual.
					}
				}

				break;

			// PARA IGUAL (=)
			case 'igual':
				if (this.valAct == '.') { //Evita errores como: 3.2 + . = .
					return
				}else {
					this.operacion = this.OpSign;
					this.OpSign = tipo;

					if(this.valAnt !== '' && this.valAct !== '' && this.operacion == this.OpSign){
						this.valAnt = 'ERROR! Operador NO especificado';
					} else {	
						if (this.valAnt == '') {
							if(this.operacion == 'restar'){ //Para negativos: -1 = -1.
								this.valAnt = '0'; // Para lograr el negativo: 0 - 1 = -1.
								this.calcular();
								this.valAnt = this.valAct;
							}else {							// Para positivos: 1 = 1.
								this.valAnt = this.valAct;
							}
						}else {
							if(this.valAct ==''){ // Para casos cómo: -1 + 'vacío' = -1
								this.valAnt = this.valAnt;
							}else {
								this.calcular(); // Cálculo normal
								this.valAnt = this.valAct.toString();
							}	
						}
					}
					this.valAct = ''; // valor actual vacio (abajo) una vez se ha realizado la operación
				}

				break;
		}

		this.imprimirValores();
	}

//--------------------------------------------------------------------------------------
	
	//Método para Deshacer acción (borra el último número presente en la pantalla INFERIOR de la Calculadora)
	undo(){
		this.valAct = this.valAct.toString().slice(0,-1); //Transformar el dato de Valor Actual en cadena y quitarle una dígito de derecha a izquierda. 
		this.imprimirValores();
	}

	//Método para Borrar o Resetear todo y dejar la pantalla (y variables) vacías
	clear(){
		this.valAct = '';
		this.valAnt = '';
		this.OpSign = undefined;
		this.operacion = undefined;
		this.imprimirValores();
	}




}



