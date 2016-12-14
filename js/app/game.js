define(["jquery"], function(){
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    var width = canvas.get(0).width;
    var height = canvas.get(0).height;

    var unit_length = 25;
    var score = 0;
    var speed = 4;
    var ran;
    var game_over;
    var fps = 30;

    var columns = width/unit_length; // number of columns
    var rows = height/unit_length; // number of rows
    var gridlist, direction;
    var head_coordinate, r_head, c_head;


    // List of the ingredients in the snake
    this.kebab_ingredients = [];

    // List of possible ingredient types
    var ingredient_types = ["tomato", "pineapple", "red_pepper", "green_pepper", "onion", "meat", "skewer_head"];

    // List of possible cell conditions
    var condition = ["grill", "fire", "kebab", "active_ingredient","skewer_tail"];

    function init(rows, columns){
        game_over = false;
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
        gridlist[12][20] = [2, 0];


        // Add 3 random ingredients
        for (var i = 0; i < 3; i++ ){
            ran = get_ran_ingredient();
            kebab_ingredients.push(ran);
            gridlist[12][20-(i+1)] = [2, i+1];
        }

        //Adds "skewer_tail"
        gridlist[12][16] = 4;

        add_active_ingredient(gridlist);


        //Keeps track of position of the head
        head_coordinate = get_head(gridlist);

    }

    function print_grid(gridlist){
        for(var r = 0; r < 2; r++){
            for(var c = 0; c < columns; c ++){
            }
        }
    }

    function make_gridlist(rows,columns){
    // Returns array of arrays and associated condition (default to 0)
        var gridlist = [];
        for(var r = 0; r < rows; r++){
           gridlist[r] = Array.apply(null, new Array(columns)).map(Number.prototype.valueOf, 0);
        }
        return gridlist;
    }

    function make_obstructions(gridlist){
    // Defines coordinates that will burn the kebab

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

    function get_ran_ingredient(){
    // Returns random ingredient from ingredient_types
        return ingredient_types[Math.floor(Math.random()*(ingredient_types.length-1))];
    }

   // Add ingredient to random grid coordinate
    function add_active_ingredient(gridlist){
        var random_coord = get_ran_coordinate(rows,columns);
       gridlist[random_coord[0]][random_coord[1]] = [3, get_ran_ingredient()];
   }

    //Returns random coordinate
    function get_ran_coordinate(rows, columns){
        var random_coord = [Math.floor(Math.random()*rows), Math.floor(Math.random()*columns)]; //random_coord is a list
           while (random_coord != NaN && gridlist[random_coord[0]][random_coord[1]] != 0){
               random_coord = [Math.floor(Math.random()*rows), Math.floor(Math.random()*columns)];
           }
        return random_coord;
    }

    function get_head(gridlist){
       for(var row = 0; row < rows; row++){
            for(var c = 0; c < columns; c++){
                if(gridlist[row][c][0] != undefined){
                    if(gridlist[row][c][1] == 0){
                        return([row,c]);
                    }
                }
            }
        }
   }

    function draw_image(r, c, type){
        var image_to_draw = new Image();
        image_to_draw.src= 'css/images/'+ type +'.png';
        image_to_draw.onload = function(){
            context.drawImage(image_to_draw, c*unit_length, r*unit_length, 25, 25);//r*unit_length,c*unit_length,25,25);
        }

    }

    function clear_image(r,c){
        var image_to_draw = new Image();
        image_to_draw.src= 'css/images/grill.png';
        image_to_draw.onload = function(){
            context.drawImage(image_to_draw, c*unit_length, r*unit_length, 25, 25,c*unit_length, r*unit_length, 25, 25);//r*unit_length,c*unit_length,25,25);
        }
    }


    function draw() {
        //context.clearRect(0,0,width,height);
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
                        draw_image(r,c,condition[1]);
                    }

                    else if (cell_condition == 4){
                        context.clearRect(25*c,25*r,25,25);
                        draw_image(r,c, condition[4]);

                    }

                    // If the cell is part of the kebab
                    else if (cell_condition[0] == 2){
                        clear_image(r,c);
                        draw_image(r,c, kebab_ingredients[gridlist[r][c][1]]);
                    }

                    // If the cell is the active ingredient
                    else if (cell_condition[0] == 3){
                        context.clearRect(25*c,25*r,25,25);
                        draw_image(r,c, gridlist[r][c][1]);
                    }


                }
                if(cell_condition == 0){
                    context.clearRect(25*c,25*r,25,25);
                    //clear_image(r,c);
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

    function move_snake(gridlist){
        for(var r = 0; r < rows; r++){
           for(var c = 0; c < columns; c++){

                if (gridlist[r][c] == 4) {
                    gridlist[r][c] = 0;
                }
                else if(gridlist[r][c][0] == 2){
                    if (gridlist[r][c][1] + 1 >= kebab_ingredients.length){
                        gridlist[r][c] = 4;
                    }
                    else {
                        gridlist[r][c][1] += 1;
                    }
                }
            }
        }
    }
    function draw_score() {
        context.font = "95px Char";
        context.fillStyle = "#e2120b";
        context.fillText(score, 60,100);
    }
    function update() {
        head_coordinate = get_head(gridlist);
        if(head_coordinate != undefined){
            c_head = head_coordinate[1];
            r_head = head_coordinate[0];
            if (direction == 'left') {
                if (gridlist[r_head][c_head-1] == 1) {
                     alert("YOU LOSE! YOU JUST BURNED THE KEBAB!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!" );
                     game_over = true;
                }
                else if (gridlist[r_head][c_head-1][0] == 2 && gridlist[r_head][c_head-1][1] != -1) {
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }
                else if (gridlist[r_head][c_head-1][0] == 3) {
                    score += 1;
                    kebab_ingredients.push(gridlist[r_head][c_head-1][1]);
                    gridlist[r_head][c_head-1] = [2,-1];
                    add_active_ingredient(gridlist);

                }
                else if (gridlist[r_head][c_head-1] == 4) {
                     game_over = true;
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                }
                else {
                    gridlist[r_head][c_head-1] = [2,-1];
                }

            }
            else if (direction=='right') {
                if (gridlist[r_head][c_head+1] == 1) {
                     alert("YOU LOSE! YOU JUST BURNED THE KEBAB!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }

                else if (gridlist[r_head][c_head+1][0] == 2&& gridlist[r_head][c_head+1][1] != -1) {
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }
                else if (gridlist[r_head][c_head+1][0] == 3) {
                    score += 1;
                    kebab_ingredients.push(gridlist[r_head][c_head+1][1]);
                    gridlist[r_head][c_head+1] = [2,-1];
                    add_active_ingredient(gridlist)

                }
                else if (gridlist[r_head][c_head+1] == 4) {
                     game_over = true;
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                }
                else {
                    gridlist[r_head][c_head+1] = [2,-1];
                }
            }
            else if (direction=='up') {
                if (gridlist[r_head-1][c_head] == 1) {
                     alert("YOU LOSE! YOU JUST BURNED THE KEBAB!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }

                else if (gridlist[r_head-1][c_head][0] == 2 && gridlist[r_head-1][c_head][1] != -1) {
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }
                else if (gridlist[r_head-1][c_head][0] == 3) {
                    score += 1;
                    kebab_ingredients.push(gridlist[r_head-1][c_head][1]);
                    gridlist[r_head-1][c_head] = [2, -1];
                    add_active_ingredient(gridlist);
                }
                else if (gridlist[r_head-1][c_head] == 4 ) {
                     game_over = true;
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                }
                else {
                    gridlist[r_head-1][c_head] = [2,-1];
                }
            }
            else if (direction=='down') {

                if (gridlist[r_head+1][c_head] == 1) {
                     alert("YOU LOSE! YOU JUST BURNED THE KEBAB!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }
                else if (gridlist[r_head+1][c_head][0] == 2 && gridlist[r_head+1][c_head][1] != -1) {
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                     game_over = true;
                }
                else if (gridlist[r_head+1][c_head][0] == 3) {
                    score += 1;
                    kebab_ingredients.push(gridlist[r_head+1][c_head][1]);
                    gridlist[r_head+1][c_head] = [2,-1];
                    add_active_ingredient(gridlist);

                }
                else if (gridlist[r_head+1][c_head] == 4) {
                     game_over = true;
                     alert("YOU LOSE! YOU JUST RAN INTO YOURSELF!"+ "\n" + "Your Kebab was "+ score+ " yeeds long!");
                }
                else {
                    gridlist[r_head+1][c_head] = [2,-1];
                }
            }
            move_snake(gridlist);
        }
    }

	function animationLoop(time) {
		if (game_over != true){
		    update();
            draw();
            draw_score();
            console.log(direction);
            var delay=100;
            setTimeout(function() {
                window.requestAnimationFrame(animationLoop);
            }, delay);
		}

	}

     document.querySelector('#btn').addEventListener('click', function() {
         init(rows, columns);
	     // Start game!
	     window.requestAnimationFrame(animationLoop);
     });
    init(rows, columns);
       //  // Start game!
    window.requestAnimationFrame(animationLoop);


})

