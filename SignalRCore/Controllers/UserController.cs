using System;
using System.Collections.Generic;
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

        [HttpGet("{ChatID}")]
        public async Task<IActionResult> Get(Guid ChatID)
        {
            if (ChatID == Guid.Empty)
            {
                return NotFound();
            }

            var messagesForRoom = await _messageRepository.GetMessages(ChatID);

            return Ok(messagesForRoom);
        }

        [HttpPost]
        public async void Post([FromBody] User user)
        {
            await _userRepository.AddAsync(user);
        }
    }
}
