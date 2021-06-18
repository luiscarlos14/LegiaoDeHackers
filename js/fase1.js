var game = new Phaser.Game(1350, 650, Phaser.AUTO,'',{preload: dados, create:cenario, update: atualiza});

var inimigo,jogador,plataformas,teclas,somColeta,somExplosao;

var vidas=3;


function mataJogador(jog, ini){
	somExplosao.play("", 0, 1, false);
	jogador.kill();
	vidas-= 1;
	textoVidas.setText('LIFE: '+ vidas)

	if(vidas== 0){
		alert("Você perdeu!!!");
window.location.href= '../gameover.html';



	} else{
		jog.reset(0, 0);
	}
}
function coletaEstrela(jog,est){
est.kill();
pontos += 10;
textPontos.setText('SCORE: '+pontos);
somColeta.play("", 0, 1, false);
if(pontos==120){
	inimigo.kill();
	alert("Você Venceu!!!");
	window.location.href='../index.html';
}

}

var inimigoEsquerda=false;
var pontos=0;


function dados(){
game.load.image('planodefundo', "imagens/background2.png");
game.load.image('chao', 'imagens/plataforma2.0.png');
game.load.spritesheet('jogador', 'imagens/robo.png', 71, 96);
game.load.spritesheet('inimigo', 'imagens/player.png',  66, 96);
game.load.image('plataforma', 'imagens/plataforma2.png');
game.load.image('star', 'imagens/diamond.png');
game.load.audio('som-explosao', 'audio/videoplayback.ogg');
game.load.audio('som-coleta', 'audio/coleta.ogg');
game.load.image('fase1','imagens/fase1.png');

 }

function cenario(){

	game.physics.startSystem(Phaser.Physics.ARCADE);


	game.add.sprite(0,0,'planodefundo');
   jogador = game.add.sprite(0, 450, 'jogador');
 inimigo = game.add.sprite(1000,450, 'inimigo');
 plataformas = game.add.group();

var chao = plataformas.create(0,580,'chao');
var chao1 = plataformas.create(200,300, 'plataforma');
var chao2 = plataformas.create(920,300, 'plataforma');
var chao3 = plataformas.create(600,450, 'plataforma');

game.physics.arcade.enable(jogador);
game.physics.arcade.enable(inimigo);
game.physics.arcade.enable(plataformas);

plataformas.enableBody = true;
jogador.enableBody = true;
inimigo.enableBody = true;

chao.body.immovable = true;
chao1.body.immovable = true;
chao2.body.immovable = true;
chao3.body.immovable = true;

jogador.body.collideWorldBounds = true;
inimigo.body.collideWorldBounds = true;

teclas=game.input.keyboard.createCursorKeys();

jogador.animations.add('left', [0,1,2,3,4,5,6], 15, true); 
jogador.animations.add('right', [8, 9, 10, 11,12,13,14], 15, true); 
inimigo.animations.add('left', [0,1,2,3,4,5,6], 15, true);  
inimigo.animations.add('right', [8,9,10,11,12,13,14], 15, true); 
jogador.animations.stop();
jogador.frame = 7;
inimigo.animations.stop();
inimigo.frame = 7;
jogador.body.gravity.y = 380;
inimigo.body.gravity.y = 380;                                                                
jogador.body.bounce.y = 0.1;
inimigo.body.bounce.y = 0.3;
stars = game.add.group();
stars.enableBody = true;
for(var i = 0; i < 12; i++){
	var star = stars.create(i*90,90,'star');
	star.body.gravity.y = 380;
	star.body.bounce.y = 0.3;
    star.body.collideWorldBounds = true;  

}
setInterval(function(){
if (inimigo.body.touching.down){
	inimigo.body.velocity.y= -300;
}

}, 2000)

setInterval(function(){
if(inimigoEsquerda|| inimigo.body.blocked.left){
inimigo.body.velocity.x= 150;
inimigo.animations.play('right');

}else if (!inimigoEsquerda|| inimigo.body.blocked.right){
inimigo.body.velocity.x= -150;
inimigo.animations.play('left');

}
inimigoEsquerda=!inimigoEsquerda;



},10000);

somExplosao= game.add.audio('som-explosao',0.5 , true);
somColeta= game.add.audio('som-coleta',1 , true);

textPontos = game.add.text(1200, 60, 'SCORE:0',{fontSize:'25px', fill: 'black'});

textoVidas= game.add.text(10, 16,'LIFE: 3',{fontSize:'25px', fill: 'black'});

game.add.sprite(580,16,'fase1');




}



function atualiza(){
	game.physics.arcade.collide(jogador,plataformas);
	game.physics.arcade.collide(inimigo,plataformas);
	game.physics.arcade.collide(stars,plataformas);
game.physics.arcade.overlap(jogador,inimigo,mataJogador);
game.physics.arcade.overlap(jogador,stars, coletaEstrela);

	jogador.body.velocity.x=0;
	
	if (teclas.left.isDown) {
		jogador.body.velocity.x= -150;

		jogador.animations.play('left');
	}
	if (teclas.right.isDown) {
		jogador.body.velocity.x= 150;

		jogador.animations.play('right');
	}
	if (teclas.up.isDown&&jogador.body.touching.down) {
		jogador.body.velocity.y= -350;
		
	}
if(jogador.body.velocity.x == 0){
		jogador.animations.frame=7;
	}




}