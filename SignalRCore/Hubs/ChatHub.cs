using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using System.Linq;

namespace testChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessagesRepository _messageManager;
        private readonly IRoomsRepository _groupManager;
        private readonly IUsersRepository _usersManager;

        public ChatHub(IMessagesRepository messageManager, IRoomsRepository groupManager, IUsersRepository usersManager)
        {
            _messageManager = messageManager;
            _groupManager = groupManager;
            _usersManager = usersManager;
        }

        public async Task SendMessage(Guid roomId, Guid userId, string message, string fileID)
        {
            var res = await _messageManager.AddMessageAsync(roomId, userId, message, fileID);
            if (!res.State) return;
            
            var userName = await _usersManager.GetNameByIDAsync(userId);
            var m = (Message)res.Data;

            var files = m.Files.Select(f => new FileView
            {
                ID = f.ID,
                Name = f.Name
            }).ToList();

            await Clients.All.SendAsync("ReceiveMessage", userName, message, m.ID, roomId, m.PostedAt, files);
        }

        public async Task AddChatRoom(string roomName)
        {
            if (roomName == null || roomName == "") return;

            Room chatRoom = new Room()
            {
                Name = roomName
            };

            await _groupManager.AddAsync(chatRoom);
            await Clients.All.SendAsync("NewRoom", roomName, chatRoom.ID);
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}