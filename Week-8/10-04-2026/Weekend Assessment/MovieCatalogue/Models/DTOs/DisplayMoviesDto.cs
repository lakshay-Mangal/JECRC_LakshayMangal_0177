namespace MovieCatalogue.Models.DTOs
{
    public class DisplayMoviesDto
    {
       
            public Guid Id { get; set; }
            public string Name { get; set; }
            public int ReleaseYear { get; set; }
            public decimal Length { get; set; }
            public string Language { get; set; }
        
    }
}
