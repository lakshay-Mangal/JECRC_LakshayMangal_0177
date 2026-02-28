using System;
namespace InheritanceDemo
{
    public class Person
    {
        private string name;
        private int age;
        public void GetInfo()
        {
            Console.WriteLine("Enter your name : ");
            name = Console.ReadLine();
            Console.WriteLine("Enter your age : ");
            age = int.Parse(Console.ReadLine());
        }
        public void DisplayInfo()
        {
            Console.WriteLine("Welcome to .Net Training Mr/Ms {0} and your age is {1}", name, age);
        }
    }

    public class Employee : Person
    {
        private string CompanyName;
        private int EmployeeID;
        protected int EmployeeScore;
        public int GetEmployeeInfo()
        {
            Console.WriteLine("Enter your Company name : ");
            CompanyName = Console.ReadLine();
            Console.WriteLine("Enter your ID : ");
            EmployeeID = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter your Score : ");
            EmployeeScore = int.Parse(Console.ReadLine());
            return EmployeeScore;
        }
        public void DisplayEmployeeInfo()
        {
            Console.WriteLine("Welcome to {0}, your id is {1} and your score is {2}", CompanyName, EmployeeID, EmployeeScore);
        }
    }

    interface IDepartment
    {
        string DepartmentName { get; set; }
        void DisplayDepartmentInfo();

    }

    public class GradeLevel : Employee, IDepartment
    {
        public string DepartmentName { get; set; }

        public void CheckEligible()
        {
            Console.WriteLine("Every employee should have 150 score");
            if (this.EmployeeScore > 150)
            {
                Console.WriteLine("You are Eligible!");
            }
            else
            {
                Console.WriteLine("You are not Eligible!");
            }
        }

        public void DisplayDepartmentInfo()
        {
            Console.WriteLine("Department Name : {0}", DepartmentName);
        }
    }

    public class TestProgram
    {
        static void Main(string[] args)
        {
            GradeLevel Cap = new GradeLevel();
            Cap.GetInfo();
            Cap.DisplayInfo();
            Cap.GetEmployeeInfo();
            Cap.DisplayEmployeeInfo();
            Cap.DepartmentName = "IT";
            Cap.CheckEligible();
            Cap.DisplayDepartmentInfo();
        }
    }
}