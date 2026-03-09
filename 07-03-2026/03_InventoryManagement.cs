using System;
using System.Collections.Generic;
using System.Linq; // Required for LINQ extensions like Where, OrderBy, Sum

public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
}

// 3. Inventory Engine (Core Component)
public class InventoryEngine
{
    // Filter low stock products using LINQ
    public void DisplayLowStock(List<Product> inventory)
    {
        Console.WriteLine("Low Stock Products:");
        
        // LINQ: Where filters the condition, Select grabs just the Name
        var lowStockNames = inventory
            .Where(p => p.Quantity < 10)
            .Select(p => p.Name);

        // string.Join avoids the need for a foreach loop to print
        Console.WriteLine(string.Join(Environment.NewLine, lowStockNames));
        Console.WriteLine();
    }

    // Sort products using LINQ
    public void DisplaySortedByPrice(List<Product> inventory)
    {
        Console.WriteLine("Products Sorted by Price:");

        // LINQ: OrderBy sorts ascending by default, Select formats the output string
        var sortedProducts = inventory
            .OrderBy(p => p.Price)
            .Select(p => $"{p.Name} - {p.Price}");

        Console.WriteLine(string.Join(Environment.NewLine, sortedProducts));
        Console.WriteLine();
    }

    // Calculate total inventory value
    public void DisplayTotalValue(List<Product> inventory)
    {
        Console.WriteLine("Total Inventory Value:");

        // LINQ: Sum multiplies the Price and Quantity for each item and adds it all up
        var totalValue = inventory.Sum(p => p.Price * p.Quantity);

        Console.WriteLine($"Rs {totalValue}");
    }
}

public class Solution
{
    public static void Main()
    {
        List<Product> products = new List<Product>
        {
            new Product { ProductId = 201, Name = "Laptop", Price = 60000, Quantity = 5 },
            new Product { ProductId = 202, Name = "Mouse", Price = 800, Quantity = 25 },
            new Product { ProductId = 203, Name = "Keyboard", Price = 1500, Quantity = 8 },
            new Product { ProductId = 204, Name = "Monitor", Price = 12000, Quantity = 12 }
        };

        InventoryEngine engine = new InventoryEngine();

        engine.DisplayLowStock(products);
        engine.DisplaySortedByPrice(products);
        engine.DisplayTotalValue(products);
        Console.WriteLine();

    }
}