namespace MovieCatalogue.Models.Entities
{
    public class Movies
    {
  
            public Guid Id { get; set; }
            public string Name { get; set; }

            public int ReleaseYear { get; set; }

            public decimal Length { get; set; }

            public string Language { get; set; }

            public int Budget { get; set; } //in millions

        }
    }

