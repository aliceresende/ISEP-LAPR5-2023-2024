
namespace LAPR5.Domain.TaskRequests
{
    public class VigilanceMapper
    {
        public string UserId { get; set; }
        
        public string Message { get; set; }

        public int PhoneNumber { get; set; }
        
        public string StartingPoint { get; set; }
        
        public string EndingPoint { get; set; }


        public VigilanceMapper(string userId, string message, int phoneNumber, string startingPoint, string endingPoint)
        {
            UserId = userId;
            Message = message;
            PhoneNumber = phoneNumber;
            StartingPoint = startingPoint;
            EndingPoint = endingPoint;
        }
    }
}