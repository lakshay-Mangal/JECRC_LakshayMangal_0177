using Microsoft.AspNetCore.Mvc;
using StudentAdmissionManagement.Models;

namespace StudentAdmissionManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : Controller
    {
        public static List<Admission> admissions = new();

        [HttpGet]
        public IActionResult Get() => Ok(admissions);

        [HttpPost]
        public IActionResult Add(Admission admission)
        {
            admissions.Add(admission);
            return Ok(admissions);
        }
    }
}
