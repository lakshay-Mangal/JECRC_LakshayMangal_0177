using BankingApi.Data;
using BankingApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly BankingDbContext _db;

        public TransactionsController(BankingDbContext db)
        {
            _db = db;
        }

        // GET api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetAll()
        {
            var transactions = await _db.Transactions
                .OrderByDescending(t => t.Date)
                .ToListAsync();
            return Ok(transactions);
        }

        // GET api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetById(int id)
        {
            var tx = await _db.Transactions.FindAsync(id);
            return tx is null ? NotFound() : Ok(tx);
        }

        // GET api/transactions/filter?date=2019-12-02
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Transaction>>> FilterByDate([FromQuery] string date)
        {
            if (string.IsNullOrWhiteSpace(date))
                return BadRequest("Date parameter is required.");

            var results = await _db.Transactions
                .Where(t => t.Date == date)
                .OrderByDescending(t => t.Id)
                .ToListAsync();

            return Ok(results);
        }

        // POST api/transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> Create([FromBody] Transaction tx)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _db.Transactions.Add(tx);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = tx.Id }, tx);
        }

        // PUT api/transactions/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Transaction>> Update(int id, [FromBody] Transaction tx)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existing = await _db.Transactions.FindAsync(id);
            if (existing is null) return NotFound();

            existing.Date        = tx.Date;
            existing.Description = tx.Description;
            existing.Type        = tx.Type;
            existing.Amount      = tx.Amount;
            existing.Balance     = tx.Balance;

            await _db.SaveChangesAsync();
            return Ok(existing);
        }

        // DELETE api/transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tx = await _db.Transactions.FindAsync(id);
            if (tx is null) return NotFound();

            _db.Transactions.Remove(tx);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
