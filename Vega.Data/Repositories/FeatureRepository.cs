using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Vega.Data.Entities;
using Vega.Data.Models;

namespace Vega.Data.Repositories {
    public class FeatureRepository: IFeatureRepository {

        private DataContext _context;
        private IMapper _mapper;

        public FeatureRepository(DataContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IList<KeyValue>> GetFeatures() {
            var featureEntities = await _context.Features.OrderBy(f => f.Name).ToListAsync();

            return _mapper.Map<List<FeatureEntity>, List<KeyValue>>(featureEntities);
        }
    }
}
