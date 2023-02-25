using ChildrenGift.DatContext;
using System.ComponentModel.DataAnnotations;

namespace ChildrenGift.Models.FormRequest.Rules
{
    public class ExistingChild : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var giftFormRequest = (GiftFormRequest)validationContext.ObjectInstance;
            var _db = (ChildGiftContext)validationContext.GetService(typeof(ChildGiftContext));

            if (giftFormRequest.ChildId == 0)
            {
                return new ValidationResult("Value non existing");
            }

            var child = _db.Children.Find(giftFormRequest.ChildId);

            return child == null
                ? new ValidationResult("Child is not existed")
                : ValidationResult.Success;
        }
    }
}
