using System;
using System.Globalization;
class ExcDemo1
{
    public static void Main(string[] args)
    {
        int[] nums = new int[4];
        try
        {
            Console.WriteLine("Before exception is generated");

            for (int i = 0; i < 10; i++)
            {
                nums[i] = i;
                Console.WriteLine("nums[{0}] : ({1})", i, nums[i]);
            }

            Console.WriteLine("This won't be Displayed");
        }
        catch (IndexOutOfRangeException)
        {
            Console.WriteLine("Index out-of-bounds!");
        }

        Console.WriteLine("After catch Statement");
    }
}