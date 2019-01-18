using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Message
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }

        [DataType (DataType.DateTime)]
        public DateTime DateTime { get; set; }

        public string UserName { get; set; }

        public string Text { get; set; }

        public Guid GroupID { get; set; }
        public Group Group { get; set; }
    }
}