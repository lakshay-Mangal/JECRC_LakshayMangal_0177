using AbstactDemo;
using InterfaceDemo;
using System;

namespace AbstactDemo
{
    public abstract class CalcArea
    {
        public abstract void Area(double radius) ;// if abstract need to implement or else throw error
        //public abstract void EmptyFunction(){ //must add declaration here and it runs}; //for abstract class does not requires the one method to be abstract same in java but in cpp abstract class is declared to be abstract if there is at least one abstract method and that makes actully it abstract as there is no keywords used in before the class to make it abstract  
        public void EmptyFunction()  //defined in abstract class but is not a abstract method //normal function in a abstract class does not throw error and can be used in derieved classes
        {
            Console.WriteLine("I am Non-Abstract Method");
        }
    }

    interface IVolume
    {
        void CalcVolume(int radius);
    }

    public class CalcCube : CalcArea, IVolume
    {
        //public void Area(double radius) {  //throws an error cause need to override the abstract methodd here using abstract keyword
        public override void Area(double radius)
        {
            //throw new NotImplementedException();
            double pie = 3.14;
            double result;
            result = pie * radius * radius;
            Console.WriteLine(result);
        }

        public void CalcVolume(int side)
        {
            //throw new NotImplementedException();
            int result;
            result = side * side * side;
            Console.WriteLine(result);
        }

        public void CSA()
        { }
    }
}

class TestApp
{
    public static void Main(string[] args)
    {
        CalcCube obj = new CalcCube();
        double radius;
        int side;

        Console.WriteLine("Enter the value of Radius: ");
        radius = Convert.ToDouble(Console.ReadLine());
        obj.Area(radius);
        Console.WriteLine("Enter the value of Side: ");
        side = Convert.ToInt32(Console.ReadLine());
        obj.CalcVolume(side);
        Console.WriteLine();


    }
}
