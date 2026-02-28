using System;

namespace DelegateDemo
{
    public delegate void ArithmaticOperation(int x, int y); //can be outside the class cause its by default public
    class UsingDelegates
    {
        //public delegate void ArithmaticOperation(int x, int y);

        static void Add(int x, int y)
        {
            Console.WriteLine(x + y);
        }

        static void Sub(int x, int y)
        {
            Console.WriteLine(x - y);
        }

        static void Multi(int x, int y)
        {
            Console.WriteLine(x * y);
        }

        static void Div(int x, int y)
        {
            Console.WriteLine(x / y);
        }

        static void Main(String[] args)
        {
            /*
            ArithmaticOperation obj = new ArithmaticOperation(Add);  //create new instance each time for another operation as this is a single cast delegate
            obj(45, 55);
            ArithmaticOperation obj1 = new ArithmaticOperation(Sub);
            obj1(45, 55);
            */

            ArithmaticOperation obj = new ArithmaticOperation(Add);
            obj += new ArithmaticOperation(Sub);
            obj += new ArithmaticOperation(Multi);
            obj += new ArithmaticOperation(Div);
            //obj += new ArithmaticOperation(Multi);  //want repeat exeecution then use delegates
            //obj -= new ArithmaticOperation(Multi);  //using - minus skips the multiplication operation 


            obj(55, 5);
            Console.ReadLine();
        }
    }
}