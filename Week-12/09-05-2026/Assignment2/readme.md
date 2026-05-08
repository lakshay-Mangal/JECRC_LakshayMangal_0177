Asynchronous Service Orchestration Hierarchy

Design an async service hierarchy where different service types (WeatherService and StockService) inherit from a base AsyncService that implements non-blocking operations.

Functional Requirements

Create a base class named AsyncService with:

Properties

requestCount → int
lastResponseTime → long
Methods (virtual async)

FetchDataAsync(String endpoint) → returns Task<string>
GetStatusAsync() → returns Task<string>
WeatherService Class (derived from AsyncService)

Additional Properties

city → string
temperature → int
Behavior

FetchDataAsync() should display: Weather Fetch Started,<city> then after delay: Weather Data Received,<city>,<temperature>°C
GetStatusAsync() should display: Weather Service Status,Requests:<requestCount>
StockService Class (derived from AsyncService)

Additional Properties

symbol → string
currentPrice → double
Behavior

FetchDataAsync() should display: Stock Fetch Started,<symbol> then after delay: Stock Price Update,<symbol>,$<currentPrice>
GetStatusAsync() should display: Stock Service Status,Requests:<requestCount>
Note: Simulate async delay of 2 seconds for data fetch

Input Format
First line contains serviceType (Weather or Stock)
Second line contains identifier (city or symbol)
Third line contains command

Sample Input

text

Weather

NewYork

FetchDataAsync

Sample Output

text

Weather Fetch Started,NewYork

(2 second delay)

Weather Data Received,NewYork,22°C