define(["app/ingredient", "app/game"], function(Ingredient, game){


    function Arena(w, h) {
        this.width = w;
        this.height = h;
        this.active_ingredients = [];

        Arena.prototype = {
            isIngredientHit: function() {
                // TODO: add ingredient to the snake array
            },


            draw: function(canvasContext) {
                // TODO: draw an active ingredient (if one doesn't exist??)


            }

        }

    }

    return Arena;

})