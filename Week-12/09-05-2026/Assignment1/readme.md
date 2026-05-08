Data Query Pipeline Hierarchy

Design a query pipeline hierarchy where different query types (FilterQuery and AggregateQuery) inherit from a base Query class that uses LINQ-style deferred execution.

Functional Requirements

Create a base class named Query with:

Properties

dataSource → List<int> (the original data)
isExecuted → boolean
Methods (virtual)

Apply() → returns IEnumerable<int> (deferred execution)
Execute() → returns List<int> (forces execution)
GetQueryType() → returns string
FilterQuery Class (derived from Query)

Additional Properties

predicate → string (e.g., ">10", "<5", "even")
filteredCount → int
Behavior

Apply() should filter data based on predicate without executing
Execute() should display: Filter Executed,Predicate:<predicate>,Result Count:<filteredCount>
AggregateQuery Class (derived from Query)

Additional Properties

operation → string (Sum, Average, Max, Min)
result → double
Behavior

Apply() should prepare aggregation without executing
Execute() should display: Aggregation Executed,Operation:<operation>,Result:<result>
Input Format
First line contains queryType (Filter or Aggregate)
Second line contains data (space-separated integers)
Third line contains predicate/operation

Sample Input

text

Filter

15 3 8 12 5 20 7

>10

Sample Output

text

Filter Executed,Predicate:>10,Result Count:3