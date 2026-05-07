Problem: Student Grade Processor

A school needs to process student grades across multiple subjects. Use arrays for grade storage and HashSet for unique student tracking.

Requirements:

Store grades for multiple students
Calculate average, highest, lowest for each student
Find students with all grades above certain threshold
Identify grade patterns (unique grades per student)
Sample Input:

text

4

John 85 90 78 92

Sarah 95 88 91 89

Mike 70 65 80 75

Emma 88 92 94 96

Operations to perform:

Calculate each student's average
Find top performer
Find students with all grades >= 80
Count unique grade values across all students
Sample Output:

text

--- Student Grade Report ---

John: Average = 86.25, Highest = 92, Lowest = 78

Sarah: Average = 90.75, Highest = 95, Lowest = 88

Mike: Average = 72.50, Highest = 80, Lowest = 65

Emma: Average = 92.50, Highest = 96, Lowest = 88

 

Top Performer: Emma (Average: 92.50)

 

Students with all grades >= 80:

Sarah (95,88,91,89)

Emma (88,92,94,96)

 

Unique Grade Values Across All Students:

65,70,75,78,85,88,89,90,91,92,94,95,96

Total unique grades: 13

 