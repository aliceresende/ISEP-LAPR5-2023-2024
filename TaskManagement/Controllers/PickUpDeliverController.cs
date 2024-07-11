using System.IdentityModel.Tokens.Jwt;
using LAPR5.Domain.TaskRequests;
using Microsoft.AspNetCore.Mvc;


namespace LAPR5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class PickUpDeliverController : ControllerBase
    {
        private readonly PickUpDeliveryService _service;

        public PickUpDeliverController(PickUpDeliveryService service)
        {
            _service = service;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<PickUpDeliveryDto>> GetById(Guid id)
        {
            var taskRequest = await _service.GetById(new PickUpDeliveryId(id));

            if (taskRequest == null)
            {
                return NotFound();
            }

            return taskRequest;
        }
        
        [HttpPost]
        public async Task<ActionResult<PickUpDeliveryDto>> Create(PickUpDeliveryMapper dto)
        {

            var cat = await _service.AddPickUpDeliverTask(dto);

            return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
        }
        
        [HttpGet("waiting")]
        public async Task<List<PickUpDeliveryDto>> GetAllWaitingTasks()
        {
            return await _service.GetAllTasksUnapproved();
        }

        [HttpGet]
        public async Task<List<PickUpDeliveryDto>> GetAll()
        {
            return await _service.GetAll();
        }
        
        [HttpPatch("{id}/{value}/{robotId}")]
        public async Task<PickUpDeliveryDto> AcceptRequest(string id, bool value,string robotId)
        {
            return await _service.AcceptOrRefuseTask(id, value,robotId);
        }
        
        [HttpGet("user/{userId}")]
        public async Task<List<PickUpDeliveryDto>> GetByUser(string userId)
        {
            return await _service.GetTasksByUser(userId);
        }
 
    }
}