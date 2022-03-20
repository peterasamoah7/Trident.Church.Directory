using AutoMapper;
using Core.Models;
using Data.Entities;

namespace Core.MappingProfile
{
    public class AuditProfile : Profile
    {
        public AuditProfile()
        {
            CreateMap<Audit, AuditViewModel>()
                .ForMember(x => x.Date, x => x.MapFrom(x => x.CreatedOn.ToString("MMMM dd")))
                .ReverseMap();
        }
    }
}
