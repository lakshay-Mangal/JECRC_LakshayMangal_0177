using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
namespace JwtRoleAuthApi.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]

    public class AdminController : ControllerBase
    {
        [HttpGet("dashboard")]
        [Authorize(Roles ="Admin")]

        public IActionResult GetAdminDashboard()
        {
            return Ok("Welcome to Admin Dashboard! Only users with Admin permission can see this");
        }
    }
}