using LAPR5.Domain.TaskRequests;
using Xunit;

namespace LAPR5.test;

public class VigilanceTaskTest
{
    [Fact]
    public void Constructor_InitializesPropertiesCorrectly()
    {
        var userId = "user123";
        var message = "Sample Message";
        var phoneNumber = 123456789;
        var startingPoint = "LocationA";
        var endingPoint = "LocationB";

        var task = new VigilanceTask(userId, message, phoneNumber, startingPoint, endingPoint);

        Assert.Equal(userId, task.UserId);
        Assert.Equal(message, task.Message);
        Assert.Equal(phoneNumber, task.PhoneNumber);
        Assert.Equal(startingPoint, task.StartingPoint);
        Assert.Equal(endingPoint, task.EndingPoint);
        Assert.Equal(Status.WAITING, task.Status);
        Assert.Equal("", task.RobotAssignedTo);
    }

    private readonly VigilanceTask _task = new (
        "user123", 
        "Sample Message", 
        123456789, 
        "LocationA", 
        "LocationB"
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