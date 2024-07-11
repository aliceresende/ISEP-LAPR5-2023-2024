using System.Threading.Tasks;
using System.Collections.Generic;
using LAPR5.Domain.Shared;
using System;
using Newtonsoft.Json;

namespace LAPR5.Domain.TaskRequests
{
    public class PickUpDeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPickUpDeliveryTaskRepository _repo;
        private readonly Adapter _adapter;

        public PickUpDeliveryService(IUnitOfWork unitOfWork, IPickUpDeliveryTaskRepository repo,Adapter adapter)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._adapter=adapter;
        }

        public async Task<List<PickUpDeliveryDto>> GetAllTasksUnapproved()
        {
            var list = await this._repo.GetAllTasksUnapproved();

            if (list.Count == 0)
                return new List<PickUpDeliveryDto>();
            
            List<PickUpDeliveryDto> listDto = list.ConvertAll<PickUpDeliveryDto>(taskRequest => new PickUpDeliveryDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, RoomPick = taskRequest.RoomPick, RoomDeliver = taskRequest.RoomDeliver, NamePick = taskRequest.NamePick, NameDeliver = taskRequest.NameDeliver,PhoneNumberPick = taskRequest.PhoneNumberPick, PhoneNumberDeliver = taskRequest.PhoneNumberDeliver, Code = taskRequest.Code,Status = taskRequest.Status.ToString(),RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }

        public async Task<List<PickUpDeliveryDto>> GetAll()
        {
            var list = await this._repo.GetAllAsync();
            if (list.Count == 0)
                return new List<PickUpDeliveryDto>();
            
            List<PickUpDeliveryDto> listDto = list.ConvertAll<PickUpDeliveryDto>(taskRequest => new PickUpDeliveryDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, RoomPick = taskRequest.RoomPick, RoomDeliver = taskRequest.RoomDeliver, NamePick = taskRequest.NamePick, NameDeliver = taskRequest.NameDeliver,PhoneNumberPick = taskRequest.PhoneNumberPick, PhoneNumberDeliver = taskRequest.PhoneNumberDeliver, Code = taskRequest.Code,Status=taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }

        public async Task<PickUpDeliveryDto> AcceptOrRefuseTask(string id, bool value,string robotCode)
        {
            PickUpDeliveryId requestId = new(id);

            var request = await this._repo.GetByIdAsync(requestId);

            if(value)
            {
                request.UpdateStatus(Status.APPROVED);
                request.RobotAssignedTo=robotCode;
            }else{
                request.UpdateStatus(Status.REJECTED);
            }

            await this._unitOfWork.CommitAsync();
            
            return new PickUpDeliveryDto{Id = request.Id.AsGuid(), UserId = request.UserId,RoomPick = request.RoomPick, RoomDeliver = request.RoomDeliver, NamePick = request.NamePick, NameDeliver = request.NameDeliver,PhoneNumberPick = request.PhoneNumberPick, PhoneNumberDeliver = request.PhoneNumberDeliver, Code = request.Code, Status = request.Status.ToString(),  RobotAssignedTo = request.RobotAssignedTo};
        }

        public async Task<PickUpDeliveryDto> GetById(PickUpDeliveryId id)
        {
            var taskRequest = await this._repo.GetByIdAsync(id);

            if(taskRequest == null)
                return null;

            return new PickUpDeliveryDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, RoomPick = taskRequest.RoomPick, RoomDeliver = taskRequest.RoomDeliver, NamePick = taskRequest.NamePick, NameDeliver = taskRequest.NameDeliver,PhoneNumberPick = taskRequest.PhoneNumberPick, PhoneNumberDeliver = taskRequest.PhoneNumberDeliver, Code = taskRequest.Code,Status= taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo};
        }

        public async Task<PickUpDeliveryDto> AddPickUpDeliverTask(PickUpDeliveryMapper dto)
        {
           
            var taskRequest = new PickUpDeliveryTask(dto.UserId, dto.RoomPick, dto.RoomDeliver, dto.NamePick, dto.NameDeliver,dto.PhoneNumberPick, dto.PhoneNumberDeliver, dto.Code);

            await this._repo.AddAsync(taskRequest);

            await this._unitOfWork.CommitAsync();

            return new PickUpDeliveryDto { Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, RoomPick = taskRequest.RoomPick, RoomDeliver = taskRequest.RoomDeliver, NamePick = taskRequest.NamePick, NameDeliver = taskRequest.NameDeliver,PhoneNumberPick = taskRequest.PhoneNumberPick, PhoneNumberDeliver = taskRequest.PhoneNumberDeliver, Code = taskRequest.Code, Status = taskRequest.Status.ToString(),RobotAssignedTo = taskRequest.RobotAssignedTo};
        }
        public async Task<List<PickUpDeliveryDto>> GetTasksByUser(string user)
        {
            var list = await this._repo.GetTasksByUser(user);

            if(list.Count == 0)
                return new List<PickUpDeliveryDto>();

            List<PickUpDeliveryDto> listDto = list.ConvertAll<PickUpDeliveryDto>(taskRequest => new PickUpDeliveryDto{Id = taskRequest.Id.AsGuid(), UserId = taskRequest.UserId, RoomPick = taskRequest.RoomPick, RoomDeliver = taskRequest.RoomDeliver, NamePick = taskRequest.NamePick, NameDeliver = taskRequest.NameDeliver,PhoneNumberPick = taskRequest.PhoneNumberPick, PhoneNumberDeliver = taskRequest.PhoneNumberDeliver, Code = taskRequest.Code,Status = taskRequest.Status.ToString(), RobotAssignedTo = taskRequest.RobotAssignedTo});

            return listDto;
        }
    }
}