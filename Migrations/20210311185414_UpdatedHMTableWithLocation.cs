using Microsoft.EntityFrameworkCore.Migrations;

namespace HiddenMickey.Migrations
{
    public partial class UpdatedHMTableWithLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "HiddenMickeys",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "HiddenMickeys");
        }
    }
}
