using System.ComponentModel.DataAnnotations;

namespace HiddenMickey.Models
{
    public class Park
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        
    }
}