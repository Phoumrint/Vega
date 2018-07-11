using Microsoft.EntityFrameworkCore;
using Vega.Data.Entities;

namespace Vega.Data {
    public class DataContext: DbContext  {
        /// <summary>
        /// Table of makes for cars
        /// </summary>
        public DbSet<MakeEntity> Makes { get; set; }

        /// <summary>
        /// Table of car models
        /// </summary>
        public DbSet<ModelEntity> Models { get; set; }

        /// <summary>
        /// Table of car features
        /// </summary>
        public DbSet<FeatureEntity> Features { get; set; }

        /// <summary>
        /// Table of vehicles
        /// </summary>
        public DbSet<VehicleEntity> Vehicles { get; set; }

        /// <summary>
        /// Table of contacts
        /// </summary>
        public DbSet<ContactEntity> Contacts { get; set; }

        public DataContext(DbContextOptions options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) => modelBuilder.Entity<VehicleFeatureEntity>()
                .HasKey(vf => new { vf.VehicleId, vf.FeatureId });
    }
}