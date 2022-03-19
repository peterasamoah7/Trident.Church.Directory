using AutoMapper;
using Core.Models;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.MappingProfile
{

    public class BaseMappingProfile : Profile
    {
        public BaseMappingProfile()
        {
            CreateMap<Parish, ParishViewModel>().ReverseMap();
            CreateMap<Parishioner, ParishionerViewModel>().ReverseMap();
            CreateMap<Sacrament, SacramentViewModel>().ReverseMap();
            CreateMap<ParishGroup, ParishGroupViewModel>()
               .ForMember(x => x.Id, x => x.MapFrom(x => x.Id))
               .ForMember(x => x.Name, x => x.MapFrom(x => x.Name))
               .ReverseMap();
        }
    }
}
