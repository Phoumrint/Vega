using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Vega.Data.Entities;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public class VehicleRepository : IVehicleRepository {

        DataContext _context;
        IMapper _mapper;

        public VehicleRepository(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        async public Task<IList<Vehicle>> GetAllAsync()
        {
            var vehicleEntities = await GetVehicles().ToListAsync();
            return _mapper.Map<List<VehicleEntity>, List<Vehicle>>(vehicleEntities);
        }

        async public Task<Vehicle> GetAsync(int id)
        {
            var vehicleDb = await GetVehicles().FirstOrDefaultAsync(v => v.Id == id);
            if (vehicleDb == null)
                return null;
            return _mapper.Map<VehicleEntity, Vehicle>(vehicleDb);
        }

        async public Task<Vehicle> AddAsync(SaveVehicle vehicle)
        {
            var vehicleDb = _mapper.Map<SaveVehicle, VehicleEntity>(vehicle);
            vehicleDb.LastUpdated  = DateTime.Now;

            await _context.Vehicles.AddAsync(vehicleDb);
            await _context.SaveChangesAsync();

            var vehicleResult = await GetAsync(vehicleDb.Id);
            return vehicleResult;
        }

        async public Task<Vehicle> UpdateAsync(int id, SaveVehicle vehicle)
        {
            var vehicleDb = await _context.Vehicles
                .Include(v => v.VehicleFeatures)
                .SingleOrDefaultAsync(v => v.Id == id);
            if (vehicleDb == null)
                return null;
            _mapper.Map<SaveVehicle, VehicleEntity>(vehicle, vehicleDb);
            vehicleDb.LastUpdated = DateTime.Now;
            await _context.SaveChangesAsync();
            return await GetAsync(id);
        }

        async public Task<int> DeleteAsync(int id)
        {
            var vehicleDb = await _context.Vehicles
                .FirstOrDefaultAsync(v => v.Id == id);
            if (vehicleDb != null) {
                _context.Vehicles.Remove(vehicleDb);
                await _context.SaveChangesAsync();
                return id;
            }
            return 0;
        }

        IIncludableQueryable<VehicleEntity, ContactEntity> GetVehicles() {
            var vehicles = _context.Vehicles
                .Include(v => v.Make)
                .Include(v => v.Model)
                .Include(v => v.VehicleFeatures)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Contact);

            return vehicles;
        }
    }
}
