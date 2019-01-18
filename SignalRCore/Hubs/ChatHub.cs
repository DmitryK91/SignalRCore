using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;

namespace testChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessagesRepository _messageManager;
        private readonly IGroupsRepository _groupManager;
        public int UsersOnline;

        public ChatHub(IMessagesRepository messageManager, IGroupsRepository groupManager)
        {
            _messageManager = messageManager;
            _groupManager = groupManager;
        }

        public async Task SendMessage(Guid roomId, string user, string message)
        {
            Message m = new Message()
            {
                GroupID = roomId,
                Text = message,
                UserName = user
            };

            await _messageManager.AddMessageAsync(m);
            await Clients.All.SendAsync("ReceiveMessage", user, message, roomId, m.ID, m.UserName);
        }

        public async Task AddChatRoom(string roomName)
        {
            Group chatRoom = new Group()
            {
                Name = roomName
            };

            await _groupManager.AddAsync(chatRoom);
            await Clients.All.SendAsync("NewRoom", roomName, chatRoom.ID);
        }

        public override async Task OnConnectedAsync()
        {
            UsersOnline++;
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            UsersOnline--;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}