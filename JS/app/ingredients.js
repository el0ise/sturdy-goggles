define(["app/gameMath"], function(gameMath)){

    function Ingredient(type){
        this.x = 0//????x;
        this.y = 0//?????y;
        this.type = type;
        this.inSnake = false;

    }

    Ingredient.prototype = {
        testHit : function(){
            // Snake is moving up
            if (the_big_kebab.direction == "up"){

            }

            // Snake is moving down
            if (the_big_kebab.direction == "down"){

            }

            // Snake is moving left
            if (the_big_kebab.direction == "left"){

            }

            // Snake is moving right
            if (the_big_kebab.direction == "right"){

            }


        }
        draw: function(canvasContext){
        // TODO: draw at a random point if inSnake = false

        }


    }




}