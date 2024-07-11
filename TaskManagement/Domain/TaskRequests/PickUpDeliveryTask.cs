using LAPR5.Domain.Shared;

namespace LAPR5.Domain.TaskRequests;

public class PickUpDeliveryTask: Entity<PickUpDeliveryId>, IAggregateRoot
{
        public string UserId { get; set; }

        public string RoomPick { get; set; }

        public string RoomDeliver { get; set; }

        public string NamePick { get; set; }

        public string NameDeliver { get; set; }

        public int PhoneNumberPick { get; set; }
        
        public int PhoneNumberDeliver { get; set; }

        public int Code { get; set; }
        
        public Status Status { get; set; }

        public string RobotAssignedTo { get; set; }

        public PickUpDeliveryTask(string userId, string roomPick, string roomDeliver, string namePick, string nameDeliver, int phoneNumberPick, int phoneNumberDeliver, int code)
        {
                this.Id = new PickUpDeliveryId(Guid.NewGuid());
                UserId = userId;
                RoomPick = roomPick;
                RoomDeliver = roomDeliver;
                NamePick = namePick;
                NameDeliver = nameDeliver;
                PhoneNumberPick = phoneNumberPick;
                PhoneNumberDeliver = phoneNumberDeliver;
                Code = code;
                Status = Status.WAITING;
                RobotAssignedTo = "";
        }

        public void UpdateStatus(Status status)
        {
                this.Status = status;
        }
}