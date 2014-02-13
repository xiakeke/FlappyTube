// Generated by CoffeeScript 1.7.1
var DEBUG, GAME_HEIGHT, GRAVITY, GROUND_HEIGHT, GROUND_Y, HEIGHT, SPAWN_RATE, SPEED, WIDTH, bg, birddie, birds, blood, bloods, fallSnd, flapSnd, floor, gameOver, gameOverText, gameStart, ground, hurtSnd, instText, main, score, scoreSnd, scoreText, swooshSnd, tube;

DEBUG = false;

SPEED = 100;

GRAVITY = 20;

SPAWN_RATE = 1 / 1200;

HEIGHT = 480;

WIDTH = 287;

GAME_HEIGHT = 336;

GROUND_HEIGHT = 64;

GROUND_Y = HEIGHT - GROUND_HEIGHT;

tube = null;

birds = null;

birddie = null;

ground = null;

bg = null;

blood = null;

bloods = null;

gameStart = false;

gameOver = false;

score = null;

scoreText = null;

instText = null;

gameOverText = null;

flapSnd = null;

scoreSnd = null;

hurtSnd = null;

fallSnd = null;

swooshSnd = null;

floor = Math.floor;

main = function() {
  var create, createBirds, flap, game, hitBirds, over, preload, render, reset, start, state, update;
  hitBirds = function() {};
  createBirds = function() {
    var i, _i;
    for (i = _i = 4; _i > 0; i = --_i) {
      console.log(i);
    }
  };
  flap = function() {
    var tween;
    if (!gameStart) {
      start();
    }
    if (!gameOver) {
      tube.body.velocity.y = -100;
      tube.body.gravity.y = 0;
      tween = game.add.tween(tube.body.velocity).to({
        y: -20
      }, 25, Phaser.Easing.Bounce.In, true);
      tween.onComplete.add(function() {
        return tube.body.gravity.y = GRAVITY;
      });
      flapSnd.play();
    }
  };
  start = function() {
    var tubesTimer;
    gameStart = true;
    tubesTimer = game.time.events.loop(1 / SPAWN_RATE, createBirds);
    scoreText.setText(score);
  };
  over = function() {
    gameOver = true;
    gameOverText.renderable = true;
  };
  preload = function() {
    var assets;
    assets = {
      image: {
        "bg": 'res/bg.png',
        "birdy": 'res/birdy.png',
        "birddie": 'res/birddie.png',
        "g": 'res/g.png',
        "tube": 'res/tube.png'
      },
      audio: {
        "die": 'res/sfx_die.mp3',
        "hit": 'res/sfx_hit.mp3',
        "point": 'res/sfx_point.mp3',
        "flap": 'res/sfx_wing.mp3'
      },
      spritesheet: {
        "blood": ['res/blood.png', 64, 64]
      }
    };
    Object.keys(assets).forEach(function(type) {
      Object.keys(assets[type]).forEach(function(id) {
        game.load[type].apply(game.load, [id].concat(assets[type][id]));
      });
    });
  };
  create = function() {
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
    game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
    game.stage.scale.setScreenSize(true);
    game.world.width = WIDTH;
    game.world.height = HEIGHT;
    bg = game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'bg');
    ground = game.add.tileSprite(0, GROUND_Y, WIDTH, GROUND_HEIGHT, 'g');
    birds = game.add.group();
    birddie = game.add.group();
    tube = game.add.sprite(0, 0, "tube");
    tube.anchor.setTo(0.5, 0.5);
    flapSnd = game.add.audio("flap");
    scoreSnd = game.add.audio("score");
    hurtSnd = game.add.audio("hurt");
    fallSnd = game.add.audio("fall");
    swooshSnd = game.add.audio("swoosh");
    blood = game.add.sprite(100, 100, 'blood');
    scoreText = game.add.text(game.world.width / 2, game.world.height / 6, "", {
      font: "10px \"sans\"",
      fill: "#fff",
      stroke: "#bbb",
      strokeThickness: 4,
      align: "center"
    });
    scoreText.anchor.setTo(0.5, 0.5);
    gameOverText = game.add.text(game.world.width / 2, game.world.height / 2, "", {
      font: "16px \"Press Start 2P\"",
      fill: "#fff",
      stroke: "#430",
      strokeThickness: 4,
      align: "center"
    });
    gameOverText.anchor.setTo(0.5, 0.5);
    gameOverText.scale.setTo(1, 1);
    game.input.onDown.add(flap);
    reset();
  };
  update = function() {
    if (gameStart) {
      if (!gameOver) {
        game.physics.overlap(tube, birddie, function() {
          over();
          return fallSnd.play();
        });
        if (!gameOver && tube.body.bottom >= GROUND_Y) {
          over();
        }
        game.physics.overlap(tube, birds, hitBirds);
        if (!gameOver) {
          ground.tilePosition.x -= game.time.physicsElapsed * SPEED / 2;
        }
        if (!gameOver) {
          bg.tilePosition.x -= game.time.physicsElapsed * SPEED;
        }
      } else {
        if (tube.body.bottom >= GROUND_Y + 3) {
          tube.y = GROUND_Y - 13;
          tube.body.velocity.y = 0;
          tube.body.allowGravity = false;
          tube.body.gravity.y = 0;
        }
      }
    }
  };
  render = function() {};
  reset = function() {
    gameStart = false;
    gameOver = false;
    score = 0;
    birds.removeAll();
    createBirds();
    tube.reset(game.world.width * 0.3, game.world.height / 2);
  };
  state = {
    preload: preload,
    create: create,
    update: update,
    render: render
  };
  return game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'screem', state, false);
};

main();
