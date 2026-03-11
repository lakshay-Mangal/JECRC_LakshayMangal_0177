var ordersAmount = [800,1000,1200,1100,3000,1500,900]


var highOrdersAmount = ordersAmount.filter(order => order > 1000);

console.log(highOrdersAmount);