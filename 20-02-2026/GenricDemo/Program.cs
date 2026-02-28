using System;

namespace GenricDemo
{
    class UsingGenrics<T>
    {
        T obj;  //declare an object of type T
        public UsingGenrics(T obj1)
        {  //paramertized constructor
            this.obj = obj1;
        }
        public T Get()
        {
            return obj;
        }
        public void ShowType( )
        {
            Console.WriteLine("Type of T is :" + typeof(T));
            //Console.WriteLine("Type of obj is :" + typeof(obj)); //error cause we need genrics collection t type
        }
        public void ShowType(T obj)
        {
            Console.WriteLine("Type of T is :" + typeof(T));
            //Console.WriteLine("Type of obj is :" + typeof(obj)); //error cause we need genrics collection t type
        }
    }

    class TestGenerics
    {
        public static void Main(string[] args)
        {
            UsingGenrics<int> objdata;
            objdata = new UsingGenrics<int>(500);
            objdata.ShowType();

            UsingGenrics<String> objdatastr;
            objdatastr = new UsingGenrics<string>("Kushagra");
            objdatastr.ShowType();
            objdatastr.ShowType("See ya");

        }
    }
}