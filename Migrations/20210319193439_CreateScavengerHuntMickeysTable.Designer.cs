﻿// <auto-generated />
using HiddenMickey.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HiddenMickey.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210319193439_CreateScavengerHuntMickeysTable")]
    partial class CreateScavengerHuntMickeysTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("HiddenMickey.Models.AreaOfThePark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ParkId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ParkId");

                    b.ToTable("AreaOfTheParks");
                });

            modelBuilder.Entity("HiddenMickey.Models.HiddenMickey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("AreaOfTheParkId")
                        .HasColumnType("integer");

                    b.Property<string>("Clue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Hint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AreaOfTheParkId");

                    b.ToTable("HiddenMickeys");
                });

            modelBuilder.Entity("HiddenMickey.Models.Park", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Parks");
                });

            modelBuilder.Entity("HiddenMickey.Models.ScavengerHunt", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.HasKey("Id");

                    b.ToTable("ScavengerHunts");
                });

            modelBuilder.Entity("HiddenMickey.Models.ScavengerHuntMickey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("HiddenMickeyId")
                        .HasColumnType("integer");

                    b.Property<int>("ScavengerHuntId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("ScavengerHuntMickeys");
                });

            modelBuilder.Entity("HiddenMickey.Models.AreaOfThePark", b =>
                {
                    b.HasOne("HiddenMickey.Models.Park", null)
                        .WithMany("AreaOfTheParks")
                        .HasForeignKey("ParkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HiddenMickey.Models.HiddenMickey", b =>
                {
                    b.HasOne("HiddenMickey.Models.AreaOfThePark", null)
                        .WithMany("HiddenMickeys")
                        .HasForeignKey("AreaOfTheParkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HiddenMickey.Models.AreaOfThePark", b =>
                {
                    b.Navigation("HiddenMickeys");
                });

            modelBuilder.Entity("HiddenMickey.Models.Park", b =>
                {
                    b.Navigation("AreaOfTheParks");
                });
#pragma warning restore 612, 618
        }
    }
}