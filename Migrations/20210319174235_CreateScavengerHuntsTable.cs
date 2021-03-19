using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace HiddenMickey.Migrations
{
    public partial class CreateScavengerHuntsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ScavengerHunts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScavengerHunts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HiddenMickeys_AreaOfTheParkId",
                table: "HiddenMickeys",
                column: "AreaOfTheParkId");

            migrationBuilder.CreateIndex(
                name: "IX_AreaOfTheParks_ParkId",
                table: "AreaOfTheParks",
                column: "ParkId");

            migrationBuilder.AddForeignKey(
                name: "FK_AreaOfTheParks_Parks_ParkId",
                table: "AreaOfTheParks",
                column: "ParkId",
                principalTable: "Parks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HiddenMickeys_AreaOfTheParks_AreaOfTheParkId",
                table: "HiddenMickeys",
                column: "AreaOfTheParkId",
                principalTable: "AreaOfTheParks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AreaOfTheParks_Parks_ParkId",
                table: "AreaOfTheParks");

            migrationBuilder.DropForeignKey(
                name: "FK_HiddenMickeys_AreaOfTheParks_AreaOfTheParkId",
                table: "HiddenMickeys");

            migrationBuilder.DropTable(
                name: "ScavengerHunts");

            migrationBuilder.DropIndex(
                name: "IX_HiddenMickeys_AreaOfTheParkId",
                table: "HiddenMickeys");

            migrationBuilder.DropIndex(
                name: "IX_AreaOfTheParks_ParkId",
                table: "AreaOfTheParks");
        }
    }
}
