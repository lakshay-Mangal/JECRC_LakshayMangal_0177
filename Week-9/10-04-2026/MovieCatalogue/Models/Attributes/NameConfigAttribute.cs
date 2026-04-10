using System.ComponentModel.DataAnnotations;

namespace MovieCatalogue.Models.Attributes
{
    public class NameConfigAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {

            string name = value.ToString();

            if (name.Length < 2)
                return new ValidationResult("Movie name must be at least 2 characters long");

            if (!char.IsUpper(name[0]))
                return new ValidationResult("First letter of movie must be uppercase");


            return ValidationResult.Success;
        }
    }
}