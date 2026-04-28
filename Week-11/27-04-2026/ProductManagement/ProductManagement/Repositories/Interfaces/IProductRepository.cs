using ProductManagement.DTOs;

namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductResponseDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(ProductRequestDto productRequestDto);

        Task<bool> UpdateAsync(int id, ProductRequestDto productRequestDto);

        Task<bool> DeleteAsync (int id);
    }
}
