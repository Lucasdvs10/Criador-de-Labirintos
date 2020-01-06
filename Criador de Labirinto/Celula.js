	class Celula{
		constructor(i,j, largura){
			this.i = i;
			this.j = j;
			this.largura = largura;
			this.vizinhos = []; //array com os vizinhos não visitados
			this.visitado = false;
			this.cima = true;
			this.direita = true;
			this.baixo = true;
			this.esquerda = true;

		}

		mostrar(){
		stroke(255);
			if(this.cima){
				line(this.i, this.j, this.i+this.largura, this.j);
			}

			if(this.baixo){
				line(this.i, this.j+this.largura, this.i+this.largura, this.j+this.largura);
			}

			if(this.esquerda){
				line(this.i, this.j, this.i, this.j+this.largura);
			}

			if(this.direita){
				line(this.i+this.largura,this.j, this.i+largura, this.j+this.largura);
			}
		}

	}
		