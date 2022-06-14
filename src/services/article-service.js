const fetch = require('node-fetch');

const getArticlesByCategory = async (category) => {
  const articles = await fetch(
    `${process.env.URL_API}/all?categories=${category}&api_token=${process.env.API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return articles.json()
};

const getArticleById = async (id) => {
    const article = await fetch(
        `${process.env.URL_API}/uuid/${id}?api_token=${process.env.API_KEY}`,
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
    return article.json();
}

module.exports = {
    getArticlesByCategory,
    getArticleById
}