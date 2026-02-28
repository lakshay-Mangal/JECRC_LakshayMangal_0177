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

  public OLDExercise(int seed)
  {
    Random r = new Random(seed);
    number = r.Next();
  }
}

class Program
{
  static void Main (string[] args)
  {
    OLDExercise obj1 = new OLDExercise();
    Console.WriteLine("Normal constructor number = " + obj1.Number);
    OLDExercise obj2 = new OLDExercise(100);
    Console.WriteLine("Parametrized constructor called = " + obj2.Number);
  }
}