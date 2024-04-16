let vidaProtagonista = 3;
let vidaAntagonista = 3;
let turnoProtagonista = true; //0 Protagonista e 1 para Antagonista
let balas = []; // Array para armazenar as balas
let posicaoBalaAtual = 0; // Variável global para armazenar a posição atual da bala na arma


// Função para embaralhar o array de balas
function embaralharBalas() {
    // Preenche o array de balas com 5 balas verdadeiras (1) e balas falsas (0)
    for (let i = 0; i < 5; i++) {
        if (i < 1) {
            balas.push(1); // Bala verdadeira
        } else {
            balas.push(0); // Bala falsa
        }
    }

    // Embaralha o array de balas
    for (let i = balas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [balas[i], balas[j]] = [balas[j], balas[i]];
    }
}

// Função para carregar a arma com balas
function carregarArma() {
    embaralharBalas();
    posicaoBalaAtual = 0; // Reinicia a posição da bala atual
    console.log("Arma carregada com as seguintes balas:", balas);
}

// Exemplo de uso
carregarArma();

//Imprime coisas na tela pra mim
function log(message) {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML += `<p>${message}</p>`;
}

function checaTurno(){
    if (turnoProtagonista === true){
        return 'Protagonista';        
    } else{
        return 'Antagonista';
    }
}

function atirar(alvoOponente) {
    let atirador, alvo;

    // Determina quem é o atirador
    atirador = checaTurno();

    // Verifica se a posição da bala atual é válida
    if (posicaoBalaAtual < balas.length) {
        // Verifica se a primeira bala no tambor é verdadeira (1)
        if (balas[posicaoBalaAtual] === 1) {
            // Determina quem é o alvo e reduz a vida correspondente
            if (turnoProtagonista && alvoOponente) { // Protagonista atira no Antagonista
                alvo = 'um tiro no Antagonista';
                vidaAntagonista--;
            } else if (turnoProtagonista && !alvoOponente) { // Protagonista atira em si mesmo
                alvo = 'um tiro em si mesmo';
                vidaProtagonista--;
            } else if (!turnoProtagonista && alvoOponente) { // Antagonista atira no Protagonista
                alvo = 'um tiro em você';
                vidaProtagonista--;
            } else { // Antagonista atira em si mesmo
                alvo = 'um tiro em si mesmo';
                vidaAntagonista--;
            }

            // Registra o tiro no log
            log(`${atirador} acertou ${alvo}`);
        } else {
            log("A bala falhou! Não houve dano.");
        }

        // Incrementa a posição da bala atual
        posicaoBalaAtual++;
    } else {
        log("A arma está vazia! Recarregue para continuar atirando.");
    }

    // Passa para o próximo turno
    passaTurno();
}



function trocaSituacaoBotoes(status) {
    const botoes = document.querySelectorAll('button');
    botoes.forEach(button => {
        button.disabled = !status;
    });
}

function passaTurno() {
    checkGameStatus();
    if (vidaProtagonista > 0 && vidaAntagonista > 0) {

        // Alterna o turno apenas se o jogo ainda estiver em andamento
        if (vidaProtagonista > 0 && vidaAntagonista > 0) {
            turnoProtagonista = !turnoProtagonista;

            // Habilita ou desabilita os botões conforme o novo turno
            if (turnoProtagonista) {
                trocaSituacaoBotoes(true); // Habilita os botões para o próximo turno do jogador
            } else {
                trocaSituacaoBotoes(false); // Desabilita os botões durante o turno do antagonista
                turnoAntagonista();
            }
        }
    }
}

function fimDeJogo(){
    trocaSituacaoBotoes(false); // Desabilita os botões, se necessário
    const botaoReiniciar = document.getElementById('reiniciar');
    botaoReiniciar.classList.remove('reiniciar'); // Remove a classe 'reiniciar'
    botaoReiniciar.disabled = false; // Habilita o botão de reinício
}

function reiniciar(){
    location.reload();
}


function checkGameStatus() {
    if (vidaProtagonista === 0) {
        log("Game over! Você perdeu.");
        fimDeJogo();
    } else if (vidaAntagonista === 0) {
        log("Você venceu.");
        fimDeJogo();
    } else {
        log(`Vidas restantes: Jogador (${vidaProtagonista}), Dealer (${vidaAntagonista})`);
    }
}

/** --------------------------------------------------------------- */
/* Antagonista */

function turnoAntagonista(){
    if (vidaProtagonista > 0 && vidaAntagonista > 0) {
        trocaSituacaoBotoes(false); //desabilita botoes
        pensandoAntagonista();
        setTimeout(() => {
            decisaoAntagonista();
        }, 5000);
    }
}


function decisaoAntagonista(){
    atirar(false)
    /*if (Math.random() < 0.5) {
        atirar(true);
    } else{
        atirar(false);
    }*/
}
function pensandoAntagonista() {
    const rotateText = document.getElementById('pensando');
    rotateText.classList.remove('hidden');
    setTimeout(() => {
        rotateText.classList.add('hidden');
    }, 5000); // 5 segundos
}

