using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LAPR5.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTasksMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PickUpDeliveryTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoomPick = table.Column<string>(type: "text", nullable: false),
                    RoomDeliver = table.Column<string>(type: "text", nullable: false),
                    NamePick = table.Column<string>(type: "text", nullable: false),
                    NameDeliver = table.Column<string>(type: "text", nullable: false),
                    PhoneNumberPick = table.Column<int>(type: "integer", nullable: false),
                    PhoneNumberDeliver = table.Column<int>(type: "integer", nullable: false),
                    Code = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RobotAssignedTo = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PickUpDeliveryTask", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VigilanceTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<int>(type: "integer", nullable: false),
                    StartingPoint = table.Column<string>(type: "text", nullable: false),
                    EndingPoint = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RobotAssignedTo = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VigilanceTask", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PickUpDeliveryTask");

            migrationBuilder.DropTable(
                name: "VigilanceTask");
        }
    }
}
