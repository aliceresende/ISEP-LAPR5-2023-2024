namespace LAPR5.Domain{

    public class Robot
    {
     
        public string Id { get; set; }
        
        public string Code { get; set; }

        public string Nickname { get; set; }

        public string RobotType { get; set; }

        public string SeriesNumber { get; set; }
        
        public string Description { get; set; }

        public bool Status { get; set; }

        public Robot()
        {
        }
    }
}