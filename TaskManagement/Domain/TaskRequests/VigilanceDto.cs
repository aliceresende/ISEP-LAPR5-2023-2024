
namespace LAPR5.Domain.TaskRequests
{
    public class VigilanceDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Message { get; set; }

        public int PhoneNumber { get; set; }
        
        public string StartingPoint { get; set; }
        
        public string EndingPoint { get; set; }
        
        public string Status { get; set; }

        public string RobotAssignedTo { get; set; }
        
    }
}