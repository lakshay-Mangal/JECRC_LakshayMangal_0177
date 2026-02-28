// See https://aka.ms/new-console-template for more information

using System;

class Program
{
    static void Main()
    {
        Console.Write("Enter a number: ");
        int number = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter the desired width: ");
        int width = Convert.ToInt32(Console.ReadLine());

        // Upper part of triangle
        for (int i = 1; i <= width; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.Write(number);
            }
            Console.WriteLine();
        }

        // Lower part of triangle
        for (int i = width - 1; i >= 1; i--)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.Write(number);
            }
            Console.WriteLine();
        }
    }
}