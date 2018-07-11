using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vega.Data.Entities {
    [Table("Vehicles")]
    public class VehicleEntity {
        public int Id { get; set; }
        
        [Required]
        public int MakeId { get; set; }

        public MakeEntity Make { get; set; }

        [Required]
        public int ModelId { get; set; }

        public ModelEntity Model { get; set; }

        public bool Registered { get; set; }

        public IList<VehicleFeatureEntity> VehicleFeatures { get; private set; }

        public ContactEntity Contact { get; private set; }

        public DateTime LastUpdated { get; set; }

        public VehicleEntity() {
            VehicleFeatures = new List<VehicleFeatureEntity>();
        }
    }
}

