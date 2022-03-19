using Core.Models;
using Data.Entities;

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
                DateOfBirth = parishioner.DateOfBirth,
                Type = parishioner.Type,
                Location = parishioner.Location,
                PhoneNumber = parishioner.PhoneNumber,
                Email = parishioner.Email,
                HomeAddress = parishioner.HomeAddress,
                PostCode = parishioner.PostCode,
                Occupation = parishioner.Occupation
            };

            return model;
        }

        public static Parishioner MapEntity(ParishionerViewModel parishioner)
        {
            var model = new Parishioner
            {
                FirstName = parishioner.FirstName,
                LastName = parishioner.LastName,
                DateOfBirth = parishioner.DateOfBirth,
                Type = parishioner.Type,
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
