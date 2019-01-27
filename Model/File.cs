using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class File
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ID { get; set; }
        [Required]
        public string Path { get; set; }
        public string Name { get; set; }
        public Message Message { get; set; }
        public Guid? MessageID { get; set; }
    }

    public class FileView
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
    }
}