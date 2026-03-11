var prices= [300,300,400,1000,600,400,550,450];

var totalPrice = prices.reduce((sum, price) => sum + price, 0);

console.log(totalPrice);
