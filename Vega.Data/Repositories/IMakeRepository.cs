using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public interface IMakeRepository {
        Task<IList<Make>> GetMakes();
    }
}
