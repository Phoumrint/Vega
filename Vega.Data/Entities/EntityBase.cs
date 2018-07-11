using System.ComponentModel.DataAnnotations;

namespace Vega.Data.Entities {
    public class EntityBase {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }        
}

