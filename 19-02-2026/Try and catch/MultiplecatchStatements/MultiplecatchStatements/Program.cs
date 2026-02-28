using System;
using System.Globalization;
class ExcDemo4
{
    public static void Main(string[] args)
    {
        int[] numer = { 4, 0, 16, 32, 64, 128, 256, 512 };
        int[] denom = { 2, 0, 4, 4, 0, 8 };

        for (int i = 0; i < numer.Length; i++)
        {
            try
            {
                Console.WriteLine(numer[i] + " / " + denom[i] + " is " + numer[i] / denom[i]);
                throw new DivideByZeroException();
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Can't Divide by Zero! ");
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("No matching element found");
            }
            catch
            {
                Console.WriteLine("Some exception Occured");
            }
            finally
            {
                Console.WriteLine("Final block");
            }

        }
    }
} //nesting of try catch block