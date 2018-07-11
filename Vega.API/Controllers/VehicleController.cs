using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vega.Data.Models;
using Vega.Data.Repositories;

namespace Vega.API.Controllers
{
    [Route("api/vehicles")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        IVehicleRepository _repository;

        public VehicleController(IVehicleRepository repository) {
            _repository = repository;
        }

        // GET api/vehicles
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _repository.GetAllAsync());
        }

        // GET api/vehicles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var vehicle = await _repository.GetAsync(id);
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
        }

        // POST api/vehicles
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SaveVehicle vehicle)
        {
            var vehicleResult = await _repository.AddAsync(vehicle);
            return Ok(vehicleResult);
        }

        // PUT api/vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveVehicle vehicle)
        {
            var vehicleResult = await _repository.UpdateAsync(id, vehicle);
            if (vehicleResult == null)
                return NotFound();
            return Ok(vehicleResult);
        }

        // DELETE api/vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (result == 0)
                return NotFound();
            return Ok(result);
        }

    }
}
