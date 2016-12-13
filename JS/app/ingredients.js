define(["app/game"], function(game)){

    function Ingredient(type,x,y){
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.type = type;

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
            var randomX = Math.floor(Math.random()*40)*width;
            var randomY =Math.floor(Math.random()*24)*height;


        }


    }




}