using System;
namespace DrawingDemo
{
    public abstract class DrawingObject
    {
        public abstract void Draw();
    }

    public class Line : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("It's a Line");
        }
    }

    public class Circle : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("It's a Circle");
        }
    }

    public class Square : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("It's a Square");
        }
    }

    class Program
    {
        static void Main()
        {
            DrawingObject[] obj = new DrawingObject[]
            {

            new Line(),
            new Circle(),
            new Square()

        };

            foreach (DrawingObject ob in obj)
            {
                ob.Draw();
            }
        }
    }
}