using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Vega.Data.Entities;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public class MakeRepository: IMakeRepository {

        DataContext _context;
        IMapper _mapper;

        public MakeRepository(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<Make>> GetMakes() {
            var makeEntities = await _context.Makes.Include(make => make.Models).ToListAsync();

            return _mapper.Map<List<MakeEntity>, List<Make>>(makeEntities);
        }
    }
}
