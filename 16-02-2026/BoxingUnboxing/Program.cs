// // See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");
using System;
class Program
{
  static void Main(string[] args)
  {
    // Console.WriteLine("Hello world");
    int marks = 65;
    Console.WriteLine("Marks: "+ marks);
    object objmarks=marks; //boxing
    Console.WriteLine("Object Marks: "+ objmarks);
    int unboxmarks=(int)objmarks; //unboxing
    Console.WriteLine("Unboxed Marks: "+ unboxmarks);
    unboxmarks=unboxmarks+5;  //modifying unboxed marksvalue
    Console.WriteLine("Modified Unoxed Marks: " + unboxmarks);
  }
}