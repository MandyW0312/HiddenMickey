using System.ComponentModel.DataAnnotations;

namespace HiddenMickey.Models
{
    public class HiddenMickey
    {
        public int Id { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string Clue { get; set; }
        [Required]
        public string Hint { get; set; }
    }
}