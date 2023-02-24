using System.ComponentModel.DataAnnotations;

namespace ChildrenGift.Models.FormRequest
{
    public class ChildFormRequest
    {
        [StringLength(255, MinimumLength = 3, ErrorMessage = "The field first name must be a string with a minimum length of 3 and a maximum length of 255.\r\n")]
        public string FirstName { get; set; }
        [StringLength(255, MinimumLength = 3, ErrorMessage = "The field last name must be a string with a minimum length of 3 and a maximum length of 255.\r\n")]
        public string LastName { get; set; }
    }
}
