using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InventoryApi.Models;
using InventoryApi.Infrastructure.Data;
using System.Security.Cryptography;
using System.Linq;

namespace InventoryApi.Controllers
{
    /// <summary>
    /// Controlador para gestionar la autenticación de usuarios.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly InventoryDbContext _context;

        /// <summary>
        /// Constructor del controlador de autenticación.
        /// </summary>
        /// <param name="configuration">Provee la configuración del sistema, incluyendo las claves JWT.</param>
        /// <param name="context">Contexto de base de datos de inventario.</param>
        public AuthController(IConfiguration configuration, InventoryDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        /// <summary>
        /// Endpoint para iniciar sesión.
        /// </summary>
        /// <remarks>
        /// Este endpoint valida las credenciales del usuario y retorna un token JWT si la autenticación es exitosa.
        /// </remarks>
        /// <response code="200">Retorna un token JWT si las credenciales son válidas.</response>
        /// <response code="401">Retorna un mensaje de error si las credenciales son incorrectas.</response>
        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == loginRequest.Username);

            if (user == null || user.PasswordHash != loginRequest.Password)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        /// <summary>
        /// Genera un token JWT para el usuario autenticado.
        /// </summary>
        /// <param name="user">El usuario autenticado.</param>
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

        /// <summary>
        /// Genera un hash seguro a partir de una contraseña y una sal.
        /// </summary>
        /// <param name="password">La contraseña del usuario.</param>
        /// <param name="salt">Una cadena de sal única.</param>
        /// <returns>Una cadena hash generada a partir de la contraseña y la sal.</returns>
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

        /// <summary>
        /// Verifica si la contraseña proporcionada coincide con el hash almacenado.
        /// </summary>
        /// <param name="password">La contraseña proporcionada por el usuario.</param>
        /// <param name="storedHash">El hash de la contraseña almacenado en la base de datos.</param>
        /// <param name="storedSalt">La sal utilizada para generar el hash almacenado.</param>
        /// <returns>Un valor booleano que indica si la verificación fue exitosa o no.</returns>
        private bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var hash = HashPassword(password, storedSalt);
            return hash == storedHash;
        }
    }
}
