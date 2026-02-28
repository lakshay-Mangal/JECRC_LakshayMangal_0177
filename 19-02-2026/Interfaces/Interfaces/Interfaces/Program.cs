using System;

namespace InterfaceDemo
{
    interface IArea
    {
        void CalcArea(double radius);
    }

    interface IVolume
    {
        void CalcVolume(int radius);
    }

    interface CSA
    {
        void CalcCSA();
    }

    //public class CalcCube : IArea, IVolume, CSA
    public class CalcCube : IArea, IVolume
    {
        public void CalcArea(double radius)
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
            obj.CalcArea(radius);
            Console.WriteLine("Enter the value of Side: ");
            side = Convert.ToInt32(Console.ReadLine());
            obj.CalcVolume(side);
            Console.WriteLine();


        }
    }
}