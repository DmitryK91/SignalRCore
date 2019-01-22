using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
    public class User {
        [Key, DatabaseGenerated (DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Agent { get; set; }
        public List<Message> Messages { get; set; }

        public User()
        {
            Messages = new List<Message>();
        }
    }
}