using CustomExceptionExampleCode;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CustomExceptionExampleCode
{
    class MyException: Exception
    {
        public MyException(String Message) : base (Message) { }
        public MyException() { }

        public MyException(string Message, Exception inner ) : base(Message, inner) { }
    }
}


class Program
{
    static void Main(string[] args)
    {
        int a = 50;
        int b = 10;
        int k = a / b;
        try
        {
            if (k < 10)
            {
                throw new MyException("Value of k is less than 10");
            }

        }catch(MyException e)
        {
            Console.WriteLine("Caught my exception");
            Console.WriteLine(e.Message);
        }
    Console.ReadLine();
    }

}