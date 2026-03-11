using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LeaveManagementAPI.Controllers
{
    [Route("api/leave")] // Changed to match your requested routes
    [ApiController]
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // Employee Routes ----------------------------------------------------

        [HttpPost]
        public IActionResult CreateLeaveRequest([FromBody] LeaveRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            int employeeId = int.Parse(userId);

            if (request.EndDate.Date < request.StartDate.Date)
                return BadRequest("End date cannot be before the start date.");

            bool isOverlapping = _context.LeaveRequests.Any(lr => 
                lr.EmployeeId == employeeId && 
                lr.Status != "Rejected" && 
                request.StartDate.Date <= lr.EndDate.Date && 
                request.EndDate.Date >= lr.StartDate.Date
            );

            if (isOverlapping)
                return BadRequest("You already have a pending or approved leave request during these dates.");

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

        // Manager Routes -----------------------------------------------------

        [HttpGet("all")]
        [Authorize(Roles = UserRoles.Manager)] // Handed over to Manager
        public IActionResult GetAllLeaves()
        {
            return Ok(_context.LeaveRequests.ToList());
        }

        [HttpPut("approve/{id}")]
        [Authorize(Roles = UserRoles.Manager)] // Handed over to Manager
        public IActionResult ApproveLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);
            if (leave == null) return NotFound("Leave request not found.");

            leave.Status = "Approved";
            _context.SaveChanges();

            return Ok(new { Message = $"Leave request {id} approved." });
        }

        [HttpPut("reject/{id}")]
        [Authorize(Roles = UserRoles.Manager)] // Handed over to Manager
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