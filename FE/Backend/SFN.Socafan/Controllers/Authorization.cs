using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using SFN.Socafan.API.Requests;
using SFN.Socafan.Common.Models;
using SFN.Socafan.Database;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SFN.Socafan.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Authorization : ControllerBase
    {
        private readonly AuthorizationDataAccess mAuthorizationDataAccess;

        public Authorization(AuthorizationDataAccess authorizationDataAccess)
        {
            mAuthorizationDataAccess = authorizationDataAccess;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Invalid client request");
            }

            var user = mAuthorizationDataAccess.RetrieveUserByUsername(loginDto.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized("Invalid credentials");
            }

            var tokenString = GenerateJwtToken(user);

            return Ok(new { Token = tokenString, UserId = user.IdUser, Role = user.UserLevel });
            //var login = mAuthorizationDataAccess.RetriveUser(1);

            //if (!login.Succesfull)
            //{
            //    return BadRequest("User not registered");
            //}
            //return Ok();
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDTO signUpDto)
        {
            if (mAuthorizationDataAccess.RetriveUsers().Any(u => u.UserName == signUpDto.UserName))
            {
                return BadRequest("Username already exists.");
            }

            var user = new User
            {
                Name = signUpDto.UserName,
                CellPhoneNumber = signUpDto.CellPhoneNumber,
                Answers = [],
                UserName = signUpDto.UserName,
                Password = BCrypt.Net.BCrypt.HashPassword(signUpDto.Password),
                Email = signUpDto.Email,
                // Default role
            };

            mAuthorizationDataAccess.UpdateUser(user, Common.Models.Enum.MessageAction.Add);


            return Ok("User registered successfully.");
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mM2+z$e0:+MS>?8zy^VDIUB+9Lh%:w]br03QoRDNhUdzW;*$X\"AuxU6'=u,G$_b"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience: "yourdomain.com",
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("Update")]
        public IActionResult Update(UserUpdateRequest request)
        {
            if (request == null)
            {
                return BadRequest("request cannot be null");
            }


            var updateResult = mAuthorizationDataAccess.UpdateUser(request.user, request.action);

            if (!updateResult.Succesfull)
            {
                return BadRequest("User not updated");
            }
            return Ok();
        }
    }
}
