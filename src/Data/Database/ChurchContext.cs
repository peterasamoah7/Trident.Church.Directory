 using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Data.Database
{
    /// <summary>
    /// Church Database
    /// </summary>
    public class ChurchContext : DbContext
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="options"></param>
        public ChurchContext(DbContextOptions<ChurchContext> options) : base(options)
        {
        }

        /// <summary>
        /// Parishes table
        /// </summary>
        public DbSet<Parish> Parishes { get; set; }

        /// <summary>
        /// Parishioners table
        /// </summary>
        public DbSet<Parishioner> Parishioners { get; set; }

        /// <summary>
        /// Church Groups table
        /// </summary>
        public DbSet<ParishGroup> ParishGroups { get; set; }

        /// <summary>
        /// Audit Table
        /// </summary>
        public DbSet<Audit> Audits { get; set; }

        /// <summary>
        /// Church Sacraments
        /// </summary>
        public DbSet<Sacrament> Sacraments { get; set; }

        /// <summary>
        /// Application Users
        /// </summary>
        public DbSet<ApplicationUser> Users { get; set; }

        /// <summary>
        /// Model creating
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parishioner>()
                .HasMany(x => x.ParishGroups)
                .WithMany(x => x.Parishioners)
                .UsingEntity<ParishionerParishGroup>(
                    x => x
                        .HasOne(x => x.ParishGroup)
                        .WithMany(x => x.ParishionerParishGroups)
                        .HasForeignKey(x => x.ParishGroupId)
                        .OnDelete(DeleteBehavior.NoAction),
                    x => x
                        .HasOne(x => x.Parishioner)
                        .WithMany(x => x.ParishionerParishGroups)
                        .HasForeignKey(x => x.ParishionerId)
                        .OnDelete(DeleteBehavior.NoAction),
                    x =>
                    {
                        x.HasKey(k => new { k.ParishionerId, k.ParishGroupId });
                    });

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }

        /// <summary>
        /// Save changes
        /// </summary>
        /// <returns></returns>
        public override int SaveChanges()
        {
            return SaveChangesAsync().GetAwaiter().GetResult();
        }

        /// <summary>
        /// Save changes
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseEntity && (e.State == EntityState.Modified || e.State == EntityState.Added));

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Modified)
                    ((BaseEntity)entry.Entity).UpdatedOn = DateTime.Now;

                if (entry.State == EntityState.Added)
                    ((BaseEntity)entry.Entity).CreatedOn = DateTime.Now;
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
