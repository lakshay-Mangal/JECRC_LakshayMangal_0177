// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

using System;
class Program
{
  public static void Main(string[] args)
  {
    // Console.WriteLine("Hello world");
    int[] intArray = new int[5] {20,5,30,10,0};

    // foreach(int i in intArray)
    // {
    // Console.WriteLine("Array elements are : "+ i);
    // }

    // for (int i = 0; i < intArray.Length; i++)
    // {
    // Console.WriteLine(intArray[i]);
    // }
    intArray.Sort();

    foreach(int i in intArray)
    {
      Console.Write(i);
    }

  }
}
