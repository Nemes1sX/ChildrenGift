using AutoMapper;
using ChildrenGift.DatContext;
using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.Entities;
using ChildrenGift.Models.FormRequest;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChildrenGift.Repositories
{
    public class ChildrenRepository : IChildrenRepository
    {
        private readonly ChildGiftContext _context;
        private readonly IMapper _mapper;

        public ChildrenRepository(ChildGiftContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ChildDto>> GetChildren()
        {
            var children = await _context.Children.Include(x => x.Gifts).ToListAsync();

            return _mapper.Map<List<ChildDto>>(children); 
        }

        public async Task<ChildDto> GetChild(int id)
        {
            var child = await _context.Children.FindAsync(id);

            return _mapper.Map<ChildDto>(child);
        }

        public async Task<ChildDto> AddChild(ChildFormRequest childFormRequest)
        {
            var child = new Child();
            child.FirstName = childFormRequest.FirstName;
            child.LastName = childFormRequest.LastName;

            await _context.AddAsync(child);
            await _context.SaveChangesAsync();

            return _mapper.Map<ChildDto>(child);
        }

        public async Task<ChildDto> UpdateChild(ChildFormRequest childFormRequest, int id)
        {
            var child = await _context.Children.FindAsync(id);

            if (child == null)
            {
                return null;
            }

            child.FirstName = childFormRequest.FirstName;
            child.LastName = childFormRequest.LastName;

            await _context.SaveChangesAsync();

            return _mapper.Map<ChildDto>(child);
        }

        public async Task<int> DeleteChild(int id)
        {
            var child = await _context.Children.FindAsync(id);

            if (child == null)
            {
                return 0;
            }

            _context.Children.Remove(child);
            await _context.SaveChangesAsync();

            return id;
        }
       
        
    }
}
