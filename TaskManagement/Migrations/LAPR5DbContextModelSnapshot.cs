﻿// <auto-generated />
using System;
using LAPR5.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LAPR5.Migrations
{
    [DbContext(typeof(LAPR5DbContext))]
    partial class LAPR5DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LAPR5.Domain.TaskRequests.PickUpDeliveryTask", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<int>("Code")
                        .HasColumnType("integer");

                    b.Property<string>("NameDeliver")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NamePick")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PhoneNumberDeliver")
                        .HasColumnType("integer");

                    b.Property<int>("PhoneNumberPick")
                        .HasColumnType("integer");

                    b.Property<string>("RobotAssignedTo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RoomDeliver")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RoomPick")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("PickUpDeliveryTask");
                });

            modelBuilder.Entity("LAPR5.Domain.TaskRequests.VigilanceTask", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<string>("EndingPoint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("integer");

                    b.Property<string>("RobotAssignedTo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StartingPoint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("VigilanceTask");
                });
#pragma warning restore 612, 618
        }
    }
}
