using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace testChat.Controllers
{
    [Route("api/[controller]")]
    public class RoomController : Controller
    {
        private readonly IRoomsRepository _roomsManager;

        public RoomController(IRoomsRepository roomsManager)
        {
            _roomsManager = roomsManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var rooms = await _roomsManager.GetRoomsAsync();

            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Room room)
        {
            var result = await _roomsManager.AddAsync(room);
            return result.State ? (IActionResult)Ok() : BadRequest(result.Error);
        }
    }
}
