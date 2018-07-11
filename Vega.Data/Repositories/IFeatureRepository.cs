using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public interface IFeatureRepository {
        Task<IList<KeyValue>> GetFeatures();
    }
}
