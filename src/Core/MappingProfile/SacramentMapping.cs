using Core.Models;
using Data.Entities;
using Core.Extensions;

namespace Core.MappingProfile
{
    public static class SacramentMapping
    {
        public static SacramentViewModel MapDto(Sacrament sacrament)
        {
            var model = new SacramentViewModel
            {
                Id = sacrament.Id,
                Type = sacrament.Type,
                CreatedOn = sacrament.PeformedOn.ToFullDate(),
                UpdatedOn = sacrament.UpdatedOn.HasValue ? 
                        sacrament.UpdatedOn.Value.ToFullDate() : null
            };

            return model;
        }

        public static Sacrament MapEntity(SacramentViewModel sacrament)
        {
            var model = new Sacrament
            {
                Id = sacrament.Id,
                Type = sacrament.Type
            };

            return model;
        }
    }
}
