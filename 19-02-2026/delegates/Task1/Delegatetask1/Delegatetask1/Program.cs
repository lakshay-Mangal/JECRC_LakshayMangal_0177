using System;

namespace DelegateDemo
{
    // Step 1: Delegate
    public delegate void NotificationSender(string message);

    // Step 2: Class with notification methods
    class Notifiers
    {
        public static void SendEmail(string message)
        {
            Console.WriteLine("Email Sent: " + message);
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine("SMS Sent: " + message);
        }

        public static void SendPushNotification(string message)
        {
            Console.WriteLine("Push Notification Sent: " + message);
        }
    }

    // Step 3: Manager class
    class NotificationManager
    {
        public void NotifyUser(string message, NotificationSender sender)
        {
            sender(message); // invoking delegate
        }
    }

    // Step 4: Main class
    class Program
    {
        static void Main(string[] args)
        {
            NotificationManager manager = new NotificationManager();

            // Sending Email
            manager.NotifyUser("Welcome to Capgemini Training", Notifiers.SendEmail);

            // Sending SMS
            manager.NotifyUser("Your OTP is 4589", Notifiers.SendSMS);

            // Sending Push Notification
            manager.NotifyUser("You have a new assignment!", Notifiers.SendPushNotification);
        }
    }
}



//important concepts and topics

//delegate
//interfaces
//inheritance
//abstract