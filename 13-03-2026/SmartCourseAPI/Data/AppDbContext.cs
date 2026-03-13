using Microsoft.EntityFrameworkCore;
using SmartCourseAPI.Models;

namespace SmartCourseAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Departments
            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentId = 1, DepartmentName = "Computer Science" },
                new Department { DepartmentId = 2, DepartmentName = "Mathematics" },
                new Department { DepartmentId = 3, DepartmentName = "Physics" },
                new Department { DepartmentId = 4, DepartmentName = "Business Administration" }
            );

            // Seed Courses
            modelBuilder.Entity<Course>().HasData(
                new Course { CourseId = 1, CourseName = "Introduction to Programming", DepartmentId = 1, Credits = 3, SeatsAvailable = true },
                new Course { CourseId = 2, CourseName = "Data Structures & Algorithms", DepartmentId = 1, Credits = 4, SeatsAvailable = true },
                new Course { CourseId = 3, CourseName = "Calculus I", DepartmentId = 2, Credits = 3, SeatsAvailable = true },
                new Course { CourseId = 4, CourseName = "Linear Algebra", DepartmentId = 2, Credits = 3, SeatsAvailable = true },
                new Course { CourseId = 5, CourseName = "Mechanics", DepartmentId = 3, Credits = 4, SeatsAvailable = false }
            );

            // Seed Students
            modelBuilder.Entity<Student>().HasData(
                new Student { StudentId = 1, Name = "Alice Johnson", Email = "alice@example.com", Phone = "555-0101", Role = "Student" },
                new Student { StudentId = 2, Name = "Bob Smith", Email = "bob@example.com", Phone = "555-0102", Role = "Student" },
                new Student { StudentId = 3, Name = "Admin User", Email = "admin@example.com", Phone = "555-0100", Role = "Admin" }
            );
        }
    }
}
