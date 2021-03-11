using Microsoft.EntityFrameworkCore.Migrations;

namespace HiddenMickey.Migrations
{
    public partial class AddedAColumnForTheAreaIdUnderHM : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AreaOfTheParkId",
                table: "HiddenMickeys",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AreaOfTheParkId",
                table: "HiddenMickeys");
        }
    }
}
