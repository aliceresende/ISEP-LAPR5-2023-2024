using System;

namespace LAPR5.Domain.TaskRequests
{
    public class PickUpDeliveryMapper
    {
        public string UserId { get; set; }

        public string RoomPick { get; set; }

        public string RoomDeliver { get; set; }

        public string NamePick { get; set; }

        public string NameDeliver { get; set; }

        public int PhoneNumberPick { get; set; }

        public int PhoneNumberDeliver { get; set; }

        public int Code { get; set; }


        public PickUpDeliveryMapper(string userId, string roomPick, string roomDeliver, string namePick, string nameDeliver, int phoneNumberPick, int phoneNumberDeliver, int code)
        {
            UserId = userId;
            RoomPick = roomPick;
            RoomDeliver = roomDeliver;
            NamePick = namePick;
            NameDeliver = nameDeliver;
            PhoneNumberPick = phoneNumberPick;
            PhoneNumberDeliver = phoneNumberDeliver;
            Code = code;
        }
    }
}
