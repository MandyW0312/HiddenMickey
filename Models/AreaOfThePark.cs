using System.ComponentModel.DataAnnotations;

namespace HiddenMickey.Models
{
    public class AreaOfThePark
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        
        public int ParkId { get; set; }
        
        
    }
}