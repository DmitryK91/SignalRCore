using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
    public class Message {
        [Key, DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }

        [DataType (DataType.DateTime)]
        public DateTime PostedAt { get; set; }
        [Required]
        public Guid UserID { get; set; }
        public User User { get; set; }
        [Required]
        public string Content { get; set; }
        public Guid GroupID { get; set; }
        public Room Room { get; set; }
    }

    public class ViewMessage{
        [DataType (DataType.DateTime)]
        //[DisplayFormat (DataFormatString = "{ddd, dd-MM HH:mm}", ApplyFormatInEditMode = true)]
        public DateTime PostedAt { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
    }
}