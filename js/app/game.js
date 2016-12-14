define(["jquery"], function(){
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    var width = canvas.get(0).width;
    var height = canvas.get(0).height;
    //var arena = new Arena();

    var unit_length = 25;
    var score = 0;
    var speed = 4;
    var ran;

    var columns = width/unit_length; // number of columns
    var rows = height/unit_length; // number of rows
    var gridlist, direction;
    var head_coordinate, x_head, y_head;

    // List of the ingredients in the snake
    this.kebab_ingredients = [];

    // List of possible ingredient types
    var ingredient_types = ["tomato", "pineapple", "red_pepper", "green_pepper", "onion", "meat", "skewer_head"];

    // List of possible cell conditions
    var condition = ["grill", "fire", "kebab", "active_ingredient","skewer_tail"];


    function init(rows, columns){
        // Clear the board (gridlist will be reinstatiated below)
        kebab_ingredients = [];

        direction = "right";

        // Create nested arrays of grid coordinates [row][column]
        gridlist = make_gridlist(rows,columns);

        // Define the borders -- TODO: I don't think this is being done correctly!
        gridlist = make_obstructions(gridlist);


        // Create skewer "head"
        // Push skewer into kebab_ingredients, give initial starting point
        kebab_ingredients.push("skewer_head");
        gridlist[20][12] = [2, 0];


        // Add 3 random ingredients
        for (var i = 0; i < 3; i++ ){
            ran = get_ran_ingredient();
            kebab_ingredients.push(ran);
            gridlist[20][12-(i+1)] = [2, i+1];
        }

        //Adds "skewer_tail"
        gridlist[20][7] = 4;

        //add_active_ingredient(gridlist);


        //Keeps track of position of the head
        head_coordinate = get_head(gridlist);
        console.log(head_coordinate);

    }

    function print_grid(gridlist){
        for(var r = 0; r < 2; r++){
            for(var c = 0; c < columns; c ++){
            }
        }
    }

    // Returns array of arrays and associated condition (default to 0)
    function make_gridlist(rows,columns){
        var gridlist = [];
        for(var r = 0; r < rows; r++){
           gridlist[r] = Array.apply(null, new Array(columns)).map(Number.prototype.valueOf, 0);
        }
        return gridlist;
    }

        // Defines coordinates that will burn the kebab
    function make_obstructions(gridlist){
        for(var r = 0; r < rows; r = (r+rows-1)){
            for (var c = 0; c < columns; c++) {
               gridlist[r][c] = 1;
           }
        }
        for(var r = 0; r < rows; r++){
            for(var c = 0; c < columns; c = (c+columns-1)){
                gridlist[r][c] = 1;
            }
        }
        return gridlist;
    }

    // Returns random ingredient from ingredient_types
    function get_ran_ingredient(){
        return ingredient_types[Math.floor(Math.random()*(ingredient_types.length-1))];
    }

//    // Add ingredient to random grid coordinate
//    function add_active_ingredient(gridlist){
//        var random_coord = get_ran_coordinate(rows, columns); //random_coord is a list
//
//        while (gridlist[random_coord[1]][random_coord[0]] != 0){
//            random_coord = get_ran_coordinate();
//        }
//
//        gridlist[random_coord[1]][random_coord[2]] = [3, get_ran_ingredient()];
//    }

    //Returns random coordinate
    function get_ran_coordinate(rows, columns){
        return [Math.floor(Math.random()*columns), Math.floor(Math.random()*rows)];
    }


// TODO: This doesn't work right now
    function get_head(gridlist){
       for(var row = 0; row < rows; row++){
            for(var c = 0; c < columns; c++){
                if(gridlist[row][c] != 2){
                    if(gridlist[row][c][1] == 0){
                        return([row, c]);
                    }
                }
            }
        }
   }

    function draw_image(x, y, type){
        var image_to_draw = new Image();
        image_to_draw.src= 'css/images/'+ type +'.png';
        image_to_draw.onload = function(){
            context.drawImage(image_to_draw, x*unit_length, y*unit_length, 25, 25);//r*unit_length,c*unit_length,25,25);
        }

    }


    function draw() {
        //context.clearRect(0, 0, width, height);
        //arena.draw(context);
        var image_to_draw;
        // TODO: Iterate through gridlist and draw according to condition
        for (var r = 0; r < rows; r ++){
            for (var c = 0; c < columns; c ++){
                var cell_condition = gridlist[r][c];

                if (cell_condition != 0){

                    // If the cell is fire
                    if (cell_condition == 1){
                        continue;
                        // TODO: get image of fire
                        //draw_image(condition[1]);
                    }

                    // If the cell is part of the kebab
                    else if (cell_condition[0] == 2){
                        draw_image(c, r, kebab_ingredients[gridlist[r][c][1]]);

                    }

                    // If the cell is the active ingredient
                    else if (cell_condition[0] == 3){
                        continue;
                        //draw_image(c, r, gridlist[r][c][1]);
                    }

                     else if (cell_condition == 4){
                        //draw_image(c, r, gridlist[r][c][1]);
                        continue;
                    }
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
//        if(typeof game_loop != "undefined") clearInterval(game_loop);
//		game_loop = setInterval(paint, 120);
//        head_coordinate = get_head(gridlist);
//        x_head = head_coordinate[0];
//        y_head = head_coordinate[1];
//        if (direction == 'left') {
//            if (gridlist[[x_head-1,y_head]] == 1) {
//                //TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head-1,y_head]][0] == 2 ) {
//                // TODO: DIE DIE DIE
//            }
//             else if (gridlist[[x_head-1,y_head]][0] == 3) {
//                score += 1;
//                add_ingredient(gridlist[[x_head-1,y_head]][1]);
//                gridlist[[x_head-1,y_head]] = [2,-1];
//
//                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
//            }
//            else if (gridlist[[x_head-1,y_head]] == 4 ) {
//                // TODO: DIE DIE DIE
//            }
//            else(){
//                gridlist[[x_head-1,y_head]] = [2,-1];
//            }
//
//
//        }
//        else if (direction=='right') {
//            if (gridlist[[x_head+1,y_head]] == 1) {
//                //TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head+1,y_head]][0] == 2) {
//                // TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head+1,y_head]][0] == 3) {
//                score += 1;
//                add_ingredient(gridlist[[x_head+1,y_head]][1]);
//                gridlist[[x_head-+,y_head]] = [2,-1];
//                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
//            }
//            else if (gridlist[[x_head+1,y_head]] == 4) {
//                // TODO: DIE DIE DIE
//            }
//            else(){
//                gridlist[[x_head+1,y_head]] = [2,-1];
//            }
//
//        }
//        else if (direction=='up') {
//            if (gridlist[[x_head,y_head-1]] == 1) {
//                //TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head,y_head-1]][0] == 2) {
//                // TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head,y_head-1]][0] == 3) {
//                score += 1;
//                add_ingredient(gridlist[[x_head,y_head-1]][1]);
//                gridlist[[x_head,y_head-1]] = [2,-1];
//                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
//            }
//            else if (gridlist[[x_head,y_head-1]] == 4) {
//                // TODO: DIE DIE DIE
//            }
//            else(){
//                gridlist[[x_head,y_head-1]] = [2,-1];
//            }
//
//        }
//        else if (direction=='down') {
//            if (gridlist[[x_head,y_head+1]] == 1) {
//                //TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head,y_head+1]][0] == 2) {
//                // TODO: DIE DIE DIE
//            }
//            else if (gridlist[[x_head,y_head+1]][0] == 3) {
//                score += 1;
//                add_ingredient(gridlist[[x_head,y_head+1]][1]);
//                gridlist[[x_head,y_head+1]] = [2,-1];
//                // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
//            }
//            else if (gridlist[[x_head,y_head+1]] == 4) {
//                // TODO: DIE DIE DIE
//            }
//            else(){
//                gridlist[[x_head,y_head+1]] = [2,-1];
//            }
//        }
//        for(var key in gridlist){
//            var value = gridlist[key];
//            if(value == 4){
//                value = 0;
//            }
//            else if(value[0] == 2){
//                value[1] = value[1]+1;
//                if (value[1] >= kebab_ingredients.length) {
//                    value = 4;
//                }
//            }
//
//        }
		// TODO: Update gridlist to reflect snake moving in direction of "direction"
		    // TODO: Check if ingredient will be hit
		        // TODO: Add ingredient to kebab_ingredients, change the coordinate's condition from 3 to 2
                // TODO: Add new random ingredient to gridlist -- go through gridlist, anything that's a 0
            // TODO: Check if wall will be hit

    }

	function animationLoop(time) {
		update();
		draw();
		window.requestAnimationFrame(animationLoop);
	}

    init(rows, columns);

    console.log("initial kebab ingredients", kebab_ingredients);
    console.log(gridlist);

	// Start game!
	window.requestAnimationFrame(animationLoop);


})

