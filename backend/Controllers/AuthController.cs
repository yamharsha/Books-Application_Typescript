using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using shortid;
using shortid.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]/auth")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public static User user = new User();
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost("/register")]
        public ActionResult<string> Register(UserData request)
        {
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var options = new GenerationOptions(length: 10);
            string uniqueId = ShortId.Generate(options);

            user.Username = request.Username;
            user.UserId = uniqueId;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            string token = CreateToken(user);

            return Ok(new
            {
                userInfo = request,
                token
            });
        }
        [HttpPost("/login")]
        public ActionResult<string> LogIn(UserData request)
        {
            if (user.Username != request.Username)
            {
                return BadRequest("User not Found");
            }
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong Password");
            }

            string token = CreateToken(user);
            return Ok(new
            {
                userInfo = request,
                token
            });
        }
        [HttpGet("/auth"), Authorize]
        public ActionResult<string> GetCurrentUser()
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim("UserId" , user.UserId)
            };

            var userName = User?.Identity?.Name;
            var idOfUser = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Ok(new
            {
                userName,
                idOfUser,
            });
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier , user.UserId)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value
            ));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}