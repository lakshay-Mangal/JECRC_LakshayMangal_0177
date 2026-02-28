// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;

/*class SampleDoWhileLoops
{
  public static void Main()
  {
    int a = 5;
    do
    {
      Console.WriteLine(a);
    }
    while (a<3);
  }
}
*/

//for loops

// Exercise-1
//write a c# sharp program that takees three letters as input and display them in reverse order.
// test case o d l
//output l d o


class Program
{
    public static void Main()
    {
        Console.Write("Enter first letter: ");
        char a = Convert.ToChar(Console.ReadLine());

        Console.Write("Enter second letter: ");
        char b = Convert.ToChar(Console.ReadLine());

        Console.Write("Enter third letter: ");
        char c = Convert.ToChar(Console.ReadLine());

        Console.WriteLine("Reverse order: " + c + b + a);
    }
}