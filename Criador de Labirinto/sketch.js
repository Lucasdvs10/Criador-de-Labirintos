var grade = [];
var largura = 30;
var atual;
var pilha = [];

function setup() {
	
	createCanvas(600,600);

	criaGrade()
	checaVizinhos();
	
	atual = grade[0][0];
	addvisitado(atual);
	mostrarTudo();

	
}

function draw() {
		
		//frameRate(5)

		limpar(atual);		
		mostrarTudo();

		if(atual.vizinhos.length>0){
			addPilha(atual);
				
			var r = floor(random(0,atual.vizinhos.length));
			var vizinho = atual.vizinhos[r];
			var resulJ = atual.j - vizinho.j;

			if(resulJ > 0){ //cima
				atual.cima = false;
				vizinho.baixo = false;
			}
				
			else if(resulJ < 0){ //baixo
				atual.baixo = false;
				vizinho.cima = false;
			}
			var resulI = atual.i - vizinho.i;

			if(resulI < 0){ //direita
				atual.direita = false;
				vizinho.esquerda = false;
			}


			else if(resulI > 0){ //esquerda
				atual.esquerda = false;
				vizinho.direita = false;
			}

			atual = vizinho;
			addvisitado(atual);
			limpar(atual);
		}

		else if(pilha.length > 0){
			atual = pilha.splice(pilha.length-1,1);
			atual = atual[0];
			limpar(atual);
				
				
		}
		

}


function mostrarTudo(){
	background(25);
	//mostrar atual
	fill(255,0,0);
	noStroke();
	rect(atual.i,atual.j, largura, largura);

	for(var i = 0; i<grade.length; i++){ //mostrar grade
		for(var j = 0; j<grade[i].length; j++){
			grade[i][j].mostrar();
		}
	}
	
}

function addPilha(obj){
	append(pilha, obj);
}


function addvisitado(celula){
	celula.visitado = true;
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
			var celula = new Celula(i-1,j-1, largura);
			append(temp, celula); //cria uma array e após isso adiona na grade
		}
		append(grade, temp); 
	}
}

