using System;
using System.Collections.Generic;

namespace Vega.Data.Models {
    public class Vehicle {
        public int Id { get; set; }

        public KeyValue Make { get; set; }

        public KeyValue Model { get; set; }

        public bool Registered { get; set; }

        public IList<KeyValue> Features { get; set; }

        public Contact Contact { get; private set; }

        public Vehicle() {
            Features = new List<KeyValue>();
            Contact = new Contact();
        }
    }
}