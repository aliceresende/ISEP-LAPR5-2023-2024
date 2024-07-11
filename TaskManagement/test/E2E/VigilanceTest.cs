using LAPR5.Controllers;
using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;
using LAPR5.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LAPR5.test.E2E;

public class VigilanceTests
{
    private readonly VigilanceController _vigilanceController;
    private readonly List<VigilanceTask> _vigilanceTaskList;

    public VigilanceTests()
    {
        var dbContextOptions = new DbContextOptionsBuilder<LAPR5DbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new LAPR5DbContext(dbContextOptions);

        var task1 = new VigilanceTask("user1@isep.ipp.pt", "Message1", 912345678, "Start1", "End1");
        var task2 = new VigilanceTask("user2@isep.ipp.pt", "Message2", 912345679, "Start2", "End2");
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;

        _vigilanceTaskList = new List<VigilanceTask> { task1, task2 };

        context.VigilanceTask.AddRange(_vigilanceTaskList);
        context.SaveChanges();

        var rep = new VigilanceRepository(context);
        var serv = new VigilanceService(new UnitOfWork(context), rep, new Adapter());

        _vigilanceController = new VigilanceController(serv);
    }

    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        var tasksUnapproved = await _vigilanceController.GetAllWaitingTasks();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved); // Assuming one task is in waiting status
    }

    [Fact]
    public async Task GetAllTasks_ReturnsAllTasks()
    {
        var tasks = await _vigilanceController.GetAll();

        Assert.NotNull(tasks);
        Assert.Equal(_vigilanceTaskList.Count, tasks.Count);
    }

    [Fact]
    public async Task GetById_ReturnsCorrectTask()
    {
        var taskToTest = _vigilanceTaskList.First();
        var result = await _vigilanceController.GetById(taskToTest.Id.AsGuid());

        Assert.NotNull(result);
        Assert.Equal(taskToTest.Id.AsGuid(), result.Value.Id);
    }

    [Fact]
    public async Task Create_AddsNewTask()
    {
        var newTaskDto = new VigilanceMapper(
           "newUser@isep.ipp.pt",
            "New message",
            912345680,
           "NewStart",
            "NewEnd"
        );

        var createdResult = await _vigilanceController.Create(newTaskDto);

        Assert.NotNull(createdResult);
        var createdResultValue = Assert.IsType<CreatedAtActionResult>(createdResult.Result).Value as VigilanceDto;
        Assert.NotNull(createdResultValue);

        var createdTask = await _vigilanceController.GetById(createdResultValue.Id);
        Assert.NotNull(createdTask);
    }

    [Fact]
    public async Task AcceptRequest_UpdatesTaskStatusToApproved()
    {
        var taskToTest = _vigilanceTaskList.First();
        var updatedTask = await _vigilanceController.AcceptRequest(taskToTest.Id.AsString(), true, "Robot1");

        Assert.NotNull(updatedTask);
        Assert.Equal(Status.APPROVED.ToString(), updatedTask.Status);
        Assert.Equal("Robot1", updatedTask.RobotAssignedTo);
    }

    [Fact]
    public async Task RejectRequest_UpdatesTaskStatusToRejected()
    {
        var taskToTest = _vigilanceTaskList.First();
        var updatedTask = await _vigilanceController.AcceptRequest(taskToTest.Id.AsString(), false, "");

        Assert.NotNull(updatedTask);
        Assert.Equal(Status.REJECTED.ToString(), updatedTask.Status);
    }
}
