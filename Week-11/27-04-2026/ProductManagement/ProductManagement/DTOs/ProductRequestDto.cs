using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    public class ProductRequestDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Range(0, 10000)]
        public decimal Price { get; set ; }

        public int CategoryId { get; set;  }

        public string Description { get; set; } = string.Empty;

        public List<int> TagIds { get; set; } = new();
    }
}
