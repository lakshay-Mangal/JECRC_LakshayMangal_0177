using MovieCatalogue.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MovieCatalogue.Models.DTOs
{
    public class CreateMovieDto
    {


        [Required]
        [NameConfig]
        public string Name { get; set; }
        [Required]
        public int ReleaseYear { get; set; }
        [Required]
        [MovieLength]
        public decimal Length { get; set; }
        [Required]
        public string Language { get; set; }
    }
}
