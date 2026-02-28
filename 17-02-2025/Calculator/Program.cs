/*
using System;

class ODLExercise
{
    public void Add()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int sum = a + b;
        Console.WriteLine("Sum = " + sum);
    }

    public void Subtract()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int result = a - b;
        Console.WriteLine("Difference = " + result);
    }

    public void Multiply()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int result = a * b;
        Console.WriteLine("Product = " + result);
    }

    public void Divide()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        if (b != 0)
        {
            double result = (double)a / b;
            Console.WriteLine("Division = " + result);
        }
        else
        {
            Console.WriteLine("Cannot divide by zero!");
        }
    }
}

class Demo
{
    static void Main()
    {
        ODLExercise obj1 = new ODLExercise();

        obj1.Add();
        obj1.Subtract();
        obj1.Multiply();
        obj1.Divide();
    }
}

*/

using System;

class ODLExcercise
{
    public static void Addition(int a, int b)
    {
        Console.WriteLine("The sum of {0} and {1} is: {2}", a, b, a + b);
    }

    public static void Subtraction(int a, int b)
    {
        Console.WriteLine("The difference of {0} and {1} is: {2}", a, b, a - b);
    }

    public static void Multiplication(int a, int b)
    {
        Console.WriteLine("The product of {0} and {1} is: {2}", a, b, a * b);
    }

    public static void Division(int a, int b)
    {
        if (b == 0)
        {
            Console.WriteLine("Error: Division by zero is not allowed.");
        }
        else
        {
            Console.WriteLine("The quotient of {0} and {1} is: {2}", a, b, a / b);
        }
    }


    public static void Main(string[] args)
    {
        Console.Write("Enter the number 1: ");
        int num1 = int.Parse(Console.ReadLine());
        Console.Write("Enter the number 2: ");
        int num2 = int.Parse(Console.ReadLine());
        Console.WriteLine("Performing operations on {0} and {1}:", num1, num2);

        Addition(num1, num2);
        Subtraction(num1, num2);
        Multiplication(num1, num2);
        Division(num1, num2);
    }
}