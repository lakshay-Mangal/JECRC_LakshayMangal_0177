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
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>Get all students</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<StudentDto>), 200)]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents()
        {
            var students = await _context.Students
                .Select(s => new StudentDto
                {
                    StudentId = s.StudentId,
                    Name = s.Name,
                    Email = s.Email,
                    Phone = s.Phone,
                    Role = s.Role
                })
                .ToListAsync();

            return Ok(students);
        }

        /// <summary>Get a student by ID</summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(StudentDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<StudentDto>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound(new { message = $"Student with ID {id} not found." });

            return Ok(new StudentDto
            {
                StudentId = student.StudentId,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Role = student.Role
            });
        }

        /// <summary>Create a new student</summary>
        [HttpPost]
        [ProducesResponseType(typeof(StudentDto), 201)]
        public async Task<ActionResult<StudentDto>> CreateStudent([FromBody] CreateStudentDto dto)
        {
            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Role = dto.Role
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            var result = new StudentDto
            {
                StudentId = student.StudentId,
                Name = student.Name,
                Email = student.Email,
                Phone = student.Phone,
                Role = student.Role
            };

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, result);
        }

        /// <summary>Delete a student</summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound(new { message = $"Student with ID {id} not found." });

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
