using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;

namespace ProductDemo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }
    }

    public class ProductCatalog
    {
        private List<Product> products;

        public ProductCatalog()
        {
        //    products = new List<Product>() {
        //    new Product { Id = 100, Name = "Laptop", Description = "Electronics", Price = 75000, IsStock = true },
        //    new Product { Id = 100, Name = "SmartPhone", Description = "Electronics", Price = 55000, IsStock = true },
        //    new Product { Id = 100, Name = "Desk", Description = "Furniture", Price = 1500, IsStock = false },
        //    new Product { Id = 100, Name = "NoteBook", Description = "Stationary", Price = 750, IsStock = true }
        //};

            //products = new List<Product>();  //other way around
            //products.Add(new Product { Id = 100, Name = "Laptop", Description = "Electronics", Price = 75000, IsStock = true });
            //products.Add(new Product { Id = 100, Name = "SmartPhone", Description = "Electronics", Price = 55000, IsStock = true });
            //products.Add(new Product { Id = 100, Name = "Desk", Description = "Furniture", Price = 1500, IsStock = true });
            //products.Add(new Product { Id = 100, Name = "NoteBook", Description = "Stationary", Price = 750, IsStock = true });
        
            products = new List<Product>();  //in memory collection for the storing of the data
        }

        //create a constructor for in memory collection
        public void AddProducts() { 
            Product product = new Product();
            Console.WriteLine("Enter the Product ID : ");
            product.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter the Product Name : ");
            product.Name = Console.ReadLine();
            Console.WriteLine("Enter the Product Description : ");
            product.Description = Console.ReadLine();
            Console.WriteLine("Enter the Product Price : ");
            product.Price = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter the Product IsStock : ");
            product.IsStock = Convert.ToBoolean(Console.ReadLine());

            products.Add(product);
        }

        public void DisplayProducts()
        {
            foreach (var product in products)
            {
                Console.WriteLine("NAME : " + product.Name);
                Console.WriteLine("DESCRIPTION : " + product.Description);
                Console.WriteLine("PRICE : " + product.Price);
                Console.WriteLine("-----------------x-----------x---------------");

            }
        }

        public bool DeleteProduct(int id)
        {
            var productid = products.FirstOrDefault(p => p.Id == id);
            if(productid == null)
            {
                return false;
            }
            products.Remove(productid);
            return true;
        }
    }

    class TestProduct
    {
        static void Main(String[] args)
        {
            ProductCatalog catalog= new ProductCatalog();
            int choice;
            int IDD;
            do
            {
                Console.WriteLine("\n 1. Add Product");
                Console.WriteLine("\n 2. Display Product");
                Console.WriteLine("\n 3. Delete Product");
                Console.WriteLine("\n 4. Exit");
                Console.WriteLine();
                Console.WriteLine("\n Enter Your Choice: ");
                choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    //case 0:
                    //    Console.WriteLine("Invalid 0");  //cant create as 0 case
                    case 1:
                        catalog.AddProducts();
                        break;
                    case 2:
                        catalog.DisplayProducts();
                        break;
                    case 3:
                        IDD = Convert.ToInt32(Console.ReadLine());
                        bool yes=catalog.DeleteProduct(IDD);
                        if (yes)
                        {
                            Console.Write("Deleted ID ");
                            Console.WriteLine();
                        }
                        break;

                    case 4:
                        Console.WriteLine("Exiting..........");
                        break;

                    default:
                        Console.WriteLine("Invalid choice");
                        break;
                }
            }
            while (choice != 4);


            //OLD WAY
            //catalog.AddProducts();
            //catalog.DisplayProducts();
        }
    }
    }