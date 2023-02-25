using ChildrenGift.Models.FormRequest.Rules;
using System.ComponentModel.DataAnnotations;

namespace ChildrenGift.Models.FormRequest
{
    public class GiftFormRequest
    {
        [StringLength(255, MinimumLength = 4, ErrorMessage = "The field name must be a string with a minimum length of 4 and a maximum length of 255.\r\n")]
        public string Name { get; set; }
        [Required, ExistingChild]
        public int ChildId { get; set; }
    }
}
