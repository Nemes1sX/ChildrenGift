using AutoMapper;
using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.Entities;

namespace ChildrenGift.Infrastructure
{
    public class MappingProfile : Profile
    { 
        public MappingProfile()
        {
            CreateMap<Child, ChildDto>();
            CreateMap<Gift, GiftDto>();
        }
    }
}
