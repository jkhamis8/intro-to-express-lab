const express = require('express');
//const morgan = require('morgan');
// Create an Express app
const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/greetings/:name', (req, res) => {
  res.send(`Hello there, ${req.params.name}!`);
});

app.get('/roll/:number', (req, res) => {
  let paramNum = parseInt(req.params.number)

  if (!paramNum) {
    res.send(`You must specify a number.`);
  } else {
    let rands = Math.random(0, req.params.number)
    res.send(`this is  Number, ${rands}!`);
  }

});


app.get('/collectibles/:index', (req, res) => {
  if (req.params.index > 2) {
    res.send('This item is not yet in stock. Check back soon!')
  }
  res.send(`So, you want the ${collectibles[req.params.index].name} For ${collectibles[req.params.index].price}, it can be yours!`);
});

app.get('/shoes', (req, res) => {
  let theShoes = ''
  let min = req.query.min
  let max = req.query.max
  let type = req.query.type
  console.log(min === undefined);

  shoes.forEach((val) => {

    if (max === undefined && min === undefined && type === undefined) {
      theShoes += `<div>Name ${val.name}, price ${val.price}, type ${val.type}</div>`;
    }
    else if (val.price > min && val.price < max && val.type == type) {
      theShoes += `<div>Name ${val.name}, price ${val.price}, type ${val.type}</div>`;
    }
  })
  res.send(theShoes)

});


app.listen(3000, () => {
  console.log('Listening on port 3000')
})