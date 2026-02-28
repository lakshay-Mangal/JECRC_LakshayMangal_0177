using System;

namespace OrderCart
{
    public abstract class OrderProcessor
    {
        public int OrderId { get; set; }
        public string OrderName { get; set; }
        public double Amount { get; set; }
            

        public abstract void ProcessPayment();
        
        public abstract void GenerateInvoice();

        public abstract void SendNotification();

        public void DisplayOrderdetails()
        {
            Console.WriteLine("Order Id : " + OrderId);
            Console.WriteLine("Order Name : "+ OrderName);
            Console.WriteLine("Order Amount Rs. " + Amount);

        }
    }

    public class OnlineOrder : OrderProcessor {
        public override void ProcessPayment()
        {
            Console.WriteLine("Processing Payment ... ");
        }

        public override void GenerateInvoice() {
            Console.WriteLine("Generating Invoice and downloading Pdf ... ");
        }

        public override void SendNotification()
        {
            Console.WriteLine("Sending Email Notification to Customer...");
        }

    }
        class Program
        {
            static void Main(string[] args)
            {
                OrderProcessor order = new OnlineOrder();

                order.OrderId = 101;
                order.Amount = 4999.99;
            order.OrderName = "Dell laptop ";

                order.DisplayOrderdetails();
                order.ProcessPayment();
                order.GenerateInvoice();
                order.SendNotification();
            }
        }
    }
