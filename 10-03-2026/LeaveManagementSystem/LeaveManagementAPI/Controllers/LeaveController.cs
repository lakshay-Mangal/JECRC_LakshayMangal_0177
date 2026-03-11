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
        [HttpPost]
        public IActionResult CreateLeaveRequest([FromBody] LeaveRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            int employeeId = int.Parse(userId);

            // Safeguard 1: Ensure end date is not before start date
            if (request.EndDate.Date < request.StartDate.Date)
            {
                return BadRequest("End date cannot be before the start date.");
            }

            // Safeguard 2: Prevent overlapping leaves
            // We ignore "Rejected" leaves because those days are technically free again
            bool isOverlapping = _context.LeaveRequests.Any(lr => 
                lr.EmployeeId == employeeId && 
                lr.Status != "Rejected" && 
                request.StartDate.Date <= lr.EndDate.Date && 
                request.EndDate.Date >= lr.StartDate.Date
            );

            if (isOverlapping)
            {
                return BadRequest("You already have a pending or approved leave request during these dates.");
            }

            // If validations pass, save the request
            request.EmployeeId = employeeId;
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

        // PUT: api/LeaveRequest/reject/5 (ONLY ADMINS can reject)
        [HttpPut("reject/{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult RejectLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);
            if (leave == null) return NotFound("Leave request not found.");

            leave.Status = "Rejected";
            _context.SaveChanges();

            return Ok(new { Message = $"Leave request {id} rejected." });
        }
    }
}