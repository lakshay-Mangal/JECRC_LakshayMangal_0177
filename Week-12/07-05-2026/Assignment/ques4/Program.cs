using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] accessLog = { 1, 3, 2, 3, 3, 4, 5, 3, 6, 7, 8, 9, 10, 3 };

        int K = 2;

        Console.WriteLine("--- Access Pattern Analysis ---\n");

        // -------------------------------------------------
        // 1. Longest Consecutive Sequence
        // -------------------------------------------------

        HashSet<int> set = new HashSet<int>(accessLog);

        int longestLength = 0;
        int startNumber = 0;

        foreach (int num in set)
        {
            // Start only if previous number doesn't exist
            if (!set.Contains(num - 1))
            {
                int currentNum = num;
                int length = 1;

                while (set.Contains(currentNum + 1))
                {
                    currentNum++;
                    length++;
                }

                if (length > longestLength)
                {
                    longestLength = length;
                    startNumber = num;
                }
            }
        }

        Console.Write("Longest Consecutive Sequence: ");

        for (int i = 0; i < longestLength; i++)
        {
            Console.Write(startNumber + i);

            if (i != longestLength - 1)
                Console.Write(",");
        }

        Console.WriteLine($" (Length: {longestLength})\n");

        // -------------------------------------------------
        // 2. Most Frequent Element
        // -------------------------------------------------

        Dictionary<int, int> frequency = new Dictionary<int, int>();

        foreach (int num in accessLog)
        {
            if (frequency.ContainsKey(num))
                frequency[num]++;
            else
                frequency[num] = 1;
        }

        int mostFrequent = accessLog[0];
        int maxCount = 0;

        foreach (var item in frequency)
        {
            if (item.Value > maxCount)
            {
                maxCount = item.Value;
                mostFrequent = item.Key;
            }
        }

        Console.WriteLine(
            $"Most Frequent Element: {mostFrequent} " +
            $"(appears {maxCount} times)\n"
        );

        // -------------------------------------------------
        // 3. First Non-Repeating Element
        // -------------------------------------------------

        int firstNonRepeating = -1;

        foreach (int num in accessLog)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        Console.WriteLine(
            $"First Non-Repeating Element: {firstNonRepeating}\n"
        );

        // -------------------------------------------------
        // 4. Pairs with Difference K
        // -------------------------------------------------

        Console.WriteLine($"Pairs with Difference {K}:");

        HashSet<string> printed = new HashSet<string>();

        foreach (int num in set)
        {
            if (set.Contains(num + K))
            {
                string pair = $"({num}, {num + K})";

                if (!printed.Contains(pair))
                {
                    Console.WriteLine(pair);
                    printed.Add(pair);
                }
            }
        }

        Console.WriteLine();

        // -------------------------------------------------
        // 5. Majority Element
        // -------------------------------------------------

        int n = accessLog.Length;

        int majorityElement = mostFrequent;
        double percentage =
            ((double)maxCount / n) * 100;

        if (maxCount > n / 2)
        {
            Console.WriteLine(
                $"Majority Element: {majorityElement} " +
                $"(appears {maxCount} out of {n} times)"
            );
        }
        else
        {
            Console.WriteLine(
                $"Majority Element: {majorityElement} " +
                $"(appears {maxCount} out of {n} times - " +
                $"{percentage:F1}% - No majority)"
            );
        }
    }
}