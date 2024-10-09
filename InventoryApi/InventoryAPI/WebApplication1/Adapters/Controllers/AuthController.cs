using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InventoryApi.Models;  // Incluimos el namespace para LoginRequest y Users
using InventoryApi.Infrastructure.Data;  // Para el DbContext
using System.Security.Cryptography;
using System.Linq;

namespace InventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly InventoryDbContext _context;  // DbContext

        public AuthController(IConfiguration configuration, InventoryDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            // Buscar el usuario en la base de datos por su nombre de usuario
            var user = _context.Users.SingleOrDefault(u => u.Username == loginRequest.Username);

            if (user == null || user.PasswordHash != loginRequest.Password)  // Comparar directamente contra el campo PasswordHash
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            // Generar el token JWT
            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }


        private string GenerateJwtToken(Users user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = password + salt;
                byte[] saltedPasswordBytes = Encoding.UTF8.GetBytes(saltedPassword);
                byte[] hashBytes = sha256.ComputeHash(saltedPasswordBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        private bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var hash = HashPassword(password, storedSalt);
            return hash == storedHash;
        }
    }
}
