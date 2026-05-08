using System;

class BankAccount
{
    public string accountNumber { get; }

    protected double balance { get; private set; }

    public BankAccount(string accountNumber, double initialDeposit)
    {
        this.accountNumber = accountNumber;
        balance = initialDeposit;
    }

    public virtual bool Deposit(double amount)
    {
        if (amount <= 0)
        {
            return false;
        }

        balance += amount;
        return true;
    }

    public virtual bool Withdraw(double amount)
    {
        if (amount <= 0 || amount > balance)
        {
            return false;
        }

        balance -= amount;
        return true;
    }

    public double GetBalance()
    {
        return balance;
    }

    protected void UpdateBalance(double amount)
    {
        balance = amount;
    }
}

class SavingsAccount : BankAccount
{
    public double interestRate;
    public double minimumBalance = 1000;

    public SavingsAccount(string accountNumber, double initialDeposit)
        : base(accountNumber, initialDeposit)
    {
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < minimumBalance)
        {
            Console.WriteLine(
                $"Withdrawal Failed: Minimum balance requirement {minimumBalance}"
            );

            return false;
        }

        return base.Withdraw(amount);
    }

    public void ApplyInterest(double rate)
    {
        interestRate = rate;

        double newBalance = GetBalance() + (GetBalance() * interestRate / 100);

        UpdateBalance(newBalance);

        Console.WriteLine(
            $"Interest Applied,Rate:{interestRate},New Balance:{GetBalance()}"
        );
    }
}

class CurrentAccount : BankAccount
{
    public double overdraftLimit;
    public double transactionFee;

    public CurrentAccount(
        string accountNumber,
        double initialDeposit,
        double overdraftLimit = 2000,
        double transactionFee = 50
    ) : base(accountNumber, initialDeposit)
    {
        this.overdraftLimit = overdraftLimit;
        this.transactionFee = transactionFee;
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < -overdraftLimit)
        {
            Console.WriteLine("Withdrawal Failed: Overdraft limit exceeded");
            return false;
        }

        UpdateBalance(GetBalance() - amount);

        return true;
    }

    public void DeductTransactionFee()
    {
        UpdateBalance(GetBalance() - transactionFee);

        Console.WriteLine(
            $"Fee Deducted,Amount:{transactionFee},Remaining:{GetBalance()}"
        );
    }
}

class Program
{
    static void Main()
    {
        string accountType = Console.ReadLine();

        string accountNumber = Console.ReadLine();

        double initialDeposit = double.Parse(Console.ReadLine());

        string operationLine = Console.ReadLine();

        string[] parts = operationLine.Split(' ');

        string operation = parts[0];

        if (accountType.ToLower() == "savings")
        {
            SavingsAccount account =
                new SavingsAccount(accountNumber, initialDeposit);

            if (operation == "Withdraw")
            {
                double amount = double.Parse(parts[1]);

                account.Withdraw(amount);

                Console.WriteLine(
                    $"Current Balance: {account.GetBalance()}"
                );
            }

            string secondOperation = Console.ReadLine();

            string[] secondParts = secondOperation.Split(' ');

            if (secondParts[0] == "ApplyInterest")
            {
                double rate = double.Parse(secondParts[1]);

                account.ApplyInterest(rate);
            }
        }
        else
        {
            CurrentAccount account =
                new CurrentAccount(accountNumber, initialDeposit);

            if (operation == "Withdraw")
            {
                double amount = double.Parse(parts[1]);

                account.Withdraw(amount);

                Console.WriteLine(
                    $"Current Balance: {account.GetBalance()}"
                );
            }

            string secondOperation = Console.ReadLine();

            if (secondOperation == "DeductTransactionFee")
            {
                account.DeductTransactionFee();
            }
        }
    }
}