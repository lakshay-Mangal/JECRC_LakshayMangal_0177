Problem: Sales Data Aggregator

A sales system needs to aggregate daily sales by product and region.

Requirements:

Group sales by product and region
Calculate total sales, average, min, max
Find best-selling product in each region
Identify underperforming products (< threshold)
Sample Input:

text

10

P001 North 1500

P001 South 2000

P002 North 3000

P001 East 2500

P002 South 1800

P003 North 1200

P001 West 2200

P002 West 2800

P003 South 900

P002 East 3200

 

Threshold: 2000

Sample Output:

text

--- Sales Report by Product and Region ---

 

Product P001:

  North: $1500

  South: $2000

  East: $2500

  West: $2200

  Total: $8200, Average: $2050.00

 

Product P002:

  North: $3000

  South: $1800

  West: $2800

  East: $3200

  Total: $10800, Average: $2700.00

 

Product P003:

  North: $1200

  South: $900

  Total: $2100, Average: $1050.00

 

Best Selling Product by Region:

North: P002 ($3000)

South: P001 ($2000)

East: P002 ($3200)

West: P002 ($2800)

 

Underperforming Products (< $2000 average):

P003 ($1050.00)

 

Insert your project link :

URL
Enter input
