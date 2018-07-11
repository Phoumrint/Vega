using System.Linq;
using AutoMapper;
using Vega.Data.Entities;
using Vega.Data.Models;

namespace Vega.Data.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            // Entity to model
            CreateMap<MakeEntity, Make>();
            CreateMap<MakeEntity, KeyValue>();
            CreateMap<ModelEntity, KeyValue>();
            CreateMap<FeatureEntity, KeyValue>();
            CreateMap<VehicleEntity, Vehicle>()
                .ForMember(v => v.Features, opt => opt
                    .MapFrom(e => e.VehicleFeatures
                        .Select(vf => vf.Feature)));
            
            // Model to entity
            CreateMap<Contact, ContactEntity>();
            CreateMap<SaveVehicle, VehicleEntity>()
                .ForMember(e => e.Id, opt => opt.Ignore())
                .ForMember(e => e.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((v, e) => {
                    var removeList = e.VehicleFeatures.Where(vf => !v.FeatureIds.Contains(vf.FeatureId)).ToList();
                    removeList.ForEach(vf => e.VehicleFeatures.Remove(vf));
                    var addList = v.FeatureIds.Where(id => !e.VehicleFeatures.Any(vf => vf.FeatureId == id)).ToList();
                    addList.ForEach(id => e.VehicleFeatures.Add(new VehicleFeatureEntity { FeatureId = id}));
                });
        }
    }
}