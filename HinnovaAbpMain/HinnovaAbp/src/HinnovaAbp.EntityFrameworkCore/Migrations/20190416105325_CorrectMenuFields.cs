using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class CorrectMenuFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Link",
                table: "Menus",
                maxLength: 1024,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1024);

            migrationBuilder.AlterColumn<string>(
                name: "Icon",
                table: "Menus",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1024);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Link",
                table: "Menus",
                maxLength: 1024,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 1024,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Icon",
                table: "Menus",
                maxLength: 1024,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 256,
                oldNullable: true);
        }
    }
}
