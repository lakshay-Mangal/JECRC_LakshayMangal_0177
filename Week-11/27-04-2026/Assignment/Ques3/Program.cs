using System;
using System.Collections.Generic;

class Program
{
    static int MinLights(int[] locations, int n)
    {
        // Step 1: Build intervals
        List<(int start, int end)> ranges = new List<(int, int)>();

        for (int i = 0; i < n; i++)
        {
            int pos = i + 1; // 1-based position
            int left = Math.Max(1, pos - locations[i]);
            int right = Math.Min(n, pos + locations[i]);

            ranges.Add((left, right));
        }

        // Step 2: Sort by start
        ranges.Sort((a, b) =>
        {
            if (a.start == b.start)
                return b.end.CompareTo(a.end); // larger end first
            return a.start.CompareTo(b.start);
        });

        int count = 0;
        int iIndex = 0;
        int coveredTill = 0;
        int maxReach = 0;

        // Step 3: Greedy selection
        while (coveredTill < n)
        {
            while (iIndex < n && ranges[iIndex].start <= coveredTill + 1)
            {
                maxReach = Math.Max(maxReach, ranges[iIndex].end);
                iIndex++;
            }

            // If we cannot extend coverage
            if (maxReach <= coveredTill)
                return -1;

            count++;
            coveredTill = maxReach;
        }

        return count;
    }

    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int[] locations = new int[n];

        for (int i = 0; i < n; i++)
        {
            locations[i] = int.Parse(Console.ReadLine());
        }

        Console.WriteLine(MinLights(locations, n));
    }
}
