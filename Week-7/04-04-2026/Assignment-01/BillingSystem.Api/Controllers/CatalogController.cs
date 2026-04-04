// Controllers/CatalogsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CatalogsController : ControllerBase
{
    private readonly BillingDbContext _context;

    public CatalogsController(BillingDbContext context)
    {
        _context = context;
    }

    // GET: api/catalogs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CatalogItem>>> GetCatalogs()
    {
        return await _context.CatalogItems.ToListAsync();
    }
}