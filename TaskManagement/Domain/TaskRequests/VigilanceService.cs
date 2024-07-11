using System.Threading.Tasks;
using System.Collections.Generic;
using LAPR5.Domain.Shared;
using System;
using Newtonsoft.Json;

namespace LAPR5.Domain.TaskRequests
{
    public class VigilanceService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVigilanceTaskRepository _repo;
        private readonly Adapter _adapter;

        public VigilanceService(IUnitOfWork unitOfWork, IVigilanceTaskRepository repo,Adapter adapter)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._adapter=adapter;
        }

        public async Task<List<VigilanceDto>> GetAllTasksUnapproved()
        {
            var list = await this._repo.GetAllTasksUnapproved();

            if (list.Count == 0)
                return new List<VigilanceDto>();
            
            List<VigilanceDto> listDto = list.ConvertAll<VigilanceDto>(taskRequest => new VigilanceDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, Message = taskRequest.Message, PhoneNumber = taskRequest.PhoneNumber, StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, Status = taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }

        public async Task<List<VigilanceDto>> GetAll()
        {
            var list = await this._repo.GetAllAsync();
            if (list.Count == 0)
                return new List<VigilanceDto>();
            
            List<VigilanceDto> listDto = list.ConvertAll<VigilanceDto>(taskRequest => new VigilanceDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, Message = taskRequest.Message, PhoneNumber = taskRequest.PhoneNumber, StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint, Status = taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }

        public async Task<VigilanceDto> AcceptOrRefuseTask(string id, bool value,string robotCode)
        {
            VigilanceId requestId = new(id);

            var request = await this._repo.GetByIdAsync(requestId);

            if(value){
                request.UpdateStatus(Status.APPROVED);
                request.RobotAssignedTo=robotCode;
            }else{
                request.UpdateStatus(Status.REJECTED);
            }

            await this._unitOfWork.CommitAsync();
            
            return new VigilanceDto{Id = request.Id.AsGuid(), UserId = request.UserId,Message = request.Message, PhoneNumber = request.PhoneNumber, StartingPoint = request.StartingPoint, EndingPoint = request.EndingPoint,  Status = request.Status.ToString(),  RobotAssignedTo = request.RobotAssignedTo};
        }

        public async Task<VigilanceDto> GetById(VigilanceId id)
        {
            var taskRequest = await this._repo.GetByIdAsync(id);

            if(taskRequest == null)
                return null;

            return new VigilanceDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, Message = taskRequest.Message, PhoneNumber = taskRequest.PhoneNumber, StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint,  Status = taskRequest.Status.ToString(),  RobotAssignedTo = taskRequest.RobotAssignedTo};
        }

        public async Task<VigilanceDto> AddVigilanceTask(VigilanceMapper dto)
        {
           
            var taskRequest = new VigilanceTask(dto.UserId, dto.Message, dto.PhoneNumber, dto.StartingPoint,dto.EndingPoint);

            await this._repo.AddAsync(taskRequest);

            await this._unitOfWork.CommitAsync();

            return new VigilanceDto { Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, Message = taskRequest.Message, PhoneNumber = taskRequest.PhoneNumber, StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint,  Status = taskRequest.Status.ToString(),  RobotAssignedTo = taskRequest.RobotAssignedTo};
        }

        public async Task<List<VigilanceDto>> GetTasksByUser(string user)
        {
            var list = await this._repo.GetTasksByUser(user);

            if(list.Count == 0)
                return new List<VigilanceDto>();

            List<VigilanceDto> listDto = list.ConvertAll<VigilanceDto>(taskRequest => new VigilanceDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, Message = taskRequest.Message, PhoneNumber = taskRequest.PhoneNumber, StartingPoint = taskRequest.StartingPoint, EndingPoint = taskRequest.EndingPoint,Status = taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }
        
    }
}