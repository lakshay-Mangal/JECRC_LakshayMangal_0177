using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LeaveManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LeaveRequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveRequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateLeaveRequest([FromBody] LeaveRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            request.EmployeeId = int.Parse(userId);
            request.Status = "Pending";

            _context.LeaveRequests.Add(request);
            _context.SaveChanges();

            return Ok(new { Message = "Leave request submitted.", request.Id });
        }

        [HttpGet("my-leaves")]
        public IActionResult GetMyLeaves()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            int employeeId = int.Parse(userId);
            return Ok(_context.LeaveRequests.Where(lr => lr.EmployeeId == employeeId).ToList());
        }

        [HttpGet("all")]
[Authorize(Roles = UserRoles.Admin)]

        public IActionResult GetAllLeaves()
        {
            return Ok(_context.LeaveRequests.ToList());
        }

        [HttpPut("approve/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult ApproveLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);
            if (leave == null) return NotFound("Leave request not found.");

            leave.Status = "Approved";
            _context.SaveChanges();

            return Ok(new { Message = "Leave request approved." });
        }
    }
}