using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ConsoleEmployeemanagementSystem
{
    internal class EmployeeService
    {
        private readonly string connectionstring = "Data Source=LAPTOP-QG7FQ0GE\\SQLEXPRESS;Initial Catalog=EmployeeDB;Integrated Security=True";
        EmplyeeModel emp = new EmplyeeModel();
        public void Run()
        {
            while (true) {
                Console.Clear();
                Console.WriteLine("===Employee Management System===");
                Console.WriteLine("1. View All Employees");
                Console.WriteLine("2. Insert Employee");
                Console.WriteLine("3. Update Employee");
                Console.WriteLine("4. Delete Employee");
                Console.WriteLine("5. Search by Employee ID");
                Console.WriteLine("6. Search by Department Name");
                Console.WriteLine("7. Exit ");
                Console.WriteLine("Enter the Choice:");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice) {
                    case 1:
                        ViewEmployees();
                        break;
                    case 2:
                        InsertEmployee();
                        break;
                    case 3:
                        UpdateEmployee();
                        break;
                    case 4:
                        DeleteEmployee();
                        break;
                    case 5:
                        SearchByID();
                        break;
                    case 6:
                        break;
                    case 7:
                        return;
                    default:
                        Console.WriteLine("Invalid Choice !!!");
                        break;
                }
                Console.WriteLine("/nPress Enter to Continue...");
                Console.ReadLine();
            }
        }
        public void ViewEmployees()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();
            string query = "SELECT Id,Name, Department,Salary FROM Employees";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine ("\n----------Employee List ----------");
            while(reader.Read())
            {
                Console.WriteLine ($"{reader.GetInt32(0)} " +
                    $"| {reader.GetString(1)} " +
                    $"| {reader.GetString(2)} " +
                    $"| {reader.GetDouble(3)}");

            }
        }

        public void InsertEmployee()
        {
          
            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();
            Console.WriteLine("Enter Employee Department");
            emp.Department = Console.ReadLine();
            Console.WriteLine("Enter Employee Salary");
            emp.Salary =Convert.ToInt32( Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();
            string query = "INSERT INTO Employees" +
                "(Name,Department,Salary)VALUES(@Name,@Department,@Salary)";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            cmd.ExecuteNonQuery();
            Console.WriteLine("Inserted Successfully");
        }

        public void DeleteEmployee() {
            Console.WriteLine("Enter Employee ID");
            emp.Id =Convert.ToInt32( Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();
            string query = "DELET FROM Employees WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue ("@Id", emp.Id);
            int rows=cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Deleted Successfully" :
                "Employee Not Found");
        }

        public void UpdateEmployee()
        {
            Console.WriteLine("Enter the Employee ID");
            emp.Id=Convert.ToInt32( Console.ReadLine());
            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();
            Console.WriteLine("Enter Employee Department");
            emp.Department = Console.ReadLine();
            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(
                connectionstring);
            conn.Open();
            string query = "UPDATE Employees " +
                "SET Name=@Name,Department=@Department,Salary=@Salary " +
                "WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand( query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Updated Successfully" :
                "Employee Not Found");

        }
        public void SearchByID()
        {
            Console.WriteLine("Enter Employee ID");
            emp.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(
               connectionstring);
            conn.Open();
            string query = "SELECT Id,Name,Department, Salary FROM" +
                "Employees WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                emp.Id = reader.GetInt32(0);
                emp.Name = reader.GetString(1);
                emp.Department = reader.GetString(2);
                emp.Salary = reader.GetInt32(3);
                Console.WriteLine($"{emp.Id} | {emp.Name} | {emp.Department} | {emp.Salary}");
            }
            else
            {
                Console.WriteLine("Employee Not Found !!!");
            }
       }

    }
}