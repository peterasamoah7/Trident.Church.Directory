using Core.Models;
using Data.Entities;

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
                CreatedOn = sacrament.CreatedOn,
                UpdatedOn = sacrament.UpdatedOn
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
