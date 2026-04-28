using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagement.Models
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;

        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }

        public Product Product { get; set; } = null!;

    }
}
