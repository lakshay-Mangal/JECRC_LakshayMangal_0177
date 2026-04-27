using System.ComponentModel.DataAnnotations;

namespace MovieCatalogue.Models.Attributes
{
    public class MovieLengthAttribute :ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal Length)
            {
                if (Length > 6) return new ValidationResult("This is too Long to be classified as movie");
            }
            else return new ValidationResult("Length Should be in Decimal");

            return ValidationResult.Success;
        }
    }
}
