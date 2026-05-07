using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        string text =
            "The quick brown fox jumps over the lazy dog. " +
            "The fox is quick and the dog is lazy. " +
            "Quick brown fox jumps over the lazy dog again.";

        int N = 3;

        // Convert to lowercase
        text = text.ToLower();

        // Remove punctuation
        text = Regex.Replace(text, @"[^\w\s]", "");

        // Split words
        string[] words = text.Split(
            new char[] { ' ' },
            StringSplitOptions.RemoveEmptyEntries
        );

        Dictionary<string, int> frequency =
            new Dictionary<string, int>();

        // Count frequencies
        foreach (string word in words)
        {
            if (frequency.ContainsKey(word))
                frequency[word]++;
            else
                frequency[word] = 1;
        }

        int totalWords = words.Length;
        int uniqueWords = frequency.Count;

        // Sort by frequency descending
        var sortedWords = frequency
            .OrderByDescending(x => x.Value)
            .ThenBy(x => x.Key)
            .ToList();

        Console.WriteLine("--- Word Frequency Analysis ---");

        Console.WriteLine($"\nTotal words: {totalWords}");
        Console.WriteLine($"\nUnique words: {uniqueWords}");

        Console.WriteLine($"\nTop {N} Frequent Words:");

        for (int i = 0; i < N && i < sortedWords.Count; i++)
        {
            Console.WriteLine(
                $"{sortedWords[i].Key}: {sortedWords[i].Value} times"
            );
        }

        Console.WriteLine("\nWords appearing exactly once:");

        var singleWords = frequency
            .Where(x => x.Value == 1)
            .Select(x => x.Key);

        Console.WriteLine(string.Join(", ", singleWords));

        double averageFrequency =
            (double)totalWords / uniqueWords;

        Console.WriteLine(
            $"\nAverage frequency: {averageFrequency:F2} times per unique word"
        );
    }
}