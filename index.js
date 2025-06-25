const express = require('express');
const app = express();

const fetchRecipesRoute = require('./routes/FetchRecipes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/fetchRecipes', fetchRecipesRoute)


app.listen(4000, () => {
    console.log(`It's working`)
})