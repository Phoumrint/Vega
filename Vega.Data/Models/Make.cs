using System.Collections.Generic;

namespace Vega.Data.Models {
    public class Make: KeyValue {
        public IList<KeyValue> Models { get; set; }

        public Make() {
            Models = new List<KeyValue>();
        }
    }
}