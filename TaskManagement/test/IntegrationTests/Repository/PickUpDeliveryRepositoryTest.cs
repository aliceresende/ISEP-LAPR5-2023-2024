using LAPR5.Domain.TaskRequests;
using LAPR5.Infraestructure.TaskRequests;
using LAPR5.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LAPR5.test.Integration.Repository;

public class PickUpDeliveryRepositoryTest
{
    private readonly PickUpDeliveryRepository _deliveryRepository;
    private readonly LAPR5DbContext _context; 
    public PickUpDeliveryRepositoryTest()
    {
        var dbContextOptions = new DbContextOptionsBuilder<LAPR5DbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new LAPR5DbContext(dbContextOptions);

        var task1 = new PickUpDeliveryTask("admin@isep.ipp.pt", "Room 123", "Room 321", "Alice", "Rui", 912345678,
            987654321, 123);
        var task2 = new PickUpDeliveryTask("user@isep.ipp.pt", "Room 101", "Room 311", "Fausto", "Rui", 912245678,
            987754321, 113);
        task1.Status = Status.WAITING;
        task2.Status = Status.APPROVED;
        var pickUpDeliveryTask = new List<PickUpDeliveryTask>
        {
            task1,task2
        };

        _context.PickUpDeliveryTask.AddRange(pickUpDeliveryTask);
        _context.SaveChanges();

        _deliveryRepository = new PickUpDeliveryRepository(_context);
    }
    

    [Fact]
    public async Task GetAllTasksUnapproved_ReturnsCorrect()
    {
        // Act
        var tasksUnapproved = await _deliveryRepository.GetAllTasksUnapproved();

        Assert.NotNull(tasksUnapproved);
        Assert.Single(tasksUnapproved);
    }


    [Fact]
    public async Task GetById_ReturnsCorrectTask()
    {
        var task = (await _deliveryRepository.GetAllAsync()).First();
        var retrievedTask = await _deliveryRepository.GetByIdAsync(task.Id);

        Assert.NotNull(retrievedTask);
        Assert.Equal(task.Id, retrievedTask.Id);
    }
    [Fact]
    public async Task AddTask_AddsSuccessfully()
    {
        var newTask = new PickUpDeliveryTask("newUser@isep.ipp.pt", "Room 200", "Room 202", "John", "Doe", 912345679, 987654322, 125);
        await _deliveryRepository.AddAsync(newTask);
        await _context.SaveChangesAsync();

        var retrievedTask = await _deliveryRepository.GetByIdAsync(newTask.Id);
        Assert.NotNull(retrievedTask);
        Assert.Equal("John", retrievedTask.NamePick);
    }

    [Fact]
    public async Task UpdateTask_UpdatesSuccessfully()
    {
        var task = (await _deliveryRepository.GetAllAsync()).First();
        task.UpdateStatus(Status.APPROVED);
        _context.Update(task);
        await _context.SaveChangesAsync();

        var updatedTask = await _deliveryRepository.GetByIdAsync(task.Id);
        Assert.Equal(Status.APPROVED, updatedTask.Status);
    }
}