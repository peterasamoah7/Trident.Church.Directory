using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class ParishionerConfiguration : IEntityTypeConfiguration<Parishioner>
    {
        public void Configure(EntityTypeBuilder<Parishioner> builder)
        {
            builder.Property(x => x.FirstName).IsRequired();
            builder.Property(x => x.LastName).IsRequired();

            builder.HasOne(x => x.Parish)
                .WithMany(x => x.Parishioners);

            builder.HasMany(x => x.Sacraments)
                .WithOne(x => x.Parishioner)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
