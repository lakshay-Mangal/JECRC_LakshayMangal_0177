using System;

namespace InventoryManagement
{
    public class Product
    {
        private int product_Id;
        private string product_Name;
        private DateTime expiry_Date;
        private int quantity;
        private string iso_Standard;
        private double product_Price;

        public int ProductId
        {
            get { return product_Id; }
            set { product_Id = value; }
        }

        public string ProductName
        {
            get { return product_Name; }
            set { product_Name = value; }
        }

        public DateTime ExpiryDate
        {
            get { return expiry_Date; }
            set { expiry_Date = value; }
        }

        public int Quantity
        {
            get { return quantity; }
            set { quantity = value; }
        }

        public string IsoStandard
        {
            get { return iso_Standard; }
            set { iso_Standard = value; }
        }

        public double ProductPrice
        {
            get { return product_Price; }
            set { product_Price = value; }
        }

        public Product()
        {
        }

        public void GetData()
        {
            Console.Write("Enter Product ID: ");
            ProductId = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter Product Name: ");
            ProductName = Console.ReadLine();

            Console.Write("Enter Expiry Date (yyyy-mm-dd): ");
            ExpiryDate = Convert.ToDateTime(Console.ReadLine());

            Console.Write("Enter Quantity: ");
            Quantity = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter ISO Standard: ");
            IsoStandard = Console.ReadLine();

            Console.Write("Enter Product Price: ");
            ProductPrice = Convert.ToDouble(Console.ReadLine());
        }

        public void DisplayData()
        {
            Console.WriteLine("\n--- Product Details ---");
            Console.WriteLine($"Product ID: {ProductId}");
            Console.WriteLine($"Product Name: {ProductName}");
            Console.WriteLine($"Expiry Date: {ExpiryDate.ToShortDateString()}");
            Console.WriteLine($"Quantity: {Quantity}");
            Console.WriteLine($"ISO Standard: {IsoStandard}");
            Console.WriteLine($"Product Price: {ProductPrice}");
        }
        public double CalculateTotalValue()
        {
            return Quantity * ProductPrice;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Product product = new Product();

            product.GetData();
            product.DisplayData();

            Console.WriteLine($"Total Stock Value: {product.CalculateTotalValue()}");

            Console.ReadLine();
        }
    }
}
