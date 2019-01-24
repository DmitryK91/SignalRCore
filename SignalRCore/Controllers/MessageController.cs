using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace testChat.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessagesRepository _messageRepository;

        public MessageController(IMessagesRepository messageRepository)
        {
            _messageRepository = messageRepository;
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
        public async Task<IActionResult> Post([FromForm] IFormFile file)
        {
            return Ok(file.FileName);
        }
    }
}
