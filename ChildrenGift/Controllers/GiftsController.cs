using ChildrenGift.Models.FormRequest;
using ChildrenGift.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenGift.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        private readonly IGiftRepository _giftRepository;

        public GiftsController (IGiftRepository giftRepository)
        {
            _giftRepository = giftRepository;
        }

        // GET: api/<GiftController>/childgift?id=6
        [Route("childgift")]
        public async Task<ActionResult> ChildGifts(int childId)
        {
            var childGifts = await _giftRepository.ChildGifts(childId);

            return Ok(childGifts);
        }


        // GET: api/<GiftController>/read?id=6
        [HttpGet]
        [Route("read")]
        public async Task<ActionResult> Show(int id)
        {
            var gift = await _giftRepository.GetGift(id);

            if (gift == null)
            {
                return NotFound(new {message = "Gift not found"});
            }

            return Ok(gift);    
        }


        // POST api/<GiftController>/post
        [HttpPost]
        [Route("post")]
        public async Task<ActionResult> Post([FromBody] GiftFormRequest giftFormRequest)
        {
            var gift = await _giftRepository.AddGift(giftFormRequest);

            return Ok(gift);
        }

        // PUT api/<GiftController>/update?id=5
        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> Update(int id, [FromBody] GiftFormRequest giftFormRequest)
        {
            var gift = await _giftRepository.UpdateGift(giftFormRequest, id);

            if (gift == null)
            {
                return NotFound(new {message = "Gift not founded"});
            }

            return Ok(gift);
        }

        // DELETE api/<GiftController>/delete?id=5
        [HttpDelete]
        [Route("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletedGift = await _giftRepository.DeleteGift(id);

            if (deletedGift == 0)
            {
                return NotFound(new {message = "Gift not found"});
            }

            return Ok(new {message = $"Gift ID{id} deleted successfully"});
        }
    }
}
