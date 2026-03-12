function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.votes = 0;
  this.views = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.jpg');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

function getRandomIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

function renderImages() {

  let index1;
  let index2;
  let index3;

  do {
    index1 = getRandomIndex();
    index2 = getRandomIndex();
    index3 = getRandomIndex();

  } while (
    index1 === index2 ||
    index1 === index3 ||
    index2 === index3 ||
    previousImages.includes(index1) ||
    previousImages.includes(index2) ||
    previousImages.includes(index3)
  );

  previousImages = [index1, index2, index3];

  let product1 = Product.allProducts[index1];
  let product2 = Product.allProducts[index2];
  let product3 = Product.allProducts[index3];

  img1.src = product1.filePath;
  img2.src = product2.filePath;
  img3.src = product3.filePath;

  img1.alt = product1.name;
  img2.alt = product2.name;
  img3.alt = product3.name;

  product1.views++;
  product2.views++;
  product3.views++;
}
let previousImages = [];

renderImages();

let totalClicks = 0;
let maxClicks = 25;

let container = document.getElementById('product-container');
container.addEventListener('click', handleClick);

function handleClick(event){

  if(event.target.tagName !== 'IMG'){
    return;
  }

  let clickedProduct = event.target.alt;

  for(let i = 0; i < Product.allProducts.length; i++){
    if(Product.allProducts[i].name === clickedProduct){
      Product.allProducts[i].votes++;
    }
  }

  totalClicks++;

  if(totalClicks < maxClicks){
    renderImages();
  } else {
    container.removeEventListener('click', handleClick);
  }

}

let resultsBtn = document.getElementById('results-btn');
resultsBtn.addEventListener('click', showResults);



function showResults(){

  let ul = document.getElementById('results-list');

  ul.innerHTML = '';

  let names = [];
  let votes = [];

  for(let i = 0; i < Product.allProducts.length; i++){

    let product = Product.allProducts[i];

    let li = document.createElement('li');

    li.textContent =
      product.name +
      ' had ' +
      product.votes +
      ' votes and was seen ' +
      product.views +
      ' times';

    ul.appendChild(li);

    names.push(product.name);
    votes.push(product.votes);
  }

  let ctx = document.getElementById('resultsChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes',
        data: votes
      }]
    }
  });

  resultsBtn.removeEventListener('click', showResults);

}