var grade = [];
var largura = 30;
var atual;
var pilha = [];

function setup() {
	createCanvas(900,600);
	background(25);
	//frameRate(5)

	criaGrade();
	checaVizinhos();
	

	//Passo 1
	grade[0][0].visitado = true;
	addPilha(grade[0][0]);
}

function draw() {
		 //Passo 2.1
		
	if(pilha.length>0){
	
		atual = pegar();
		//atual.visitado = true;
		limpar(atual);

			if(atual.vizinhos.length>0){ //Passo 2.2
				addPilha(atual);
				
				var r = floor(random(0,atual.vizinhos.length));
				var vizinho = atual.vizinhos[r];
				var resulJ = atual.j - vizinho.j;
				
				

				if(resulJ > 0 && !vizinho.visitado){ //cima
					atual.cima = false;
					vizinho.baixo = false;
				}
				
				else if(resulJ < 0 && !vizinho.visitado){ //baixo
					atual.baixo = false;
					vizinho.cima = false;
				}
				var resulI = atual.i - vizinho.i;

				if(resulI < 0 && !vizinho.visitado){ //direita
					atual.direita = false;
					vizinho.esquerda = false;
				}


				else if(resulI > 0 && !vizinho.visitado){ //esquerda
					atual.esquerda = false;
					vizinho.direita = false;
				}

				limpar(vizinho);
				vizinho.visitado = true;
				addPilha(vizinho);
				//limpar(atual);
				//limpar(vizinho);
			}
		}
		//limpar(atual);
		mostrarTudo();
}


function mostrarTudo(){

	background(25);
	for(var i = 0; i<grade.length; i++){ //mostrar grade
		for(var j = 0; j<grade[i].length; j++){
				grade[i][j].mostrar();
		}
	}

	//mostrar atual
	fill(255,0,0);
	rect(atual.i,atual.j, largura, largura);
}

function addPilha(obj){
	append(pilha, obj);
}

function pegar(){
	return pilha.splice(pilha.length-1,1)[0];
}


function checaVizinhos(){
	for(var i = 0; i<grade.length; i++){ //mostrar grade
		for(var j = 0; j<grade[i].length; j++){
		
			if(grade[i-1]){ //se existir um vizinho não visitado, adicione-o na array
				if(grade[i-1][j]){
					append(grade[i][j].vizinhos, grade[i-1][j]);
				}
			}
			if(grade[i+1]){
				if(grade[i+1][j]){
					append(grade[i][j].vizinhos, grade[i+1][j]);
				}
			}

			if(grade[i][j-1]){
				append(grade[i][j].vizinhos, grade[i][j-1])
				}
			if(grade[i][j+1]){
				append(grade[i][j].vizinhos, grade[i][j+1]);
				}
		}
	}
}

function limpar(atual){
	for(var i = 0; i<atual.vizinhos.length; i++){
		if(atual.vizinhos[i].visitado){
			atual.vizinhos.splice(i,1);
		}
	}
}

function criaGrade(){
for(var i = 0; i<width; i+= largura){ //coluna
		var temp = [];
		for(var j = 0; j<height; j+= largura){// linha
			var celula = new Celula(i,j, largura);
			append(temp, celula); //cria uma array e após isso adiona na grade
		}
		append(grade, temp); 
	}
}

