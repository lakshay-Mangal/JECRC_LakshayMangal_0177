using System;
using System.Runtime.CompilerServices;

class OLDExercise
{
  private int number;
  public int Number 
  { 
    get{
      return number;
    }
  }
  public OLDExercise()
  {
    Random r = new Random();
    number = r.Next();
  }
}

class Program
{
  static void Main (string[] args)
  {
    OLDExercise obj1 = new OLDExercise();
    Console.WriteLine("normal number = " + obj1.Number);
  }
}