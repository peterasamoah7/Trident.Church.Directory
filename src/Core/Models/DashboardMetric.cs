namespace Core.Models
{
    public class DashboardMetric
    {
        public string Title { get; set; }

        public string Summary { get; set; }

        public int Metric { get; set; }

        public bool Increased { get; set; }
    }
}
