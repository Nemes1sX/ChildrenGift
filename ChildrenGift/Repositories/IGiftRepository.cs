using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.FormRequest;
using System.Threading.Tasks;

namespace ChildrenGift.Repositories
{
    public interface IGiftRepository
    {
        Task<List<GiftDto>> ChildGifts(int childId);
        Task<GiftDto> GetGift(int id);
        Task<GiftDto> AddGift(GiftFormRequest giftFormRequest);
        Task<GiftDto> UpdateGift(GiftFormRequest giftFormRequest, int id);
        Task<int> DeleteGift(int id);
    }
}
