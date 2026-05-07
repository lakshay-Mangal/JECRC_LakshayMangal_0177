Problem: Warehouse Stock Tracker

A warehouse needs to track product quantities across multiple locations. Use Dictionary for fast lookups and updates.

Requirements:

Track products with ProductId as key
Store quantity for each product
Support ADD, REMOVE, CHECK, and DISPLAY operations
Validate operations (can't remove more than available)
Handle bulk operations
Input Format:

First line: N (number of operations)
Next N lines: Operation commands
Operations:

ADD <productId> <quantity> - Add stock
REMOVE <productId> <quantity> - Remove stock (validate)
CHECK <productId> - Display current quantity
BULK <productId1>:<qty1>,<productId2>:<qty2> - Add multiple products
DISPLAY - Show all products with stock > 0
Sample Input:

text

10

ADD 1001 50

ADD 1002 30

CHECK 1001

ADD 1001 25

REMOVE 1002 10

BULK 1003:75,1004:40

CHECK 1002

REMOVE 1002 25

DISPLAY

ADD 1001 10

DISPLAY

Sample Output:

text

Product 1001: 50 units

Product 1002: 20 units

Product 1003: 75 units

Product 1004: 40 units

--- Current Inventory ---

1001: 75 units

1002: 20 units

1003: 75 units

1004: 40 units

--- Updated Inventory ---

1001: 85 units

1002: 20 units

1003: 75 units

1004: 40 units