using System.IdentityModel.Tokens.Jwt;
using LAPR5.Domain.TaskRequests;
using Microsoft.AspNetCore.Mvc;


namespace LAPR5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VigilanceController : ControllerBase
    {
        private readonly VigilanceService _service;

        public VigilanceController(VigilanceService service)
        {
            _service = service;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<VigilanceDto>> GetById(Guid id)
        {
            var taskRequest = await _service.GetById(new VigilanceId(id));

            if (taskRequest == null)
            {
                return NotFound();
            }

            return taskRequest;
        }
        
        [HttpPost]
        public async Task<ActionResult<VigilanceDto>> Create(VigilanceMapper dto)
        {

            var cat = await _service.AddVigilanceTask(dto);

            return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
        }
        
        [HttpGet("waiting")]
        public async Task<List<VigilanceDto>> GetAllWaitingTasks()
        {
            return await _service.GetAllTasksUnapproved();
        }

        [HttpGet]
        public async Task<List<VigilanceDto>> GetAll()
        {
            return await _service.GetAll();
        }
        
        [HttpPatch("{id}/{value}/{robotId}")]
        public async Task<VigilanceDto> AcceptRequest(string id, bool value,string robotId)
        {
            return await _service.AcceptOrRefuseTask(id, value,robotId);
        }
     
        [HttpGet("user/{userId}")]
        public async Task<List<VigilanceDto>> GetByUser(string userId)
        {
            return await _service.GetTasksByUser(userId);
        }
    }
}