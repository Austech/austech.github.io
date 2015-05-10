/// <reference path="phaser.js" />

var game = new Phaser.Game(800,600, Phaser.Auto, '', { preload: preload, create: create, update: update });
var sound = createjs.Sound; //easier to type


function update()
{
}

function preload()
{
	game.load.image("burt", "img/burt.png");
	game.load.image("coffee", "img/coffee.png");
	game.load.image("greg", "img/greg.jpg");
	
	sound.on("fileload", audioload, this);
	sound.registerSound("audio/coffee.wav", "coffee");
	sound.registerSound("audio/intro.wav", "intro");
	sound.registerSound("audio/crash.wav", "crash");
}

function audioload(event)
{
	if(event.id == "intro")
	{
		//start show
		game.burt = game.add.sprite(100,-100, "burt");
		game.burt.anchor.x = .5;
		game.burt.anchor.y = .5;
		
		var talkTween = game.add.tween(game.burt);
		talkTween.to({y: 300}, 1000, Phaser.Easing.Bounce.In);
		talkTween.start();
		talkTween.onComplete.add(function()
		{
			setTimeout(function ()
			{
				talkTween = game.add.tween(game.burt);
				talkTween.to({rotation:.5}, 1000, Phaser.Easing.Bounce.In);
				talkTween.start();
			}, 1000);
		}, this);
		
		var introSound = sound.play(event.id);
		
		introSound.on("complete", function()
		{
			var greg = game.add.sprite(1000,300, "greg");
			greg.anchor.x = .5;
			greg.anchor.y = .5;
			
			var coffeeSound = sound.play("coffee");
			var coffeeSprite = game.add.sprite(100,300, "coffee");
			coffeeSprite.anchor.x = .5;
			coffeeSprite.anchor.y = .5;
			coffeeSprite.scale.x = .5;
			coffeeSprite.scale.y = .5;
			
			setTimeout(function()
			{
				var coffeeTween = game.add.tween(coffeeSprite);
				coffeeTween.to({x:650, rotation:1.2}, 500, "Linear");
				coffeeTween.start();
				
				coffeeTween = game.add.tween(greg);
				coffeeTween.to({x:750}, 500, "Linear");
				coffeeTween.start();
			}, 2000);
			
			coffeeSound.on("complete", function()
			{
				var explosion = game.add.emitter(coffeeSprite.position.x, coffeeSprite.position.y, 100);
				explosion.makeParticles("coffee");
				explosion.setScale(.1,.1, 0);
				explosion.start(true, 1000,  null, 20);
				coffeeSprite.destroy();
				sound.play("crash");
			});
		});
	}
}

function create()
{
}