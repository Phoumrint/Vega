using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vega.Data.Models;
using Vega.Data.Repositories;

namespace Vega.API.Controllers
{
    [Route("api/features")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        IFeatureRepository _repository;

        public FeatureController(IFeatureRepository repository) {
            _repository = repository;
        }

        // GET api/features
        [HttpGet]
        public async Task<ActionResult<IList<KeyValue>>> Get()
        {
            return Ok(await _repository.GetFeatures());
        }

    /*  // GET api/features/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/features
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/features/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/features/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    */    
    }
}
