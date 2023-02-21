using System.Collections.Generic;

namespace ChildrenGift.Models.Entities
{
    public class Child : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<Gift> Gifts { get; set; }
    }
}
