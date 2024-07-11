using LAPR5.Domain.Shared;
using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;
using LAPR5.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace LAPR5.test.IntegrationTests.Service;

public class PickUpDeliveryServiceTests
{
    private readonly PickUpDeliveryService _deliveryService;
    private readonly Mock<IPickUpDeliveryTaskRepository> _pickUpDeliveryTaskRepository = new();
    private readonly Mock<IUnitOfWork> _unitOfWork = new();
    private readonly List<PickUpDeliveryTask> _tasks;
    
    public PickUpDeliveryServiceTests()
    {

        var task1 = new PickUpDeliveryTask("admin@isep.ipp.pt", "Room 123", "Room 321", "Alice", "Rui", 912345678,
            987654321, 123);
        var task2 = new PickUpDeliveryTask("user@isep.ipp.pt", "Room 101", "Room 311", "Fausto", "Rui", 912245678,
            987754321, 113);
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;
        
       _tasks = new List<PickUpDeliveryTask>
        {
            task1,task2
        };

        _pickUpDeliveryTaskRepository.Setup(x => x.GetAllTasksUnapproved()).ReturnsAsync(new List<PickUpDeliveryTask>(){task1});
        //_unitOfWork.Setup(x => x.CommitAsync()).ReturnsAsync(1);
        _pickUpDeliveryTaskRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(_tasks);
        _deliveryService = new PickUpDeliveryService(_unitOfWork.Object, _pickUpDeliveryTaskRepository.Object,null!);
    }
    
    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        // Act
        var tasksUnapproved = await _deliveryService.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved);
    }
    
    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsEmpty()
    {
        _pickUpDeliveryTaskRepository.Setup(x => x.GetAllTasksUnapproved()).ReturnsAsync(new List<PickUpDeliveryTask>());

        // Act
        var tasksUnapproved = await _deliveryService.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Empty(tasksUnapproved);
    }
    [Fact]
    public async Task GetAll_ReturnsAllTasks()
    {
        var result = await _deliveryService.GetAll();

        Assert.NotNull(result);
        Assert.Equal(_tasks.Count, result.Count);
    }

    [Fact]
    public async Task GetById_ReturnsCorrectTask()
    {
        var expectedTask = _tasks.First();
        _pickUpDeliveryTaskRepository.Setup(x => x.GetByIdAsync(expectedTask.Id)).ReturnsAsync(expectedTask);

        var result = await _deliveryService.GetById(expectedTask.Id);

        Assert.NotNull(result);
        Assert.Equal(expectedTask.Id.AsGuid(), result.Id);
    }

    [Fact]
    public async Task AcceptOrRefuseTask_AcceptsTask()
    {
        var taskToAccept = _tasks.First();
        _pickUpDeliveryTaskRepository.Setup(x => x.GetByIdAsync(taskToAccept.Id)).ReturnsAsync(taskToAccept);

        var result = await _deliveryService.AcceptOrRefuseTask(taskToAccept.Id.AsString(), true, "Robot1");

        Assert.NotNull(result);
        Assert.Equal(Status.APPROVED.ToString(), result.Status);
        Assert.Equal("Robot1", result.RobotAssignedTo);
    }
}