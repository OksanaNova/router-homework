const { Router } = require('express');
const router = Router();

// импортировали массив с рецептами
let recipes = require('../Recipes');


// создадим api, которая покажет в браузере наш список рецептов
router.get('/', (req, res) => {
    res.json(recipes);
})


router.post('/', (req, res) => {
    const newRecipe = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    recipes.push(newRecipe);
    res.json(recipes);
})

router.delete('/:id', (req, res) => {
    let { id } = req.params;
    let recipeToBeDeleted = recipes.find(recipe => recipe.id === id);
    
    if (recipeToBeDeleted) {
        res.json({
            message: 'Recipe deleted',
            recipes: recipes.filter(recipe => recipe.id !== id)
        })
    } else {
        res.status(404)
        .json({ message: `Recipe you are looking for doesn't exist` })
    }
})

router.put('/:name', (req, res) => {
    let { name } = req.params;
    let recipeToBeUpdated = recipes.find(recipe => recipe.name === name);

    if (recipeToBeUpdated) {
        const updateRecipe = req.body;
        recipes.forEach(recipe => {
            if (recipe.name === req.params.name) {
                recipe.name = updateRecipe ? updateRecipe.name : recipe.name;
                recipe.id = updateRecipe ? updateRecipe.id : recipe.id;
                recipe.price = updateRecipe ? updateRecipe.price : recipe.price;

                res.json({ message: 'Recipe updated', recipe})
            }
        })
    } else {
        res.status(404)
        .json({ message: `Recipe you are looking for ${req.params.name} doesn't exist` })
    }
})

module.exports = router;