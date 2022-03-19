using Core.Models;
using Data.Entities;

namespace Core.MappingProfile
{
    public static class ParishGroupMapping
    {
        public static ParishGroupViewModel MapDto(ParishGroup parishGroup)
        {
            var model = new ParishGroupViewModel
            {
                Id = parishGroup.Id,
                Name = parishGroup.Name,
                Active = parishGroup.Active,
                Description = parishGroup.Description
            };

            return model;
        }

        public static ParishGroup MapEntity(ParishGroupViewModel parishGroup)
        {
            var model = new ParishGroup
            {
                Id = parishGroup.Id,
                Name = parishGroup.Name,
                Active = parishGroup.Active,
                Description = parishGroup.Description
            };

            return model;
        }
    }
}
