using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace testChat.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUsersRepository _userRepository;

        public UserController(IUsersRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> Get(string userName)
        {
            if (userName == string.Empty || userName == "null")
            {
                return NotFound();
            }

            var u = await _userRepository.GetUserAsync(userName, Request.Headers["User-Agent"].ToString());

            if (u != null)
                return Ok(u);

            u = new User
            {
                Name = userName,
                Agent = Request.Headers["User-Agent"].ToString()
            };

            var result = await _userRepository.AddAsync(u);

            return result.State ? (IActionResult)Ok(u) : BadRequest(result.Error);
        }
    }
}