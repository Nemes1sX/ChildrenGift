using System.ComponentModel.DataAnnotations.Schema;

namespace ChildrenGift.Models.Entities
{
    public class Gift : Entity
    {
        public string Name { get; set; }
        [ForeignKey("Child")]
        [Column("ChildId")]
        public int ChildId { get; set; }
        public Child Child { get; set; }
    }
}
