using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace testChat.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMessagesRepository _messageManager;
        private readonly IRoomsRepository _groupManager;
        private readonly IUsersRepository _usersManager;
        public int UsersOnline;

        public ChatHub(IMessagesRepository messageManager, IRoomsRepository groupManager, IUsersRepository usersManager)
        {
            _messageManager = messageManager;
            _groupManager = groupManager;
            _usersManager = usersManager;
        }

        public async Task SendMessage(Guid roomId, Guid userId, string message)
        {
            var res = await _messageManager.AddMessageAsync(roomId, userId, message);
            if(!res.State) return;

            var userName = await _usersManager.GetNameByIDAsync(userId);
            var m = (Message)res.Data;

            await Clients.All.SendAsync("ReceiveMessage", userName, message, roomId, m.PostedAt);
        }

        public async Task AddChatRoom(string roomName)
        {
            Room chatRoom = new Room()
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