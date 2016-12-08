define(["app/arena"], function(Arena){
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    var width = canvas.get(0).width;
    var height = canvas.get(0).height;

    var arena = new Arena(width, height); //creates the arena and the snake
    var unit_length = 10;
    var ingredient_types = ["tomato", "pineapple", "pepper", "onion", "meat"];

    this.kebab_ingredients = [];

    function init(){
        direction = "right";

        the_big_kebab = new Kebab(0,0);

        // create initial snake
        // TODO: push one with a skewer


        // add 4 others
        for (var i = 0; i < 5; i++ ){
            add_ingredient(get_ran_ingredient());
        }
    }

    function get_ran_ingredient(){
        return ingredient_types[Math.floor(Math.random()*ingredient_types.length)];

    }

    function add_ingredient(type){
        // TODO: add ingredient taking into account others' coordinates
        this.kebab_ingredients.append(new Ingredient(type));

    }

    function draw() {
        context.clearRect(0, 0, width, height);
        arena.draw(context);

        // TODO: add LOSER clauses and restart game
    }

    // check keyboard keys and update direction variable
    $(document).keydown(function(e){
        var k = e.which;
        if (k == "37" && the_big_kebab.direction != "right") the_big_kebab.direction = "left";
        if (k == "38" && the_big_kebab.direction != "down") the_big_kebab.direction = "up";
        if (k == "39" && the_big_kebab.direction != "left") the_big_kebab.direction = "right";
        if (k == "40" && the_big_kebab.direction != "up") the_big_kebab.direction = "down";
    })

    function update() {
        if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 120);
		// TODO: check if the wall will be hit
		// TODO: move in increments of the image size

    }

})

