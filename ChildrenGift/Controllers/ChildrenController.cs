using ChildrenGift.Models.Dtos;
using ChildrenGift.Models.FormRequest;
using ChildrenGift.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildrenGift.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChildrenController : ControllerBase
    {
        private readonly IChildrenRepository _childrenRepository;

        public ChildrenController(IChildrenRepository childrenRepository)
        {
            _childrenRepository = childrenRepository;
        }

        // GET: api/<ChildrenController>/index
        [HttpGet]
        [Route("index")]
        public async Task<ActionResult> Index()
        {
            var childernList = await _childrenRepository.GetChildren(); 

            return Ok(childernList);
        }

        // GET api/<ValuesController>/read?id=5
        [HttpGet]
        [Route("read")]
        public async Task<ActionResult> Show(int id)
        {
            var child = await _childrenRepository.GetChild(id);

            if (child == null)
            {
                return NotFound(new { message = "Child not exist" });
            }

            return Ok(child);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Route("post")]
        public async Task<ActionResult> Post([FromBody] ChildFormRequest childFormRequest)
        {
            var child = await _childrenRepository.AddChild(childFormRequest);

            return Ok(child);
        }

        // PUT api/<ValuesController>/update?id=5
        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> Put(int id, [FromBody] ChildFormRequest childFormRequest)
        {
            var child = await _childrenRepository.UpdateChild(childFormRequest, id);

            if (child == null)
            {
                return NotFound(new { message = "Child not exist" });
            }

            return Ok(child);
        }

        // DELETE api/<ValuesController>/delete?id=5
        [HttpDelete]
        [Route("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletedChild = await _childrenRepository.DeleteChild(id);

            if (deletedChild == 0)
            {
                return NotFound(new { message = "Child not exist" });
            }

            return Ok(new { message = $"Child is deleted successfully" });
        }
    }
}
