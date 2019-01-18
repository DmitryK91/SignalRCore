using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace testChat.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {
        private readonly IGroupsRepository _groupsManager;

        public ChatController(IGroupsRepository groupsManager)
        {
            _groupsManager = groupsManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var groups = await _groupsManager.GetGroupsAsync();

            return Ok(groups);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Group group)
        {
            var result = await _groupsManager.AddAsync(group);
            return result.State ? (IActionResult)Ok() : BadRequest(result.Error);
        }
    }
}
