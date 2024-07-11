using LAPR5.Domain.TaskRequests;
using Xunit;

namespace LAPR5.Domain.TaskRequests;

public class PickUpDeliveryTaskTest
{

    [Fact]
    public void Constructor_InitializesPropertiesCorrectly()
    {
        var userId = "user123";
        var roomPick = "RoomA";
        var roomDeliver = "RoomB";
        var namePick = "Alice";
        var nameDeliver = "Bob";
        var phoneNumberPick = 123456789;
        var phoneNumberDeliver = 987654321;
        var code = 1001;

        var task = new PickUpDeliveryTask(userId, roomPick, roomDeliver, namePick, nameDeliver, phoneNumberPick, phoneNumberDeliver, code);

        Assert.Equal(userId, task.UserId);
        Assert.Equal(roomPick, task.RoomPick);
        Assert.Equal(roomDeliver, task.RoomDeliver);
        Assert.Equal(namePick, task.NamePick);
        Assert.Equal(nameDeliver, task.NameDeliver);
        Assert.Equal(phoneNumberPick, task.PhoneNumberPick);
        Assert.Equal(phoneNumberDeliver, task.PhoneNumberDeliver);
        Assert.Equal(code, task.Code);

        
    }
    private readonly PickUpDeliveryTask _task = new (
        "user123", 
        "RoomA",  
        "RoomB", 
        "Alice",  
        "Bob",    
        123456789,
        987654321, 
        1001 
    )
    {
        Status = Status.WAITING,
        RobotAssignedTo = ""
    };

    

    [Theory]
    [InlineData(Status.REJECTED)]
    [InlineData(Status.APPROVED)]
    public void UpdateStatus_ChangesStatusCorrectly(Status newStatus)
    {
        _task.UpdateStatus(newStatus);
        
        Assert.Equal(newStatus, _task.Status);
    }
    
    [Theory]
    [InlineData("Robot1")]
    [InlineData("Robot2")]
    public void RobotAssignedTo_AssignsAndRetrievesCorrectly(string robotName)
    {
        _task.RobotAssignedTo = robotName;
        
        Assert.Equal(robotName, _task.RobotAssignedTo);
    }

}