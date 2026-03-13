using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Data;
using SmartCourseAPI.DTOs;
using SmartCourseAPI.Models;

namespace SmartCourseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Get all departments</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<DepartmentDto>), 200)]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartments()
        {
            var depts = await _context.Departments
                .Select(d => new DepartmentDto { DepartmentId = d.DepartmentId, DepartmentName = d.DepartmentName })
                .ToListAsync();
            return Ok(depts);
        }

        /// <summary>Create a department</summary>
        [HttpPost]
        [ProducesResponseType(typeof(DepartmentDto), 201)]
        public async Task<ActionResult<DepartmentDto>> CreateDepartment([FromBody] CreateDepartmentDto dto)
        {
            var dept = new Department { DepartmentName = dto.DepartmentName };
            _context.Departments.Add(dept);
            await _context.SaveChangesAsync();

            var result = new DepartmentDto { DepartmentId = dept.DepartmentId, DepartmentName = dept.DepartmentName };
            return CreatedAtAction(nameof(GetDepartments), result);
        }
    }
}
