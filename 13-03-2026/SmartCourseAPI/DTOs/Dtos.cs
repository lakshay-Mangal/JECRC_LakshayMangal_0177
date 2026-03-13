namespace SmartCourseAPI.DTOs
{
    // Course DTOs
    public class CourseDto
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public int Credits { get; set; }
        public bool SeatsAvailable { get; set; }
    }

    public class CreateCourseDto
    {
        public string CourseName { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public int Credits { get; set; }
        public bool SeatsAvailable { get; set; } = true;
    }

    public class UpdateCourseDto
    {
        public string? CourseName { get; set; }
        public int? DepartmentId { get; set; }
        public int? Credits { get; set; }
        public bool? SeatsAvailable { get; set; }
    }

    // Student DTOs
    public class StudentDto
    {
        public int StudentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string Role { get; set; } = "Student";
    }

    public class CreateStudentDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string Role { get; set; } = "Student";
    }

    // Department DTOs
    public class DepartmentDto
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
    }

    public class CreateDepartmentDto
    {
        public string DepartmentName { get; set; } = string.Empty;
    }

    // Enrollment DTOs
    public class EnrollmentDto
    {
        public int EnrollmentId { get; set; }
        public int CourseId { get; set; }
        public string? CourseName { get; set; }
        public int StudentId { get; set; }
        public string? StudentName { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime? DropDate { get; set; }
    }

    public class CreateEnrollmentDto
    {
        public int CourseId { get; set; }
        public int StudentId { get; set; }
    }
}
