using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class ParishGroupConfiguration : IEntityTypeConfiguration<ParishGroup>
    {
        public void Configure(EntityTypeBuilder<ParishGroup> builder)
        {
            builder.Property(p => p.Name).IsRequired();
            builder.Property(p => p.Description).IsRequired();

            builder.HasOne(p => p.Parish)
                .WithMany(p => p.ChurchGroups)
                .HasForeignKey(p => p.ParishId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
