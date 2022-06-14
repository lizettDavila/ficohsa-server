const dontenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const articleService = require('./services/article-service');

//use enviroment variables
dontenv.config()


const app = express()

//Middlewares
app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).json({message: error.message});
})

//Router
app.get(`/api/items`, async (req, res) => {
    const query = req.query.q;
    let responses = await articleService.getArticlesByCategory(query);
    if(responses.data.length > 0){
        res.send(responses.data);
    }else{
        let response = await articleService.getArticleById(query);
        if(response.error){
            res.status(404).send({message: 'No articles found'});
        }else{
            res.send(response);
        }
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`)
})


module.exports = app