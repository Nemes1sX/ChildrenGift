using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.FormRequest;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChildrenGift.Repositories
{
    public interface IChildrenRepository
    {
        Task<List<ChildDto>> GetChildren();
        Task<ChildDto> GetChild(int id);
        Task<ChildDto> AddChild(ChildFormRequest childFormRequest);
        Task<ChildDto> UpdateChild(ChildFormRequest childFormRequest, int id);
        Task<int> DeleteChild(int id);
    }
}
