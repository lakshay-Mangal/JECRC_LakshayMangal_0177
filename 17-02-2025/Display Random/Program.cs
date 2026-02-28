using System;
using System.Runtime.CompilerServices;

class OLDExercise
{
  private static int number;
  public static int Number 
  { 
    get{
      return number;
    }
  }
  static OLDExercise()
  {
    Random r = new Random();
    number = r.Next();
  }
}

class Program
{
  static void Main (string[] args)
  {
    Console.WriteLine("Static number = " + OLDExercise.Number);
  }
}