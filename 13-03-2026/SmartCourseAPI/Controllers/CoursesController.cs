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
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>FR1 – Get all available courses</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CourseDto>), 200)]
        public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Department)
                .Select(c => new CourseDto
                {
                    CourseId = c.CourseId,
                    CourseName = c.CourseName,
                    DepartmentId = c.DepartmentId,
                    DepartmentName = c.Department != null ? c.Department.DepartmentName : null,
                    Credits = c.Credits,
                    SeatsAvailable = c.SeatsAvailable
                })
                .ToListAsync();

            return Ok(courses);
        }

        /// <summary>FR1 – Get a single course by ID</summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CourseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Department)
                .FirstOrDefaultAsync(c => c.CourseId == id);

            if (course == null) return NotFound(new { message = $"Course with ID {id} not found." });

            return Ok(new CourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                DepartmentId = course.DepartmentId,
                DepartmentName = course.Department?.DepartmentName,
                Credits = course.Credits,
                SeatsAvailable = course.SeatsAvailable
            });
        }

        /// <summary>FR2 – Search courses by name or department</summary>
        [HttpGet("search")]
        [ProducesResponseType(typeof(IEnumerable<CourseDto>), 200)]
        public async Task<ActionResult<IEnumerable<CourseDto>>> SearchCourses([FromQuery] string keyword)
        {
            var lower = keyword.ToLower();
            var courses = await _context.Courses
                .Include(c => c.Department)
                .Where(c => c.CourseName.ToLower().Contains(lower) ||
                            (c.Department != null && c.Department.DepartmentName.ToLower().Contains(lower)))
                .Select(c => new CourseDto
                {
                    CourseId = c.CourseId,
                    CourseName = c.CourseName,
                    DepartmentId = c.DepartmentId,
                    DepartmentName = c.Department != null ? c.Department.DepartmentName : null,
                    Credits = c.Credits,
                    SeatsAvailable = c.SeatsAvailable
                })
                .ToListAsync();

            return Ok(courses);
        }

        /// <summary>FR3 – Admin: Add a new course</summary>
        [HttpPost]
        [ProducesResponseType(typeof(CourseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<CourseDto>> CreateCourse([FromBody] CreateCourseDto dto)
        {
            var dept = await _context.Departments.FindAsync(dto.DepartmentId);
            if (dept == null) return BadRequest(new { message = "Invalid DepartmentId." });

            var course = new Course
            {
                CourseName = dto.CourseName,
                DepartmentId = dto.DepartmentId,
                Credits = dto.Credits,
                SeatsAvailable = dto.SeatsAvailable
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            var result = new CourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                DepartmentId = course.DepartmentId,
                DepartmentName = dept.DepartmentName,
                Credits = course.Credits,
                SeatsAvailable = course.SeatsAvailable
            };

            return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, result);
        }

        /// <summary>FR4 – Admin: Update course details</summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(CourseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<CourseDto>> UpdateCourse(int id, [FromBody] UpdateCourseDto dto)
        {
            var course = await _context.Courses.Include(c => c.Department).FirstOrDefaultAsync(c => c.CourseId == id);
            if (course == null) return NotFound(new { message = $"Course with ID {id} not found." });

            if (dto.CourseName != null) course.CourseName = dto.CourseName;
            if (dto.Credits.HasValue) course.Credits = dto.Credits.Value;
            if (dto.SeatsAvailable.HasValue) course.SeatsAvailable = dto.SeatsAvailable.Value;
            if (dto.DepartmentId.HasValue)
            {
                var dept = await _context.Departments.FindAsync(dto.DepartmentId.Value);
                if (dept == null) return BadRequest(new { message = "Invalid DepartmentId." });
                course.DepartmentId = dto.DepartmentId.Value;
                course.Department = dept;
            }

            await _context.SaveChangesAsync();

            return Ok(new CourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                DepartmentId = course.DepartmentId,
                DepartmentName = course.Department?.DepartmentName,
                Credits = course.Credits,
                SeatsAvailable = course.SeatsAvailable
            });
        }

        /// <summary>FR5 – Admin: Delete a course</summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound(new { message = $"Course with ID {id} not found." });

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
