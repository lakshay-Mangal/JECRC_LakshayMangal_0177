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
    public class EnrollmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentsController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>FR8 – Admin: View all enrollment history</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<EnrollmentDto>), 200)]
        public async Task<ActionResult<IEnumerable<EnrollmentDto>>> GetEnrollments()
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Include(e => e.Student)
                .Select(e => new EnrollmentDto
                {
                    EnrollmentId = e.EnrollmentId,
                    CourseId = e.CourseId,
                    CourseName = e.Course != null ? e.Course.CourseName : null,
                    StudentId = e.StudentId,
                    StudentName = e.Student != null ? e.Student.Name : null,
                    EnrollmentDate = e.EnrollmentDate,
                    DropDate = e.DropDate
                })
                .ToListAsync();

            return Ok(enrollments);
        }

        /// <summary>Get enrollments for a specific student</summary>
        [HttpGet("student/{studentId}")]
        [ProducesResponseType(typeof(IEnumerable<EnrollmentDto>), 200)]
        public async Task<ActionResult<IEnumerable<EnrollmentDto>>> GetStudentEnrollments(int studentId)
        {
            var enrollments = await _context.Enrollments
                .Include(e => e.Course)
                .Include(e => e.Student)
                .Where(e => e.StudentId == studentId && e.DropDate == null)
                .Select(e => new EnrollmentDto
                {
                    EnrollmentId = e.EnrollmentId,
                    CourseId = e.CourseId,
                    CourseName = e.Course != null ? e.Course.CourseName : null,
                    StudentId = e.StudentId,
                    StudentName = e.Student != null ? e.Student.Name : null,
                    EnrollmentDate = e.EnrollmentDate,
                    DropDate = e.DropDate
                })
                .ToListAsync();

            return Ok(enrollments);
        }

        /// <summary>FR6 – Enroll a student in a course</summary>
        [HttpPost]
        [ProducesResponseType(typeof(EnrollmentDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<EnrollmentDto>> Enroll([FromBody] CreateEnrollmentDto dto)
        {
            var course = await _context.Courses.FindAsync(dto.CourseId);
            if (course == null) return BadRequest(new { message = "Course not found." });
            if (!course.SeatsAvailable) return BadRequest(new { message = "No seats available for this course." });

            var student = await _context.Students.FindAsync(dto.StudentId);
            if (student == null) return BadRequest(new { message = "Student not found." });

            // Check if already enrolled
            var existing = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.CourseId == dto.CourseId && e.StudentId == dto.StudentId && e.DropDate == null);
            if (existing != null) return BadRequest(new { message = "Student is already enrolled in this course." });

            var enrollment = new Enrollment
            {
                CourseId = dto.CourseId,
                StudentId = dto.StudentId,
                EnrollmentDate = DateTime.UtcNow
            };

            _context.Enrollments.Add(enrollment);

            // Update seat availability (simplified: mark as unavailable if we want to track one seat)
            // For a more robust system, you'd use a seat count field.
            // Here we just flip to false when enrollment happens.
            course.SeatsAvailable = false;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEnrollments), new { }, new EnrollmentDto
            {
                EnrollmentId = enrollment.EnrollmentId,
                CourseId = enrollment.CourseId,
                CourseName = course.CourseName,
                StudentId = enrollment.StudentId,
                StudentName = student.Name,
                EnrollmentDate = enrollment.EnrollmentDate
            });
        }

        /// <summary>FR7 – Drop an enrolled course</summary>
        [HttpDelete("{enrollmentId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DropCourse(int enrollmentId)
        {
            var enrollment = await _context.Enrollments
                .Include(e => e.Course)
                .FirstOrDefaultAsync(e => e.EnrollmentId == enrollmentId);

            if (enrollment == null) return NotFound(new { message = "Enrollment not found." });
            if (enrollment.DropDate != null) return BadRequest(new { message = "Course already dropped." });

            enrollment.DropDate = DateTime.UtcNow;

            // Re-open seat availability
            if (enrollment.Course != null)
                enrollment.Course.SeatsAvailable = true;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Course dropped successfully.", dropDate = enrollment.DropDate });
        }
    }
}
