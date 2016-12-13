define(["jquery"], function(){
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    var width = canvas.get(0).width;
    var height = canvas.get(0).height;

    var unit_length = 25;
    var score = 0;
    var speed = 4;

    var rows = width/unit_length;
    var columns = height/unit_length;
    var gridlist
    // List of the ingredients in the snake
    this.kebab_ingredients = [];

    // List of possible ingredient types
    var ingredient_types = ["tomato", "pineapple", "red_pepper", "green_pepper", "onion", "meat"];

    //
    var condition = ["grill", "fire", "kebab", "active_ingredient"];


    function init(rows, columns){
        // Clear the board (gridlist will be reinstatiated below)
        kebab_ingredients = [];

        direction = "right";
        new_direction = null;

        // Create dictionary of grid coordinates -- (x, y): condition
        gridlist = make_gridlist(rows,columns);

        // Define the borders
        make_obstructions(gridlist);

        // Create skewer "head"
        // push skewer into kebab_ingredients, change coordinate of skewer (20,12) to (2, 0) in gridlist
        kebab_ingredients.append("tip_right");

          // Add 3 random ingredients
        for (var i = 0; i < 3; i++ ){
            add_ingredient(get_ran_ingredient());
        }
        define_snake(gridlist);


    }

    // Returns random ingredient from ingredient_types
    function get_ran_ingredient(){
        return ingredient_types[Math.floor(Math.random()*ingredient_types.length)];

    }

    // Adds given ingredient to ingredient_types
    function add_ingredient(type){
        // Add ingredient to random grid coordinate
        var random_coord = get_ran_coordinate;
        while (gridlist[random_coord] != 0){
            random_coord = get_ran_coordinate;
        }
        gridlist[random_coord] = 3;

        // Add ingredient to kebab_ingredients
        this.kebab_ingredients.append(new Ingredient(type));

    }

    function get_ran_coordinate(rows, columns){
        return (Math.floor(Math.random()*columns), Math.floor(Math.random()*rows));
    }

    // Returns dictionary of grid coordinates and associated condition
    function make_gridlist(rows,columns){
        var gridlist = {};
        for(var r=0; r < rows; r++){
            for (var c = 0; c <columns; c++) {
               gridlist[(r,c)]= 0;
           }
        }
        return gridlist;
    }

    //Defines coordinates to initialise snake
    function define_snake(gridlist){
        for (var i= 0; i < kebab_ingredients.length; i++){
         gridlist[(20-i,12)]= (2,i);
        }
    
    }

    


    // Defines coordinates that will burn the kebab
    function make_obstructions(gridlist){
        for(var r=0; r < rows; r=(r+rows-1)){
            for (var c = 0; c <columns; c=(c+columns-1)) {
               gridlist[(r,c)]= 1;
           }
        }
        return gridlist;
    }


    function draw() {
        context.clearRect(0, 0, width, height);
        arena.draw(context);

        // TODO: Iterate through gridlist and draw according to condition


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
		// TODO: Update gridlist to reflect snake moving in direction of "direction"
		    // TODO: Check if ingredient will be hit
		        // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
                // TODO: Add new random ingredient to gridlist -- go through gridlist, anything that's a 0
            // TODO: Check if wall will be hit

    }

})

