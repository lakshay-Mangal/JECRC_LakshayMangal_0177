using System;
using Microsoft.Data.SqlClient;

class Program
{
    // ⚠ Change server name if needed
    static string connectionString =
    "Server=LAPTOP-QG7FQ0GE\\SQLEXPRESS;Database=ProductDB;Trusted_Connection=True;TrustServerCertificate=True;";

    static void Main(string[] args)
    {
        while (true)
        {
            Console.WriteLine("\n====== PRODUCT MANAGEMENT SYSTEM ======");
            Console.WriteLine("1. View All Products");
            Console.WriteLine("2. Insert Product");
            Console.WriteLine("3. Update Product Price");
            Console.WriteLine("4. Delete Product");
            Console.WriteLine("5. Search Product by ID");
            Console.WriteLine("6. Search Product by Category");
            Console.WriteLine("7. Sort Products by Price");
            Console.WriteLine("8. Exit");

            Console.Write("Enter your choice: ");
            int choice = int.Parse(Console.ReadLine());

            switch (choice)
            {
                case 1: ViewProducts(); break;
                case 2: InsertProduct(); break;
                case 3: UpdateProduct(); break;
                case 4: DeleteProduct(); break;
                case 5: SearchById(); break;
                case 6: SearchByCategory(); break;
                case 7: SortProducts(); break;
                case 8: return;
                default: Console.WriteLine("Invalid Choice!"); break;
            }
        }
    }

    // 1️⃣ VIEW ALL PRODUCTS
    static void ViewProducts()
    {
        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "SELECT * FROM Products";
        SqlCommand cmd = new SqlCommand(query, con);
        SqlDataReader reader = cmd.ExecuteReader();

        Console.WriteLine("\n--- Product List ---");
        while (reader.Read())
        {
            Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | {reader["Category"]} | {reader["Price"]} | {reader["InStock"]}");
        }
    }

    // 2️⃣ INSERT PRODUCT
    static void InsertProduct()
    {
        Console.Write("Enter Name: ");
        string name = Console.ReadLine();

        Console.Write("Enter Category: ");
        string category = Console.ReadLine();

        Console.Write("Enter Price: ");
        double price = double.Parse(Console.ReadLine());

        Console.Write("Is Product In Stock? (true/false): ");
        bool inStock = bool.Parse(Console.ReadLine());

        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "INSERT INTO Products(Name,Category,Price,InStock) VALUES(@name,@cat,@price,@stock)";
        SqlCommand cmd = new SqlCommand(query, con);

        cmd.Parameters.AddWithValue("@name", name);
        cmd.Parameters.AddWithValue("@cat", category);
        cmd.Parameters.AddWithValue("@price", price);
        cmd.Parameters.AddWithValue("@stock", inStock);

        cmd.ExecuteNonQuery();

        Console.WriteLine("Product Inserted Successfully!");
    }

    // 3️⃣ UPDATE PRODUCT PRICE
    static void UpdateProduct()
    {
        Console.Write("Enter Product ID: ");
        int id = int.Parse(Console.ReadLine());

        Console.Write("Enter New Price: ");
        double price = double.Parse(Console.ReadLine());

        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "UPDATE Products SET Price=@price WHERE Id=@id";
        SqlCommand cmd = new SqlCommand(query, con);

        cmd.Parameters.AddWithValue("@price", price);
        cmd.Parameters.AddWithValue("@id", id);

        int rows = cmd.ExecuteNonQuery();

        if (rows > 0)
            Console.WriteLine("Product Updated Successfully!");
        else
            Console.WriteLine("Product Not Found!");
    }

    // 4️⃣ DELETE PRODUCT
    static void DeleteProduct()
    {
        Console.Write("Enter Product ID: ");
        int id = int.Parse(Console.ReadLine());

        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "DELETE FROM Products WHERE Id=@id";
        SqlCommand cmd = new SqlCommand(query, con);

        cmd.Parameters.AddWithValue("@id", id);

        int rows = cmd.ExecuteNonQuery();

        if (rows > 0)
            Console.WriteLine("Product Deleted Successfully!");
        else
            Console.WriteLine("Product Not Found!");
    }

    // 5️⃣ SEARCH BY ID
    static void SearchById()
    {
        Console.Write("Enter Product ID: ");
        int id = int.Parse(Console.ReadLine());

        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "SELECT * FROM Products WHERE Id=@id";
        SqlCommand cmd = new SqlCommand(query, con);
        cmd.Parameters.AddWithValue("@id", id);

        SqlDataReader reader = cmd.ExecuteReader();

        if (reader.Read())
        {
            Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | {reader["Category"]} | {reader["Price"]} | {reader["InStock"]}");
        }
        else
        {
            Console.WriteLine("Product Not Found!");
        }
    }

    // 6️⃣ SEARCH BY CATEGORY
    static void SearchByCategory()
    {
        Console.Write("Enter Category: ");
        string category = Console.ReadLine();

        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "SELECT * FROM Products WHERE Category=@cat";
        SqlCommand cmd = new SqlCommand(query, con);
        cmd.Parameters.AddWithValue("@cat", category);

        SqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | {reader["Price"]}");
        }
    }

    // 7️⃣ SORT PRODUCTS
    static void SortProducts()
    {
        using SqlConnection con = new SqlConnection(connectionString);
        con.Open();

        string query = "SELECT * FROM Products ORDER BY Price ASC";
        SqlCommand cmd = new SqlCommand(query, con);
        SqlDataReader reader = cmd.ExecuteReader();

        Console.WriteLine("\n--- Sorted Products (By Price) ---");
        while (reader.Read())
        {
            Console.WriteLine($"{reader["Name"]} | {reader["Price"]}");
        }
    }
}