// <auto-generated />
using HiddenMickey.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HiddenMickey.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210309182119_CreateHiddenMickeys")]
    partial class CreateHiddenMickeys
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("HiddenMickey.Models.HiddenMickey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Clue")
                        .HasColumnType("text");

                    b.Property<string>("Hint")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("HiddenMickeys");
                });
#pragma warning restore 612, 618
        }
    }
}
