using System;
using System.IO;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace testChat.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessagesRepository _messageRepository;

        public MessageController(IMessagesRepository messageRepository, IHostingEnvironment appEnvironment)
        {
            _messageRepository = messageRepository;
        }

        [HttpGet("{roomID}")]
        public async Task<IActionResult> Get(Guid roomID)
        {
            if (roomID == Guid.Empty)
            {
                return NotFound();
            }

            var messagesForRoom = await _messageRepository.GetMessages(roomID);

            return messagesForRoom.Count > 0 ? (IActionResult)Ok(messagesForRoom) : NotFound();
        }

        [HttpPost("{userID}")]
        public async Task<IActionResult> Post([FromForm] IFormFile file, Guid userID)
        {
            var res = await _messageRepository.AddFileAsync(file, userID);

            if (!res.State) return BadRequest(res.Error);
            
            return Ok(res.Data.ToString());
        }
        
        [HttpGet("[action]/{fileID}")]
        public async Task<IActionResult> DownloadFile(Guid fileID)
        {
            try
            {
                var file = await _messageRepository.GetFileAsync(fileID);
                if (file == null) throw new FileNotFoundException();

                string path = Path.Combine(Environment.CurrentDirectory, file.Path);
                if (!System.IO.File.Exists(path)) throw new FileNotFoundException();

                byte[] mas = System.IO.File.ReadAllBytes(path);

                return File(mas, "application/octet-stream", file.Name);
            }
            catch (FileNotFoundException) { return NotFound(); }
            catch (Exception) { return BadRequest(); }
        }
    }
}
