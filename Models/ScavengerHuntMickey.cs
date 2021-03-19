namespace HiddenMickey.Models
{
    public class ScavengerHuntMickey
    {
        public int Id { get; set; }
        
        public int ScavengerHuntId { get; set; }
        
        public int HiddenMickeyId { get; set; }

        public HiddenMickey HiddenMickey {get; set;}
        
        
    }
}