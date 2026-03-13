using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartCourseAPI.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(200)]
        public string CourseName { get; set; } = string.Empty;

        [ForeignKey("Department")]
        public int DepartmentId { get; set; }

        public Department? Department { get; set; }

        public int Credits { get; set; }

        public bool SeatsAvailable { get; set; } = true;

        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
