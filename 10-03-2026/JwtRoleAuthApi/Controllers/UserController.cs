using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;

namespace JwtRoleAuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UserController: ControllerBase
    {
        [HttpGet("dashboard")]
        [Authorize(Roles ="User")]

        public IActionResult GetUserDashboard()
        {
            return Ok("Welcome to User dashboard! Only users can see this dasboard");
            }
    }
}