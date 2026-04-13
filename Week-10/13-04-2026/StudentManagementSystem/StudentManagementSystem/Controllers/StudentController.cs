using Microsoft.AspNetCore.Mvc;

namespace StudentManagementSystem.Controllers
{
    public class StudentStatus
    {
        public string Message { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        // CHANGED: We explicitly tell Swagger exactly what object we are returning
        [HttpGet]
        public ActionResult<StudentStatus> GetDummy()
        {
            var status = new StudentStatus { Message = "Student API is running!" };
            return Ok(status);
        }
    }
}