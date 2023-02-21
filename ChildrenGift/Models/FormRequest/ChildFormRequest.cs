using System.ComponentModel.DataAnnotations;

namespace ChildrenGift.Models.FormRequest
{
    public class ChildFormRequest
    {
        [StringLength(255, MinimumLength = 3)]
        public string FirstName { get; set; }
        [StringLength(255, MinimumLength = 3)]
        public string LastName { get; set; }
    }
}
