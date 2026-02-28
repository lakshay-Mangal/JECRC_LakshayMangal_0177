using System;
namespace ConsoleApp
{
  class Employee
  {
    public string Name { get; set; }
    public int Id { get; set; }
  
  public string Department { get; set; }
  public double Salary { get; set; }
  public string Position { get; set; }
  public DateTime DateOfJoining { get; set; }
    public void GetEmpoyeeDetails()
    {
      Console.WriteLine("Enter Employee Name:");
      Name = Console.ReadLine();
      
      Console.WriteLine("Enter Employee Id:");
      Id = Convert.ToInt32(Console.ReadLine());

      Console.WriteLine("Enter Employee Department:" );
      Department = Console.ReadLine();
            
      Console.WriteLine("Employee Position:" );
      Position = Console.ReadLine();
            
      Console.WriteLine("Employee Salary:" );
      Salary = Convert.ToDouble(Console.ReadLine());
            
      Console.WriteLine("Employee Date of Joining (dd-MM-yyyy):" );
      DateOfJoining = DateTime.Parse(Console.ReadLine());
    }

    public void DisplayEmployeeData()
    {
      Console.WriteLine($"Employee Name: {Name}");
      Console.WriteLine($"Employee Id: {Id}");
      Console.WriteLine($"Employee Department: {Department}");
      Console.WriteLine($"Employee Position: {Position}");
      Console.WriteLine($"Employee Salary: {Salary}");
      Console.WriteLine($"Employee Date of Joining: {DateOfJoining}");
    }
  }
  class Program
  {
    static void Main(string[] args)
    {
      Employee emp = new Employee();
      emp.GetEmpoyeeDetails();
      emp.DisplayEmployeeData();
    }
  }
}