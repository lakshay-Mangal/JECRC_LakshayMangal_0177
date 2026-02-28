using System;
using System.Security.Cryptography;

class GroupAgent
{
    public void show()
    {
        Console.WriteLine("Group agent Created !!!");
        Console.WriteLine();
        //Console.ReadLine();

    }
}

class Agent : GroupAgent
{
    public new void show()
    {
        Console.WriteLine("Agent Created !!!!");
        Console.WriteLine();
        //Console.ReadLine();
    }
}

class sample
{
    public static void Main(string[] args)
    {
        GroupAgent a1 = new GroupAgent();
        a1.show();

        Agent b1 = new Agent();
        b1.show();

        GroupAgent a2 = new Agent();
        a2.show();
    }
}

