using System;

namespace StudentEligibilitySystem
{
    // 1. Entity Class
    public class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public int Marks { get; set; }
        public int Age { get; set; }
        public int Attendance { get; set; }
    }

    // 3. Eligibility Engine (Core Component)
    public class EligibilityEngine
    {
        public void CheckEligibility(Student student, string program, Predicate<Student> rule)
        {
            bool isEligible = rule(student);

            Console.WriteLine("========= ELIGIBILITY CHECK =========");
            Console.WriteLine($"Student Name : {student.Name}");
            Console.WriteLine($"Program      : {program}");
            Console.WriteLine($"Eligible     : {isEligible}");
            Console.WriteLine("-----------------------------------");
            Console.WriteLine();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 5. Hardcoded Dataset
            Student student = new Student
            {
                StudentId = 301,
                Name = "Ananya",
                Marks = 78,
                Age = 18,
                Attendance = 85
            };

            // 2. Predicate Definitions (Eligibility Rules)
            Predicate<Student> EngineeringEligibility = s => s.Marks >= 60;

            Predicate<Student> MedicalEligibility =
                s => s.Marks >= 70 && s.Age >= 17;

            Predicate<Student> ManagementEligibility =
                s => s.Marks >= 55 && s.Attendance >= 75;

            // 3. Create Eligibility Engine
            EligibilityEngine engine = new EligibilityEngine();

            // 4. Runtime Validation
            engine.CheckEligibility(student, "Engineering", EngineeringEligibility);
            engine.CheckEligibility(student, "Medical", MedicalEligibility);
            engine.CheckEligibility(student, "Management", ManagementEligibility);
        }
    }
}