using AutoMapper;
using ChildrenGift.DatContext;
using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.Entities;
using ChildrenGift.Models.FormRequest;
using Microsoft.EntityFrameworkCore;

namespace ChildrenGift.Repositories
{
    public class GiftRepository : IGiftRepository
    {
        private readonly ChildGiftContext _context;
        private readonly IMapper _mapper;

        public GiftRepository(ChildGiftContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GiftDto>> ChildGifts(int childId)
        {
            var childGifts = await _context.Gifts.Where(x => x.ChildId == childId).ToListAsync();

            return _mapper.Map<List<GiftDto>>(childGifts);
        }

        public async Task<GiftDto> GetGift(int id)
        {
            var gift = await _context.Gifts.FindAsync(id);

             if (gift == null)
            {
                return null;
            }

            return _mapper.Map<GiftDto>(gift);
        }

        public async Task<GiftDto> AddGift(GiftFormRequest giftFormRequest)
        {
            var gift = new Gift();
            gift.Name = giftFormRequest.Name;
            gift.ChildId = giftFormRequest.ChildId;
            
            await _context.Gifts.AddAsync(gift);
            await _context.SaveChangesAsync();

            return _mapper.Map<GiftDto>(gift);
        }

        public async Task<GiftDto> UpdateGift(GiftFormRequest giftFormRequest, int id)
        {
            var gift = await _context.Gifts.FindAsync(id);

            if (gift == null)
            {
                return null;
            }

            gift.Name = giftFormRequest.Name;
            gift.ChildId= giftFormRequest.ChildId;

            await _context.SaveChangesAsync();

            return _mapper.Map<GiftDto>(gift); 
        }

        public async Task<int> DeleteGift(int id)
        {
            var gift = await _context.Gifts.FindAsync(id);

            if (gift == null)
            {
                return 0;
            }

            _context.Gifts.Remove(gift);
            await _context.SaveChangesAsync();

            return id;
        }

    }
}
