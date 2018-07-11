using System.ComponentModel.DataAnnotations.Schema;

namespace Vega.Data.Entities
{
    [Table("VehicleFeatures")]
    public class VehicleFeatureEntity
    {
        public int VehicleId { get; set; }

        public int FeatureId { get; set; }

        public VehicleEntity Vehicle { get; set; }

        public FeatureEntity Feature { get; set; }
    }
}