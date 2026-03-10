namespace LeaveManagementAPI.Models
{
    public class RegisterModel
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Employee"; // Default role if they don't provide one
    }
}