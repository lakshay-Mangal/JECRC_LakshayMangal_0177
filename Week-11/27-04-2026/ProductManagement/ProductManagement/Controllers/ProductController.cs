using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _repo;
        private readonly AppDbContext _context;

        public ProductController(IProductRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var products = await _repo.GetAllAsync();
            return View(products);
        }

        public async Task<IActionResult> Details(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            return product == null ? NotFound() : View(product);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            await LoadLookupsAsync();
            return View(new ProductRequestDto());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                await LoadLookupsAsync();
                return View(dto);
            }

            var id = await _repo.CreateAsync(dto);
            return RedirectToAction(nameof(Details), new { id });
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var entity = await _context.Products
                .Include(p => p.ProductDetail)
                .Include(p => p.ProductTags)
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (entity == null)
            {
                return NotFound();
            }

            var dto = new ProductRequestDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Price = entity.Price,
                CategoryId = entity.CategoryId,
                Description = entity.ProductDetail?.Description ?? string.Empty,
                TagIds = entity.ProductTags.Select(pt => pt.TagId).ToList()
            };

            await LoadLookupsAsync(dto.CategoryId, dto.TagIds);
            return View(dto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                await LoadLookupsAsync(dto.CategoryId, dto.TagIds);
                return View(dto);
            }

            var updated = await _repo.UpdateAsync(id, dto);
            if (!updated)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Details), new { id });
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            return product == null ? NotFound() : View(product);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var deleted = await _repo.DeleteAsync(id);
            return deleted ? RedirectToAction(nameof(Index)) : NotFound();
        }

        private async Task LoadLookupsAsync(int? selectedCategoryId = null, IEnumerable<int>? selectedTagIds = null)
        {
            var categories = await _context.Categories
                .AsNoTracking()
                .OrderBy(category => category.Name)
                .ToListAsync();

            var tags = await _context.Tags
                .AsNoTracking()
                .OrderBy(tag => tag.Name)
                .ToListAsync();

            ViewBag.Categories = new SelectList(categories, "Id", "Name", selectedCategoryId);
            ViewBag.Tags = new MultiSelectList(tags, "Id", "Name", selectedTagIds);
        }
    }
}