using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    // -------------------------------------------------
    // Bubble Sort
    // -------------------------------------------------

    static void BubbleSort(int[] arr)
    {
        int n = arr.Length;

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // -------------------------------------------------
    // Binary Search
    // -------------------------------------------------

    static int BinarySearch(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
                return mid;

            if (arr[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return -1;
    }

    // -------------------------------------------------
    // Longest Increasing Subsequence
    // -------------------------------------------------

    static List<int> FindLIS(int[] arr)
    {
        int n = arr.Length;

        int[] dp = new int[n];
        int[] prev = new int[n];

        for (int i = 0; i < n; i++)
        {
            dp[i] = 1;
            prev[i] = -1;
        }

        int maxLength = 1;
        int lastIndex = 0;

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (arr[j] < arr[i] &&
                    dp[j] + 1 > dp[i])
                {
                    dp[i] = dp[j] + 1;
                    prev[i] = j;
                }
            }

            if (dp[i] > maxLength)
            {
                maxLength = dp[i];
                lastIndex = i;
            }
        }

        List<int> lis = new List<int>();

        while (lastIndex != -1)
        {
            lis.Add(arr[lastIndex]);
            lastIndex = prev[lastIndex];
        }

        lis.Reverse();

        return lis;
    }

    static void Main()
    {
        int[] prices =
        {
            299, 499, 199, 399,
            599, 159, 699, 259
        };

        int targetSum = 698;

        Console.WriteLine(
            "--- Product Price Analysis ---\n"
        );

        Console.WriteLine(
            "Original Prices: " +
            string.Join(", ", prices)
        );

        // -------------------------------------------------
        // Sorting
        // -------------------------------------------------

        int[] sortedPrices = (int[])prices.Clone();

        BubbleSort(sortedPrices);

        Console.WriteLine(
            "\nSorted Prices (Ascending): " +
            string.Join(", ", sortedPrices)
        );

        // -------------------------------------------------
        // Binary Search
        // -------------------------------------------------

        Console.WriteLine(
            "\nBinary Search Results:\n"
        );

        int index399 = BinarySearch(sortedPrices, 399);

        if (index399 != -1)
        {
            Console.WriteLine(
                $"Price 399 found at index {index399}"
            );
        }
        else
        {
            Console.WriteLine("Price 399 not found");
        }

        int index500 = BinarySearch(sortedPrices, 500);

        if (index500 != -1)
        {
            Console.WriteLine(
                $"Price 500 found at index {index500}"
            );
        }
        else
        {
            Console.WriteLine("Price 500 not found");
        }

        // -------------------------------------------------
        // Pairs with Target Sum
        // -------------------------------------------------

        Console.WriteLine(
            $"\nPairs that sum to {targetSum}:\n"
        );

        HashSet<string> printedPairs =
            new HashSet<string>();

        for (int i = 0; i < sortedPrices.Length; i++)
        {
            for (int j = i + 1;
                 j < sortedPrices.Length;
                 j++)
            {
                if (sortedPrices[i] +
                    sortedPrices[j] == targetSum)
                {
                    string pair =
                        $"({sortedPrices[i]}, " +
                        $"{sortedPrices[j]})";

                    if (!printedPairs.Contains(pair))
                    {
                        Console.WriteLine(pair);
                        printedPairs.Add(pair);
                    }
                }
            }
        }

        // -------------------------------------------------
        // Longest Increasing Subsequence
        // -------------------------------------------------

        List<int> lis = FindLIS(sortedPrices);

        Console.WriteLine(
            "\nLongest Increasing Subsequence:\n"
        );

        Console.WriteLine(
            string.Join(", ", lis) +
            $" (Length: {lis.Count})"
        );

        // -------------------------------------------------
        // Statistics
        // -------------------------------------------------

        int lowest = sortedPrices.Min();
        int highest = sortedPrices.Max();

        double average =
            sortedPrices.Average();

        double median;

        int n = sortedPrices.Length;

        if (n % 2 == 0)
        {
            median =
                (sortedPrices[n / 2 - 1] +
                 sortedPrices[n / 2]) / 2.0;
        }
        else
        {
            median = sortedPrices[n / 2];
        }

        Console.WriteLine("\nStatistics:\n");

        Console.WriteLine(
            $"Lowest Price: {lowest}"
        );

        Console.WriteLine(
            $"Highest Price: {highest}"
        );

        Console.WriteLine(
            $"Average Price: {average:F2}"
        );

        Console.WriteLine(
            $"Median Price: {median:F2}"
        );
    }
}