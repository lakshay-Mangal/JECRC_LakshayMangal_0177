using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LeaveManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        public AuthController(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (_context.Users.Any(u => u.Username == model.Username))
            {
                return BadRequest("Username already exists.");
            }

            // 1. Define what roles are actually allowed
            var allowedRoles = new List<string> { UserRoles.Admin, UserRoles.Manager, UserRoles.Employee };            
            // 2. Default to Employee if they didn't provide one
            var assignedRole = string.IsNullOrEmpty(model.Role) ? UserRoles.Employee : model.Role;
            

            // 3. Reject the request if they typed a made-up role
            if (!allowedRoles.Contains(assignedRole))
            {
                return BadRequest($"Invalid role. Allowed roles are: {string.Join(", ", allowedRoles)}");
            }

            var newUser = new User
            {
                Username = model.Username,
                Password = model.Password, 
                Role = assignedRole
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { Message = $"User registered successfully with role: {assignedRole}" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);

            if (user == null) return Unauthorized("Invalid credentials.");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}