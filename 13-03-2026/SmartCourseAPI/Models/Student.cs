using System.ComponentModel.DataAnnotations;

namespace SmartCourseAPI.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(20)]
        public string Role { get; set; } = "Student"; // Admin / Student

        public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    }
}
