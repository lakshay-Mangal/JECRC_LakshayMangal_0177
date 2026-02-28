//string methods and array list

using System.Collections;
namespace ArrayListDemo
{
    class UsingArrayList
    {
        static void Main(string[] args)
        {
            ArrayList listdata1 = new ArrayList();
            listdata1.Add(100);
            listdata1.Add(101);
            listdata1.Add(102);
            listdata1.Add(103);
            listdata1.Add(104);
            listdata1.Add("Dotnet");
            foreach (object i in listdata1)
            {
                Console.WriteLine(i);
            }

            ArrayList listdata2 = new ArrayList();
            listdata2.Add(200);
            listdata2.Add(201);
            listdata2.Add(202);
            listdata2.Add(203);
            listdata2.Add(204);
            listdata2.Add("Java");
            foreach (object i in listdata2)
            {
                Console.WriteLine(i);
            }
            listdata1.AddRange(listdata2);
            foreach (object i in listdata1)
            {
                Console.WriteLine(i);
            }
            string order = " Order#1001 | Laptop | Dell | 75000";

            Console.WriteLine(order);

            string trimOrder = order.Trim();
            Console.WriteLine(trimOrder);

            Console.WriteLine(order.Length);
            Console.WriteLine(trimOrder.Length);

            string[] parts = trimOrder.Split('|');
            Console.WriteLine("After Split");
            foreach (var item in parts)
            {
                Console.WriteLine(item.Trim());
            }
        }
    }
}