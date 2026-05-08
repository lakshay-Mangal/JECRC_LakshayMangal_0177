using System;
using System.Collections.Generic;
using System.Linq;

class Query
{
    public List<int> dataSource;
    public bool isExecuted = false;

    public virtual IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public virtual List<int> Execute()
    {
        isExecuted = true;
        return Apply().ToList();
    }

    public virtual string GetQueryType()
    {
        return "Base Query";
    }
}

class FilterQuery : Query
{
    public string predicate;
    public int filteredCount;

    public override IEnumerable<int> Apply()
    {
        IEnumerable<int> query = dataSource;

        if (predicate.StartsWith(">"))
        {
            int value = int.Parse(predicate.Substring(1));
            query = dataSource.Where(x => x > value);
        }
        else if (predicate.StartsWith("<"))
        {
            int value = int.Parse(predicate.Substring(1));
            query = dataSource.Where(x => x < value);
        }
        else if (predicate.ToLower() == "even")
        {
            query = dataSource.Where(x => x % 2 == 0);
        }
        else if (predicate.ToLower() == "odd")
        {
            query = dataSource.Where(x => x % 2 != 0);
        }

        return query;
    }

    public override List<int> Execute()
    {
        List<int> result = Apply().ToList();

        filteredCount = result.Count;
        isExecuted = true;

        Console.WriteLine(
            $"Filter Executed,Predicate:{predicate},Result Count:{filteredCount}"
        );

        return result;
    }

    public override string GetQueryType()
    {
        return "Filter Query";
    }
}

class AggregateQuery : Query
{
    public string operation;
    public double result;

    public override IEnumerable<int> Apply()
    {
        return dataSource;
    }

    public override List<int> Execute()
    {
        IEnumerable<int> query = Apply();

        switch (operation.ToLower())
        {
            case "sum":
                result = query.Sum();
                break;

            case "average":
                result = query.Average();
                break;

            case "max":
                result = query.Max();
                break;

            case "min":
                result = query.Min();
                break;
        }

        isExecuted = true;

        Console.WriteLine(
            $"Aggregation Executed,Operation:{operation},Result:{result}"
        );

        return query.ToList();
    }

    public override string GetQueryType()
    {
        return "Aggregate Query";
    }
}

class Program
{
    static void Main()
    {
        string queryType = Console.ReadLine();

        List<int> data = Console.ReadLine()
            .Split(' ')
            .Select(int.Parse)
            .ToList();

        string input = Console.ReadLine();

        Query query;

        if (queryType.ToLower() == "filter")
        {
            query = new FilterQuery
            {
                dataSource = data,
                predicate = input
            };
        }
        else
        {
            query = new AggregateQuery
            {
                dataSource = data,
                operation = input
            };
        }

        query.Execute();
    }
}