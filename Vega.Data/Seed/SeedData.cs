using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Vega.Data.Entities;

namespace Vega.Data.Seed
{
    public static class SeedData
    {
        static IList<MakeEntity> _makes = new List<MakeEntity>() {
            CreateMake("Acura", new List<ModelEntity> {
                CreateModel("ILX"),
                CreateModel("NSX"),
                CreateModel("RLX"),
                CreateModel("RLX Hybrid"),
                CreateModel("TLX"),                                 
                CreateModel("MDX"),                                 
                CreateModel("MDX Hybrid"),                                 
                CreateModel("RDX")                                 
            }),
            CreateMake("Honda", new List<ModelEntity> {
                CreateModel("Accord"),
                CreateModel("Accord Hybrid"),                
                CreateModel("CR-Z"),
                CreateModel("Civic"),
                CreateModel("Clarity"),
                CreateModel("CR-V"),
                CreateModel("Odyssey"),
                CreateModel("Pilot")
            }),
            CreateMake("Lexus", new List<ModelEntity> {
                CreateModel("CT 200h"),
                CreateModel("ES 300h"),
                CreateModel("ES 350"),
                CreateModel("GS 200t"),
                CreateModel("GS 300"),
                CreateModel("GS 350"),
                CreateModel("GS 450h"),
                CreateModel("IS 200t"),
                CreateModel("IS 300"),
                CreateModel("IS 350"),
                CreateModel("LC 500"),
                CreateModel("GX 460"),
                CreateModel("LX 570"),
                CreateModel("NX 200t"),
                CreateModel("NX 300"),
                CreateModel("RX 350"),
                CreateModel("RX 450h")

             }),
            CreateMake("Toyota", new List<ModelEntity> {
                CreateModel("Avalon"),
                CreateModel("Avalon Hybrid"),
                CreateModel("Camry"),
                CreateModel("Camry Hybrid"),
                CreateModel("Corolla"),
                CreateModel("Prius"),
                CreateModel("4Runner"),
                CreateModel("Highlander"),
                CreateModel("Highlander Hybrid"),
                CreateModel("Land Cruiser"),
                CreateModel("Sienna")
            })
        };

        static IList<FeatureEntity> _features = new List<FeatureEntity>() {
            CreateFeature("Security system"),
            CreateFeature("Traction control"),
            CreateFeature("Forward collision mitigation"),
            CreateFeature("Brake assist"),
            CreateFeature("Remote keyless entry"),
            CreateFeature("Power door locks"),
            CreateFeature("Distance pacing cruise control"),
            CreateFeature("Integrated key/remote"),
            CreateFeature("Voice activated air conditioning"),
            CreateFeature("Garage door transmitter"),
            CreateFeature("Front dual zone A/C"),
            CreateFeature("Navigation system with voice activation"),
            CreateFeature("Rear air conditioning"),
            CreateFeature("Automatic temperature control"),
            CreateFeature("Navigation system"),
            CreateFeature("Cruise control"),
            CreateFeature("Rear air conditioning with separate controls"),
            CreateFeature("Air conditioning"),
            CreateFeature("Remote keyless entry"),
            CreateFeature("USB ports"),
            CreateFeature("12V DC power outlet"),
            CreateFeature("Power windows"),
            CreateFeature("Memory seats"),
            CreateFeature("Remote engine start"),
            CreateFeature("Steering-wheel mounted audio controls"),
            CreateFeature("Primary monitor touchscreen"),
            CreateFeature("Wireless phone connectivity"),
            CreateFeature("Premium speakers"),
            CreateFeature("Camera Rear"),
            CreateFeature("Tire pressure sensors"),
            CreateFeature("Blind spot sensor"),
            CreateFeature("Front and rear parking sensors")
        };

        public static void SeedDatabase(DataContext context) {
            context.Database.Migrate();
            PopulateMakes(context);
            PopulateFeatures(context);
        }

        public static void PopulateMakes(DataContext context) {
        if (context.Makes.Count() == 0) {
                context.Makes.AddRange(_makes);
                context.SaveChanges();
            }
        }

        public static void PopulateFeatures(DataContext context) {
            if (context.Features.Count() == 0) {
                context.Features.AddRange(_features);
                context.SaveChanges();
            }
        }

        static FeatureEntity CreateFeature(string feature) {
            return new FeatureEntity {
                Name = feature
            };
        }

        static MakeEntity CreateMake(string make, IList<ModelEntity> models) {
            return new MakeEntity {
                Name = make,
                Models = models
            };
        }

        static ModelEntity CreateModel(string model) {
            return new ModelEntity {
                Name = model
            };
        }
    }
}