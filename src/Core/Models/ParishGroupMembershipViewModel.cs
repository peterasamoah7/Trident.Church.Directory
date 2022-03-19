namespace Core.Models
{
    public class ParishGroupMembershipViewModel : BaseViewModel
    {
        /// <summary>
        /// Parish Group View Model
        /// </summary>
        public ParishGroupViewModel ParishGroup { get; set; }

        /// <summary>
        /// Parish View Model
        /// </summary>
        public ParishViewModel Parish { get; set; }
    }
}
