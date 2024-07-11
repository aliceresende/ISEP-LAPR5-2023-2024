
using LAPR5.Domain.Shared;

namespace LAPR5.Domain.TaskRequests
{
    public class VigilanceTask: Entity<VigilanceId>, IAggregateRoot
    {
        public string UserId { get; set; }
        
        public string Message { get; set; }

        public int PhoneNumber { get; set; }
        
        public string StartingPoint { get; set; }
        
        public string EndingPoint { get; set; }
        public Status Status { get; set; }
        public string RobotAssignedTo { get; set; }
        public void UpdateStatus(Status status)
        {
            this.Status = status;
        }

        public VigilanceTask(string userId, string message, int phoneNumber, string startingPoint, string endingPoint)
        {
            this.Id = new VigilanceId(Guid.NewGuid());
            UserId = userId;
            Message = message;
            PhoneNumber = phoneNumber;
            StartingPoint = startingPoint;
            EndingPoint = endingPoint;
            Status = Status.WAITING;
            RobotAssignedTo = "";
        }
    }
}