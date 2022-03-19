using AutoMapper;
using Core.Models;
using Data.Entities;

namespace Core.MappingProfile
{
    public static class ParishMapping
    {
        public static ParishViewModel MapDto(Parish parish)
        {
            var model = new ParishViewModel
            {
                Id = parish.Id,
                Name = parish.Name,
                Location = parish.Location,
                Address = parish.Address,
                PostCode = parish.PostCode,
            };

            return model;
        }

        public static Parish MapEntity(ParishViewModel parish)
        {
            var model = new Parish
            {
                Name = parish.Name,
                Location = parish.Location,
                Address = parish.Address,
                PostCode = parish.PostCode,
            };

            return model;
        }
    }
}
