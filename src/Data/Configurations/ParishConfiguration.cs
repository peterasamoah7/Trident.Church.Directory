using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class ParishConfiguration : IEntityTypeConfiguration<Parish>
    {
        public void Configure(EntityTypeBuilder<Parish> builder)
        { 
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Location).IsRequired();

            builder.HasMany(x => x.ChurchGroups)
                .WithOne(x => x.Parish)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasMany(x => x.Parishioners)
                .WithOne(x => x.Parish)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasMany(x => x.Sacraments)
                .WithOne(x => x.Parish)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
