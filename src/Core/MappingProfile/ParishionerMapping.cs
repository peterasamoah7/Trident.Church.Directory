using Core.Models;
using Data.Entities;
using Data.Models;
using Core.Extensions;

namespace Core.MappingProfile
{
    public static class ParishionerMapping
    {
        public static ParishionerViewModel MapDto(Parishioner parishioner)
        {
            var model = new ParishionerViewModel
            {
                Id = parishioner.Id,
                FirstName = parishioner.FirstName,
                LastName = parishioner.LastName,
                DateOfBirth = parishioner.DateOfBirth.HasValue ? 
                    parishioner.DateOfBirth.Value.ToFullDate() : null,
                Type = parishioner.Type,
                Location = parishioner.Location,
                PhoneNumber = parishioner.PhoneNumber,
                Email = parishioner.Email,
                HomeAddress = parishioner.HomeAddress,
                PostCode = parishioner.PostCode,
                Occupation = parishioner.Occupation,
                CreatedOn = parishioner.CreatedOn.ToFullDate(),
            };

            return model;
        }

        public static Parishioner MapEntity(ParishionerViewModel parishioner)
        {
            var model = new Parishioner
            {
                Id= parishioner.Id,
                FirstName = parishioner.FirstName,
                LastName = parishioner.LastName,
                DateOfBirth = parishioner.DateOfBirth.ToDateTime(),
                Type = ParishionerType.Member,
                Location = parishioner.Location,
                PhoneNumber = parishioner.PhoneNumber,
                Email = parishioner.Email,
                HomeAddress = parishioner.HomeAddress,
                PostCode = parishioner.PostCode,
                Occupation = parishioner.Occupation
            };

            return model;
        }
    }
}
