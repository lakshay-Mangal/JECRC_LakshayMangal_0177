using System;

namespace PolymorphismMethod
{
    class Car
    {
        public string Name;
        public int NumberOfDoors;

        public Car()
        {
            Name = "No Name";
            NumberOfDoors = 6;
        }

        public Car(string name, int numberOfDoors)
        {
            Name = name;
            NumberOfDoors = numberOfDoors;
        }

        public Car(string name)
        {
            Name = name;
            NumberOfDoors = 0;
        }

        public Car(int numberOfDoors)
        {
            Name = "";
            NumberOfDoors = numberOfDoors;
        }

        class Sample
        {
            static void Main(string[] args)
            {
                Car c1 = new Car();
                Car c2 = new Car(2);
                Car c3 = new Car("BMW");
                Car c4 = new Car("porsche", 4);
                Console.WriteLine(c1.Name);
                Console.WriteLine(c1.NumberOfDoors);
                Console.WriteLine(c2.Name);
                Console.WriteLine(c2.NumberOfDoors);
                Console.WriteLine(c3.Name);
                Console.WriteLine(c3.NumberOfDoors);
                Console.WriteLine(c4.Name);
                Console.WriteLine(c4.NumberOfDoors);
            }
        }
    }
}