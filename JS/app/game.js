define(["jquery"], function(){
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    var width = canvas.get(0).width;
    var height = canvas.get(0).height;

    var unit_length = 25;
    var score = 0;
    var speed = 4;

    var columns = width/unit_length;
    var rows = height/unit_length;
    var gridlist, direction;
    var head_coordinate, x_head,y_head;
    // Load each image
    var tomato_image;
    var meat_image;
    var onion_image;

    // List of the ingredients in the snake
    this.kebab_ingredients = [];

    // List of possible ingredient types
    var ingredient_types = ["tomato", "pineapple", "red_pepper", "green_pepper", "onion", "meat"];

    // List of possible cell conditions
    var condition = ["grill", "fire", "kebab", "active_ingredient","skewer_tail"];


    function init(rows, columns){
        // Clear the board (gridlist will be reinstatiated below)
        kebab_ingredients = [];

        direction = "right";

        // Create dictionary of grid coordinates -- (x, y): condition
        gridlist = make_gridlist(rows,columns);

        // Define the borders
        make_obstructions(gridlist);

        // Create skewer "head"
        // push skewer into kebab_ingredients, change coordinate of skewer (20,12) to (2, 0) in gridlist
        kebab_ingredients.append("skewer_head");
        gridlist[[20,12]] = [2,0];
         
        // Add 3 random ingredients
        for (var i = 0; i < 3; i++ ){
            add_ingredient(get_ran_ingredient());
            gridlist[[20-(i+1),12]] = [2,(i+1)];
        }

        //Adds "skewer_tail"
        gridlist[[16,12]] = 4;

        //Keeps track of position of the head
        head_coordinate=get_head(gridlist);

    }

    // Returns random ingredient from ingredient_types
    function get_ran_ingredient(){
        return ingredient_types[Math.floor(Math.random()*ingredient_types.length)];
    }

    // Adds given ingredient to ingredient_types
    function add_ingredient(type){
        // Add ingredient to kebab_ingredients
        this.kebab_ingredients.append(type);

    }

    // Add ingredient to random grid coordinate
    function add_active_ingredient(gridlist){
        
        var random_coord = get_ran_coordinate;
        while (gridlist[random_coord] != 0){
            random_coord = get_ran_coordinate; //IS THIS LEGIT? DOESNT IT NEED (R,C)
        }
        gridlist[random_coord] = [3,get_ran_ingredient];
    }

    //Returns random coordinate for active_ingredient
    function get_ran_coordinate(rows, columns){
        return ([Math.floor(Math.random()*columns)*unit_length, Math.floor(Math.random()*rows)*unit_length]);
    }

    // Returns dictionary of grid coordinates and associated condition
    function make_gridlist(rows,columns){
        var gridlist = {};
        for(var r = 0; r < rows; r++){
            for (var c = 0; c <columns; c++) {
               gridlist[[c, r]]= 0;
           }
        }
        return gridlist;
    }


    // Defines coordinates that will burn the kebab
    function make_obstructions(gridlist){
        for(var r = 0; r < rows; r = (r+rows-1)){
            for (var c = 0; c < columns; c = (c+columns-1)) {
               gridlist[[c, r]]= 1;
           }
        }
        return gridlist;
    }

    function get_head(gridlist){
        for(var key in gridlist){
            var value = gridlist[key];
            if (value == [2,0]) {
                return key;
            }
        }
    }

    function draw_image(type){
        var image_to_draw = new Image();
        image_to_draw.src= 'css/'+ type +'.png';
        image_to_draw.onload = function(){
            context.drawImage(image_to_draw, r*unit_length,c*unit_length,25,25);
        }
    }


    function draw() {
        context.clearRect(0, 0, width, height);
        arena.draw(context);
        var image_to_draw;
        // TODO: Iterate through gridlist and draw according to condition
        for (var r = 0; r < rows; r ++){
            for (var c = 0; c < columns; c ++){
                var cell_condition = gridlist[[c, r]];
                
                // If the cell is fire
                if (cell_condition == 1){
                    draw_image(condition[1]);                  
                    // TODO: draw fire?
                }

                // If the cell is part of the kebab
                else if (cell_condition[0] == 2){
                    image_to_draw = gridlist[(c, r)][1];
                    draw_image(cell_condition[1])
                    //context.drawImage(image_to_draw); // TODO: this needs to be the image path??? idk!
                }

                // If the cell is the active ingredient
                else if (cell_condition[0] == 3){
                    draw_image(cell_condition[1]);
                }
                 else if (cell_condition == 4){
                    draw_image(condition[4]);
                }
            }
        }


    }

    // check keyboard keys and update direction variable
    $(document).keydown(function(e){
        var k = e.which;
        if (k == "37" && direction != "right") direction = "left";
        if (k == "38" && direction != "down") direction = "up";
        if (k == "39" && direction != "left") direction = "right";
        if (k == "40" && direction != "up") direction = "down";
    })

    function update() {
        if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 120);
        head_coordinate = get_head(gridlist);
        x_head = head_coordinate[0];
        y_head = head_coordinate[1];
        if (direction == 'left') {
            if (gridlist[[x_head-1,y_head]] == 1) {
                //TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head-1,y_head]][0] == 2 ) {
                // TODO: DIE DIE DIE
            }
             else if (gridlist[[x_head-1,y_head]][0] == 3) {
                score += 1;
                add_ingredient(gridlist[[x_head-1,y_head]][1]);
                gridlist[[x_head-1,y_head]] = [2,-1];

                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
            } 
            else if (gridlist[[x_head-1,y_head]] == 4 ) {
                // TODO: DIE DIE DIE
            }
            else(){
                gridlist[[x_head-1,y_head]] = [2,-1];
            }
           

        }
        else if (direction=='right') {
            if (gridlist[[x_head+1,y_head]] == 1) {
                //TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head+1,y_head]][0] == 2) {
                // TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head+1,y_head]][0] == 3) {
                score += 1;
                add_ingredient(gridlist[[x_head+1,y_head]][1]);
                gridlist[[x_head-+,y_head]] = [2,-1];
                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
            } 
            else if (gridlist[[x_head+1,y_head]] == 4) {
                // TODO: DIE DIE DIE
            }
            else(){
                gridlist[[x_head+1,y_head]] = [2,-1];
            }
            
        }
        else if (direction=='up') {
            if (gridlist[[x_head,y_head-1]] == 1) {
                //TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head,y_head-1]][0] == 2) {
                // TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head,y_head-1]][0] == 3) {
                score += 1;
                add_ingredient(gridlist[[x_head,y_head-1]][1]);
                gridlist[[x_head,y_head-1]] = [2,-1];
                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
            } 
            else if (gridlist[[x_head,y_head-1]] == 4) {
                // TODO: DIE DIE DIE
            }
            else(){
                gridlist[[x_head,y_head-1]] = [2,-1];
            }

        }
        else if (direction=='down') {
            if (gridlist[[x_head,y_head+1]] == 1) {
                //TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head,y_head+1]][0] == 2) {
                // TODO: DIE DIE DIE
            }
            else if (gridlist[[x_head,y_head+1]][0] == 3) {
                score += 1;
                add_ingredient(gridlist[[x_head,y_head+1]][1]);
                gridlist[[x_head,y_head+1]] = [2,-1];
                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
            } 
            else if (gridlist[[x_head,y_head+1]] == 4) {
                // TODO: DIE DIE DIE
            } 
            else(){
                gridlist[[x_head,y_head+1]] = [2,-1];
            }
        }
        for(var key in gridlist){
            var value = gridlist[key];
            if(value == 4){
                value = 0;
            }
            else if(value[0] == 2){
                value[1] = value[1]+1;
                if (value[1] >= kebab_ingredients.length) {
                    value = 4;
                }
            }
            
        }
		// TODO: Update gridlist to reflect snake moving in direction of "direction"
		    // TODO: Check if ingredient will be hit
		        // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
                // TODO: Add new random ingredient to gridlist -- go through gridlist, anything that's a 0
            // TODO: Check if wall will be hit

    }

})

