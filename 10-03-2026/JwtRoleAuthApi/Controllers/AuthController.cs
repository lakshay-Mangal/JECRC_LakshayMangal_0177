using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JwtRoleAuthApi.Data;
using JwtRoleAuthApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config= config;
        }

        // Implement authentication and token generation here
        //User Registration
        [HttpPost("register")]
        public IActionResult Register ([FromBody] User user)
        {
            if(_context.Users.Any(u=> u.Username == user.Username)) return BadRequest("Username already exists");
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("User Registered Sucessfully");
        }
        //User Login
        [HttpPost("login")]
        public IActionResult Login([FromBody]User login)
        {
            var user= _context.Users.FirstOrDefault(u=> u.Username==login.Username && u.Password==login.Password);
            if(user==null) return Unauthorized("Invalid Username or password");

            var token = GenerateJwtToken(user);
            return Ok (new {token});
        }
        private string GenerateJwtToken (User user)
        {
            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            var creds= new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: creds
            );
            return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}