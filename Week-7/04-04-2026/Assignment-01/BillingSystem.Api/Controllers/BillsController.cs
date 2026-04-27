// Controllers/BillsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class BillsController : ControllerBase
{
    private readonly BillingDbContext _context;

    public BillsController(BillingDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Bill>> CreateBill(Bill newBill)
    {
        // Generate Unique Invoice Number (e.g., INV-20260404-XXXX)
        newBill.InvoiceNumber = $"INV-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}";
        newBill.DateCreated = DateTime.Now;

        // Ensure calculations are solid on the backend to prevent frontend manipulation
        newBill.SubTotal = newBill.Items.Sum(i => i.Quantity * i.UnitPrice);
        // Tax and Discount logic would apply here based on your specific rules
        newBill.TotalAmount = (newBill.SubTotal - newBill.DiscountAmount) + newBill.TaxAmount;

        _context.Bills.Add(newBill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBill), new { id = newBill.Id }, newBill);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Bill>> GetBill(int id)
    {
        var bill = await _context.Bills.Include(b => b.Items).FirstOrDefaultAsync(b => b.Id == id);
        if (bill == null) return NotFound();
        return bill;
    }

[HttpGet]
public async Task<ActionResult<IEnumerable<Bill>>> GetBills()
{
    // Fetches all bills, includes the items purchased, and orders them by newest first
    return await _context.Bills
        .Include(b => b.Items)
        .OrderByDescending(b => b.DateCreated)
        .ToListAsync();
}
}