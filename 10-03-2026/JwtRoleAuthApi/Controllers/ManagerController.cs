using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;

namespace JwtRoleAuthApi.Controllers
{   
    [ApiController]
    [Route("api/[controller]")]
    
    public class ManagerController: ControllerBase
    {
        [HttpGet("dashboard")]
        [Authorize(Roles ="Manager")]

        public IActionResult GetUserDashboard()
        {
            return Ok("Welcome to Manager dashboard! Only users with Manager role see this dasboard");
        }

        [HttpGet("reports")]
        [Authorize(Roles = "Admin,Manager")]

        public IActionResult GetReports()
        {
            return Ok("Welcome to Admin and Manager Reports! Only Admin and Manager privilage users can see these Reports");
        }
    }
}