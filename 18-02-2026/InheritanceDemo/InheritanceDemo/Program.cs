using System;
using static InheritanceDemo.Employee;

namespace InheritanceDemo
{
    public class Person
    {
        private String name;
        private int age;

        public void GetInformation()
        {
            Console.WriteLine("Enter your name:");
            name = Console.ReadLine();
            Console.WriteLine("Enter your age:");
            age = int.Parse(Console.ReadLine());
        }
        public void DisplayInformation()
        {
            Console.WriteLine("Welcome to .Net Training Mr./Mrs. {0}, and your age is {1} ", name, age);
        }
    }

    public class Employee : Person
    {
        private string Companyname;
        private int EmployeeID;
        private int EmployeeScore;

        public int GetEmployeeInformation()
        {
            Console.WriteLine("Enter Your Company Name");
            Companyname = Console.ReadLine();
            Console.WriteLine("Enter your ID:");
            EmployeeID = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter Score:");
            EmployeeScore = int.Parse(Console.ReadLine());

            return EmployeeScore;
        }

        public int getEmployeeScore()
        {
            return EmployeeScore;
        }

        public void DisplayEmployeeInformation()
        {
            Console.WriteLine("Welocome to the company {0}, " + "and your id {1} and your score is {2} ", Companyname, EmployeeID, EmployeeScore);
        }

        public class EmployeeGradeLevel:Employee
        {
            public void CheckEligibility()
            {
                Console.WriteLine("Every Person/Employee should have above 150");
                //if (this.GetEmployeeInformation() > 150)
                if (this.getEmployeeScore() > 150)
                    {
                        Console.WriteLine("You are Eligible");
                }
                else
                {
                    Console.WriteLine("You are not Eligible");
                }
            }
        }

    }
    public class TestProgram
    {
    static void Main(string[] args)
        {
            EmployeeGradeLevel Capegemini = new EmployeeGradeLevel();
            Capegemini.GetInformation();
            Capegemini.DisplayInformation();
            Capegemini.GetEmployeeInformation();
            Capegemini.DisplayEmployeeInformation();
            Capegemini.CheckEligibility();
        }
    }
}