using LAPR5.Controllers;
using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;
using LAPR5.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LAPR5.test.E2E;

public class PickUpDeliverTests
{
    private readonly PickUpDeliverController _pickUpDeliverController;

    private readonly List<PickUpDeliveryTask> pickUpDeliveryTaskList;
    
    public PickUpDeliverTests()
    {
        var dbContextOptions = new DbContextOptionsBuilder<LAPR5DbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new LAPR5DbContext(dbContextOptions);

        var task1 = new PickUpDeliveryTask("admin@isep.ipp.pt", "Room 123", "Room 321", "Alice", "Rui", 912345678,
            987654321, 123);
        var task2 = new PickUpDeliveryTask("user@isep.ipp.pt", "Room 101", "Room 311", "Fausto", "Rui", 912245678,
            987754321, 113);
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;
        
        pickUpDeliveryTaskList = new List<PickUpDeliveryTask>
        {
            task1,task2
        };

        context.PickUpDeliveryTask.AddRange(pickUpDeliveryTaskList);
        context.SaveChanges();
        
        var rep = new PickUpDeliveryRepository(context);

        var serv = new PickUpDeliveryService(new UnitOfWork(context), rep, new Adapter());

        _pickUpDeliverController = new PickUpDeliverController(serv);
    }
    
    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        // Act
        var tasksUnapproved = await _pickUpDeliverController.GetAllWaitingTasks();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved);
    }
    [Fact]
    public async Task GetAllTasks_ReturnsAllTasks()
    {
        var tasks = await _pickUpDeliverController.GetAll();

        Assert.NotNull(tasks);
        Assert.Equal(pickUpDeliveryTaskList.Count, tasks.Count);
    }

    // Test for retrieving task by ID
    [Fact]
    public async Task GetById_ReturnsCorrectTask()
    {
        var taskToTest = pickUpDeliveryTaskList.First();
        var result = await _pickUpDeliverController.GetById(taskToTest.Id.AsGuid());

        Assert.NotNull(result);
        Assert.Equal(taskToTest.Id.AsGuid(), result.Value.Id);
    }

    [Fact]
    public async Task Create_AddsNewTask()
    {
        // Initialize the DTO with valid data
        var newTaskDto = new PickUpDeliveryMapper("newUser@isep.ipp.pt",
            "Room 500",
            "Room 501",
            "Carlos",
             "Diana",
            912345678,
           987654321,
            2002
        );

        // Act: Create a new task
        var createdResult = await _pickUpDeliverController.Create(newTaskDto);

        // Assert that creation was successful
        Assert.NotNull(createdResult);
        var createdResultValue = Assert.IsType<CreatedAtActionResult>(createdResult.Result).Value as PickUpDeliveryDto;
        Assert.NotNull(createdResultValue);

        // Retrieve the newly created task by ID and assert it's not null
        var createdTask = await _pickUpDeliverController.GetById(createdResultValue.Id);
        Assert.NotNull(createdTask);
        var createdTaskValue = Assert.IsType<ActionResult<PickUpDeliveryDto>>(createdTask).Value;
        Assert.NotNull(createdTaskValue);
        
    }


    // Test for accepting a task request
    [Fact]
    public async Task AcceptRequest_UpdatesTaskStatusToApproved()
    {
        var taskToTest = pickUpDeliveryTaskList.First();
        var updatedTask = await _pickUpDeliverController.AcceptRequest(taskToTest.Id.AsString(), true, "Robot1");

        Assert.NotNull(updatedTask);
        Assert.Equal(Status.APPROVED.ToString(), updatedTask.Status);
        Assert.Equal("Robot1", updatedTask.RobotAssignedTo);
    }

    // Test for rejecting a task request
    [Fact]
    public async Task RejectRequest_UpdatesTaskStatusToRejected()
    {
        var taskToTest = pickUpDeliveryTaskList.First();
        var updatedTask = await _pickUpDeliverController.AcceptRequest(taskToTest.Id.AsString(), false, "");

        Assert.NotNull(updatedTask);
        Assert.Equal(Status.REJECTED.ToString(), updatedTask.Status);
    }

 
}