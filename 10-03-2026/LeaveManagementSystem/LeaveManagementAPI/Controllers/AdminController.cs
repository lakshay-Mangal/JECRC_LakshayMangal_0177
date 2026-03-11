using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeaveManagementAPI.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)] // Entire controller locked to Admin
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("employees")]
        public IActionResult GetEmployees()
        {
            // Returns all users except the admins, omitting the password field for security
            var employees = _context.Users
                .Where(u => u.Role != UserRoles.Admin)
                .Select(u => new 
                { 
                    u.Id, 
                    u.Username, 
                    u.Role 
                })
                .ToList();

            return Ok(employees);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound("User not found.");

            // Optional: You might also want to delete all leave requests tied to this user
            var userLeaves = _context.LeaveRequests.Where(lr => lr.EmployeeId == id).ToList();
            _context.LeaveRequests.RemoveRange(userLeaves);

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok(new { Message = $"Employee {user.Username} deleted successfully." });
        }
    }
}