Problem Statement -: 
A taxi can take multiple passengers to the railway station at the same time.On the way back to the starting point,the taxi driver may pick up additional passengers for his next trip to the airport.A map of passenger location has been created,represented as a square matrix.
The Matrix is filled with cells,and each cell will have an initial value as follows:
•	A value greater than or equal to zero represents a path.
•	A value equal to 1 represents a passenger.
•	A value equal to -1 represents an obstruction.
The rules of motion of taxi are as follows:
•	The Taxi driver starts at (0,0) and the railway station is at (n-1,n-1).Movement towards the railway station is right or down,through valid path cells.
•	After reaching (n-1,n-1) the taxi driver travels back to (0,0) by travelling left or up through valid path cells.
•	When passing through a path cell containing a passenger,the passenger is picked up.once the rider is picked up the cell becomes an empty path cell. 
•	If there is no valid path between (0,0) and (n-1,n-1),then no passenger can be picked.
•	The goal is to collect as many passengers as possible so that the driver can maximize his earnings.
For example consider the following grid,
           0      1
          -1     0
Start at top left corner.Move right one collecting a passenger. Move down one to the destination.Cell (1,0) is blocked,So the return path is the reverse of the path to the airport.All Paths have been explored and one passenger is collected.
 
Returns:
Int : maximum number of passengers that can be collected.
