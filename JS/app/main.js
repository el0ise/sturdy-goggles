var game;

game = new Phaser.game(1000,600, Phaser.AUTO,'');

game.state.add("Menu",Menu);

game.state.start("Menu");