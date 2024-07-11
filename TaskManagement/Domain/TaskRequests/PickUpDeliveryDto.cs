using System;

namespace LAPR5.Domain.TaskRequests
{
    public class PickUpDeliveryDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string RoomPick { get; set; }

        public string RoomDeliver { get; set; }

        public string NamePick { get; set; }

        public string NameDeliver { get; set; }

        public int PhoneNumberPick { get; set; }
        
        public int PhoneNumberDeliver { get; set; }

        public int Code { get; set; }
        
        public string Status { get; set; }

        public string RobotAssignedTo { get; set; }

      
    }
}