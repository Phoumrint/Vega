using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public interface IVehicleRepository {
        Task<IList<Vehicle>> GetAllAsync();

        Task<Vehicle> GetAsync(int id);

        Task<Vehicle> AddAsync(SaveVehicle vehicle);

        Task<Vehicle> UpdateAsync(int id, SaveVehicle vehicle);

        Task<int> DeleteAsync(int id);
    }
}
