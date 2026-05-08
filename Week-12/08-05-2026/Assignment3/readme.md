Bank Account Hierarchy with Controlled State Management

Description:-

Design an account hierarchy where different account types (Savings and Current) inherit from a base BankAccount class that enforces encapsulation through private setters.

Functional Requirements

Create a base class named BankAccount with:

Properties

accountNumber → string (readonly, set via constructor)
balance → double (private set)
Methods (virtual)

Deposit(double amount) → returns boolean (validates amount > 0)
Withdraw(double amount) → returns boolean (validates sufficient balance)
GetBalance() → returns double
SavingsAccount Class (derived from BankAccount)

Additional Properties

interestRate → double
minimumBalance → double (default: 1000)
Behavior

Withdraw() should enforce minimum balance rule (balance cannot go below minimumBalance)
ApplyInterest() → new method displaying: Interest Applied,Rate:<interestRate>,New Balance:<balance>
CurrentAccount Class (derived from BankAccount)

Additional Properties

overdraftLimit → double
transactionFee → double
Behavior

Withdraw() should allow overdraft up to overdraftLimit
DeductTransactionFee() → new method displaying: Fee Deducted,Amount:<transactionFee>,Remaining:<balance>
Input Format
First line contains accountType (Savings or Current)
Second line contains accountNumber and initial deposit
Third line contains operation and parameters

Sample Input

text

Savings

SAV123

5000

Withdraw 4500

GetBalance

ApplyInterest 5

Sample Output

text

Withdrawal Failed: Minimum balance requirement 1000

Current Balance: 5000

Interest Applied,Rate:5,New Balance:5250