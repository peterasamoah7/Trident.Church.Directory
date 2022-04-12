using System.ComponentModel;

namespace Data.Models
{
    public enum SacramentType
    {
        [Description("Baptism")]
        Baptism = 1,
        [Description("First Communion")]
        FirstCommunion,
        [Description("Holy Matrimony")]
        HolyMatrimony,
        [Description("Holy Orders")]
        HolyOrders,
        [Description("Reconciliation")]
        Reconciliation
    }
}
