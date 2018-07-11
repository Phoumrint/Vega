using System;
using System.Collections.Generic;

namespace Vega.Data.Models {
    public class SaveVehicle {
        public int Id { get; set; }

        public int MakeId { get; set; }

        public int ModelId { get; set; }

        public bool Registered { get; set; }

        public IList<int> FeatureIds { get; set; }

        public Contact Contact { get; private set; }

        public SaveVehicle() {
            FeatureIds = new List<int>();
            Contact = new Contact();
        }
    }
}