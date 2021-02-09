# wordsearch-app

A simple web app that uses the wordsearch-api to enable users to play an implementation of the popular word search game. 

## How it works

A java [spring boot API](https://github.com/b1llyjon3s/wordsearch-api) handles the setting up of the word grid. It takes the grid size and a list of words as request parameters and returns the grid as a string.

The front-end javascript makes a call to this API (with the grid size and a list of words) and formats it as a table.

## Play it

https://wordgrid-app.herokuapp.com/
