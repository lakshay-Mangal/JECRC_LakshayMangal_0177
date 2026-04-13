using Microsoft.AspNetCore.Mvc;
using StudentAttendanceManagement.Models;

namespace StudentAttendanceManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : Controller
    {
        private static List<Attendance> attendanceRecords = new();

        [HttpGet]
        public IActionResult Get() => Ok(attendanceRecords);

        [HttpPost]

        public IActionResult Mark (Attendance attendance)
        {
            attendanceRecords.Add(attendance);
            return Ok(attendanceRecords);
        }
    }
}
