using System;

namespace Data.Entities
{
    public class ParishionerParishGroup
    {
        public Guid? ParishionerId { get; set; }

        public Parishioner Parishioner { get; set; }

        public Guid? ParishGroupId { get; set; }

        public ParishGroup ParishGroup { get; set; }
    }
}
