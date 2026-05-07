using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void DisplaySet(HashSet<string> set)
    {
        Console.WriteLine(string.Join(", ", set));
    }

    static void Main()
    {
        HashSet<string> electronics = new HashSet<string>
        {
            "C001", "C002", "C003", "C005", "C008"
        };

        HashSet<string> clothing = new HashSet<string>
        {
            "C002", "C004", "C005", "C006", "C009"
        };

        HashSet<string> books = new HashSet<string>
        {
            "C003", "C005", "C007", "C008", "C010"
        };

        // 1. Union
        HashSet<string> anyCategory = new HashSet<string>(electronics);
        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        // 2. Intersection
        HashSet<string> allCategories = new HashSet<string>(electronics);
        allCategories.IntersectWith(clothing);
        allCategories.IntersectWith(books);

        // 3. Only Electronics
        HashSet<string> onlyElectronics = new HashSet<string>(electronics);
        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        // 4. Electronics AND Books but NOT Clothing
        HashSet<string> electronicsAndBooks = new HashSet<string>(electronics);
        electronicsAndBooks.IntersectWith(books);
        electronicsAndBooks.ExceptWith(clothing);

        Console.WriteLine("--- Customer Preference Analysis ---");

        Console.WriteLine("\n1. Customers in ANY category (Union):");
        DisplaySet(anyCategory);
        Console.WriteLine($"Total: {anyCategory.Count} customers");

        Console.WriteLine("\n2. Customers in ALL categories (Intersection):");
        DisplaySet(allCategories);
        Console.WriteLine($"Total: {allCategories.Count} customer");

        Console.WriteLine("\n3. Customers ONLY in Electronics:");
        DisplaySet(onlyElectronics);
        Console.WriteLine($"Total: {onlyElectronics.Count} customers");

        Console.WriteLine("\n4. Customers in Electronics AND Books but NOT Clothing:");
        DisplaySet(electronicsAndBooks);
        Console.WriteLine($"Total: {electronicsAndBooks.Count} customers");
    }
}