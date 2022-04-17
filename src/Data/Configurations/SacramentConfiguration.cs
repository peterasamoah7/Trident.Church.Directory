using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class SacramentConfiguration : IEntityTypeConfiguration<Sacrament>
    {
        public void Configure(EntityTypeBuilder<Sacrament> builder)
        {
            builder.Property(x => x.Type).IsRequired();

            builder.HasOne(x => x.Parishioner)
                .WithMany(x => x.Sacraments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Parish)
                .WithMany(x => x.Sacraments)
                .HasForeignKey(x => x.ParishId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
