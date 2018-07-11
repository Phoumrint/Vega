using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vega.Data.Models;
using Vega.Data.Repositories;

namespace Vega.API.Controllers
{
    [Route("api/makes")]
    [ApiController]
    public class MakeController : ControllerBase
    {
        IMakeRepository _repository;

        public MakeController(IMakeRepository repository) {
            _repository = repository;
        }

        // GET api/makes
        [HttpGet]
        public async Task<ActionResult<IList<Make>>> Get()
        {
            return Ok(await _repository.GetMakes());
        }

    /*  // GET api/makes/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/makes
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/makes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/makes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    */    
    }
}
