using System.Collections.Generic;

namespace HiddenMickey.Models
{
    public class ScavengerHunt
    {
        public int Id { get; set; }
        
        public List<ScavengerHuntMickey> ScavengerHuntMickeys {get; set;}
    }
}