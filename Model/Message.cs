using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Message
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime PostedAt { get; set; }
        [Required]
        public Guid UserID { get; set; }
        public User User { get; set; }
        [Required]
        public string Content { get; set; }
        public Guid RoomID { get; set; }
        public Room Room { get; set; }
        public List<File> Files { get; set; }

        public Message()
        {
            Files = new List<File>();
        }
    }

    public class ViewMessage
    {
        public Guid ID { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime PostedAt { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public List<FileView> Files { get; set; }

        public ViewMessage()
        {
            Files = new List<FileView>();
        }
    }
}