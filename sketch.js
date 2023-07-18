//variaveis da bolinha

let xBolinha = 250;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 7;
let velocidadeyBolinha = 7;

// variaveis da raquete

let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//variaveis do oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let wRaqueteOponente = 10;
let hRaqueteOponente = 90;
let velocidadeYoponente;
let chanceDeErrar = 0;

//placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoborda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente ();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  
}

function mostraBolinha( ){
   circle (xBolinha,yBolinha,diametro);
}

function movimentaBolinha (){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function verificaColisaoborda(){
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1}
  
  if (yBolinha + raio >  height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1}
}

function mostraRaquete (x,y){
  rect (x, y, wRaquete, hRaquete);
}

function movimentaRaquete (){
  if (keyIsDown (UP_ARROW)){
   yRaquete -= 10;}
  
  if (keyIsDown (DOWN_ARROW)) {
   yRaquete += 10; }  
}

function movimentaRaqueteOponente () {
  velocidadeYoponente = yBolinha - yRaqueteOponente -  wRaqueteOponente /2 - 30;
  yRaqueteOponente += velocidadeYoponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 49){
    chanceDeErrar = 50
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 45){
    chanceDeErrar = 45
    }
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente && yBolinha + raio < yRaqueteOponente + hRaqueteOponente && yBolinha + raio > yRaqueteOponente - hRaquete){velocidadexBolinha *= -1;
  raquetada.play();
  }
  
} 

function incluiPlacar () {
    
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto () {
  if (xBolinha > 590) {meusPontos += 1;
                      ponto.play();}
  if (xBolinha < 10) {pontosOponente += 1;
                     ponto.play();}
}
