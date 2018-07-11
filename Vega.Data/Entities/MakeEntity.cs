using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vega.Data.Entities {
    [Table("Makes")]
    public class MakeEntity : EntityBase {
        public IList<ModelEntity> Models { get; set; }

        public MakeEntity() {
        Models = new List<ModelEntity>();
        }
    }        
}

