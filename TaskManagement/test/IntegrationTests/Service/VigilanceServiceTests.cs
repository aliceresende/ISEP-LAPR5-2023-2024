using LAPR5.Domain.TaskRequests;

using Moq;
using Xunit;

using LAPR5.Domain.Shared;

namespace LAPR5.test.IntegrationTests.Service;

public class VigilanceServiceTests
{
    private readonly VigilanceService _vigilanceService;
    private readonly Mock<IVigilanceTaskRepository> _vigilanceTaskRepository = new();
    private readonly Mock<IUnitOfWork> _unitOfWork = new();
    private readonly List<VigilanceTask> _tasks;

    public VigilanceServiceTests()
    {
        // Setup tasks
        var task1 = new VigilanceTask("user1@isep.ipp.pt", "Message1", 912345678, "Start1", "End1");
        var task2 = new VigilanceTask("user2@isep.ipp.pt", "Message2", 912345679, "Start2", "End2");
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;

        _tasks = new List<VigilanceTask> { task1, task2 };

        _vigilanceTaskRepository.Setup(x => x.GetAllTasksUnapproved()).ReturnsAsync(new List<VigilanceTask>(){task1});
        _vigilanceTaskRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(_tasks);

        _vigilanceService = new VigilanceService(_unitOfWork.Object, _vigilanceTaskRepository.Object, null!);
    }

    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        // Act
        var tasksUnapproved = await _vigilanceService.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved);
    }
    
    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsEmpty()
    {
        _vigilanceTaskRepository.Setup(x => x.GetAllTasksUnapproved()).ReturnsAsync(new List<VigilanceTask>());

        // Act
        var tasksUnapproved = await _vigilanceService.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Empty(tasksUnapproved);
    }

    [Fact]
    public async Task GetAll_ReturnsAllTasks()
    {
        var result = await _vigilanceService.GetAll();

        Assert.NotNull(result);
        Assert.Equal(_tasks.Count, result.Count);
    }

    [Fact]
    public async Task GetById_ReturnsCorrectTask()
    {
        var expectedTask = _tasks.First();
        _vigilanceTaskRepository.Setup(x => x.GetByIdAsync(expectedTask.Id)).ReturnsAsync(expectedTask);

        var result = await _vigilanceService.GetById(expectedTask.Id);

        Assert.NotNull(result);
        Assert.Equal(expectedTask.Id.AsGuid(), result.Id);
    }

    [Fact]
    public async Task AcceptOrRefuseTask_AcceptsTask()
    {
        var taskToAccept = _tasks.First();
        _vigilanceTaskRepository.Setup(x => x.GetByIdAsync(taskToAccept.Id)).ReturnsAsync(taskToAccept);

        var result = await _vigilanceService.AcceptOrRefuseTask(taskToAccept.Id.AsString(), true, "Robot1");

        Assert.NotNull(result);
        Assert.Equal(Status.APPROVED.ToString(), result.Status);
        Assert.Equal("Robot1", result.RobotAssignedTo);
    }
    
}
