//using System;  //not being used here system can be removed
namespace AccessModifiersDemo 
{ 
    class UsingAccessModifiers 
    {
        public void publicMethod()
        {
            Console.WriteLine("It's Public");
        }
        private void privateMethod()
        {
            Console.WriteLine("It's Private");
        }
        protected void protectedMethod()
        {
            Console.WriteLine("It's Protected");
        }
        internal void internalMethod()
        {
            Console.WriteLine("It's internal");
        }
        protected internal void protectedInternalMethod()
        {
            Console.WriteLine("It's protected Internal Method");
        }

        void SomeMethod()
        {
            Console.WriteLine("Some Method"); //private by default
        }
    }

    class Test
    {
        static void Main(string[] args)
        {
            UsingAccessModifiers obj = new UsingAccessModifiers();
            obj.publicMethod();
            obj.internalMethod();
            obj.protectedInternalMethod();

            //Wont work as inaccessible
            //obj.privateMethod();
            //obj.protectedMethod();
            //obj.SomeMethod();
        }
    }
}