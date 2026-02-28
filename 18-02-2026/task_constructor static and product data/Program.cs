using System;

namespace InventoryManagement
{
    public class Product
    {
        // Static Field
        private static string companyName;

        // Instance Fields
        private int product_Id;
        private string product_Name;
        private DateTime expiry_Date;
        private int quantity;
        private string iso_Standard;
        private double product_Price;

        static Product()
        {
            companyName = "Global Tech Inventory Pvt Ltd";
            Console.WriteLine("Static Constructor Called");
        }

        public Product()
        {
            Console.WriteLine("Default Constructor Called");
        }

        public Product(int id, string name, DateTime expiry, int qty, string iso, double price)
        {
            product_Id = id;
            product_Name = name;
            expiry_Date = expiry;
            quantity = qty;
            iso_Standard = iso;
            product_Price = price;

            Console.WriteLine("Parameterized Constructor Called");
        }

        public void DisplayData()
        {
            Console.WriteLine("\n--- Product Details ---");
            Console.WriteLine($"Company: {companyName}");
            Console.WriteLine($"Product ID: {product_Id}");
            Console.WriteLine($"Product Name: {product_Name}");
            Console.WriteLine($"Expiry Date: {expiry_Date.ToShortDateString()}");
            Console.WriteLine($"Quantity: {quantity}");
            Console.WriteLine($"ISO Standard: {iso_Standard}");
            Console.WriteLine($"Product Price: {product_Price}");
            Console.WriteLine($"Total Stock Value: {CalculateTotalValue()}");
        }

        public double CalculateTotalValue()
        {
            return quantity * product_Price;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {

            Product p1 = new Product(
                101,
                "Apple MacBook Pro M3",
                new DateTime(2028, 12, 31),
                5,
                "ISO 9001",
                199999.99
            );

            Product p2 = new Product(
                102,
                "Samsung Galaxy S24 Ultra",
                new DateTime(2027, 12, 31),
                10,
                "ISO 14001",
                129999.50
            );

            Product p3 = new Product(
                103,
                "Redmi Note 13 Pro",
                new DateTime(2027, 6, 30),
                20,
                "ISO 27001",
                24999.75
            );

            p1.DisplayData();
            p2.DisplayData();
            p3.DisplayData();

            Console.ReadLine();
        }
    }
}
