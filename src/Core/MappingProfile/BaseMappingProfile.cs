using AutoMapper;
using Core.Models;
using Data.Entities;

namespace Core.MappingProfile
{

    public class BaseMappingProfile : Profile
    {
        public BaseMappingProfile()
        {
            CreateMap<Parish, ParishViewModel>().ReverseMap();
            CreateMap<Parish, CreateParishModel>().ReverseMap();
            CreateMap<Parish, UpdateParishionerModel>().ReverseMap();

            CreateMap<Parishioner, ParishionerViewModel>().ReverseMap();
            CreateMap<Parishioner, CreateParishionerModel>().ReverseMap();
            CreateMap<Parishioner, UpdateParishionerModel>().ReverseMap();

            CreateMap<Sacrament, SacramentViewModel>().ReverseMap();

            CreateMap<ParishGroup, CreateParishGroupModel>().ReverseMap();
            CreateMap<ParishGroup, UpdateParishGroupModel>().ReverseMap();
            CreateMap<ParishGroup, ParishGroupViewModel>()
               .ForMember(x => x.Id, x => x.MapFrom(x => x.Id))
               .ForMember(x => x.Name, x => x.MapFrom(x => x.Name))
               .ReverseMap();
        }
    }
}
