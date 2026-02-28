using System.Collections;

namespace ArrayListDemo
{
    class UsingArrayList
    {
        static void Main(String[] args)
        {
            ArrayList listdata = new ArrayList();
            listdata.Add(100);
            listdata.Add(102);
            listdata.Add(104);
            listdata.Add(106);
            listdata.Add("Dotnet");

            foreach (object i in listdata)
            {
                Console.WriteLine(i);
            }

            ArrayList listdata2 = new ArrayList();
            listdata2.Add(200);
            listdata2.Add(202);
            listdata2.Add(203);
            listdata2.Add(204);
            listdata2.Add("java");

            Console.WriteLine();

            foreach (object i in listdata2)
            {
                Console.WriteLine(i);
            }

            listdata.AddRange(listdata2);
            Console.WriteLine();


            foreach (object i in listdata)
            {
                Console.WriteLine(i);
            }
            Console.WriteLine();


            String order = "   Order#1001 | Laptop | Dell | 75000   ";
            
            Console.WriteLine(order);
            String trimOrder = order.Trim();
            Console.WriteLine(trimOrder);

            Console.WriteLine(order.Length);
            Console.WriteLine(trimOrder.Length);

            string[] parts = trimOrder.Split('|');
            Console.WriteLine();

            Console.WriteLine("After Split :");
            foreach (var item in parts)
            {
                Console.WriteLine(item.Trim());
            }
        }
    }
}