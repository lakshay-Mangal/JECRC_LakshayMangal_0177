
//overridding

using System;


class GroupAgent
{
    public virtual void show()
    {
        Console.WriteLine("Group agent Created !!!");
        Console.WriteLine();
        //Console.ReadLine();

    }
}

class Agent : GroupAgent
{
    public sealed override void show()
    {
        Console.WriteLine("Agent Created !!!!");
        Console.WriteLine();
        //Console.ReadLine();
    }
}

class Booking : Agent
{
    public override void show()
    {
        Console.WriteLine("Booking created !!!!");
        Console.WriteLine();
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


