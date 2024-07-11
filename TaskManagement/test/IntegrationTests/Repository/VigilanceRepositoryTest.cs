using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;
using LAPR5.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LAPR5.test.IntegrationTests.Repository;

public class VigilanceRepositoryTest
{
    private readonly VigilanceRepository _vigilanceRepository;
    private readonly LAPR5DbContext _context;

    public VigilanceRepositoryTest()
    {
        var dbContextOptions = new DbContextOptionsBuilder<LAPR5DbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new LAPR5DbContext(dbContextOptions);

        // Initializing with some test data
        var task1 = new VigilanceTask("user1@isep.ipp.pt", "Message1", 912345678, "Start1", "End1");
        var task2 = new VigilanceTask("user2@isep.ipp.pt", "Message2", 912345679, "Start2", "End2");
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;

        _context.VigilanceTask.AddRange(new List<VigilanceTask> { task1, task2 });
        _context.SaveChanges();

        _vigilanceRepository = new VigilanceRepository(_context);
    }

    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        var tasksUnapproved = await _vigilanceRepository.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved); // Assuming one task is WAITING
    }

    [Fact]
    public async Task AddTask_AddsSuccessfully()
    {
        var newTask = new VigilanceTask("newUser@isep.ipp.pt", "New Message", 912345680, "NewStart", "NewEnd");
        await _vigilanceRepository.AddAsync(newTask);
        await _context.SaveChangesAsync();

        var retrievedTask = await _vigilanceRepository.GetByIdAsync(newTask.Id);
        Assert.NotNull(retrievedTask);
        Assert.Equal("New Message", retrievedTask.Message);
    }

    [Fact]
    public async Task UpdateTask_UpdatesSuccessfully()
    {
        var task = (await _vigilanceRepository.GetAllAsync()).First();
        task.UpdateStatus(Status.APPROVED);
        _context.Update(task);
        await _context.SaveChangesAsync();

        var updatedTask = await _vigilanceRepository.GetByIdAsync(task.Id);
        Assert.Equal(Status.APPROVED, updatedTask.Status);
    }

    [Fact]
    public async Task DeleteTask_DeletesSuccessfully()
    {
        var task = (await _vigilanceRepository.GetAllAsync()).First();
        _vigilanceRepository.Remove(task);
        await _context.SaveChangesAsync();

        var deletedTask = await _vigilanceRepository.GetByIdAsync(task.Id);
        Assert.Null(deletedTask);
    }
}
