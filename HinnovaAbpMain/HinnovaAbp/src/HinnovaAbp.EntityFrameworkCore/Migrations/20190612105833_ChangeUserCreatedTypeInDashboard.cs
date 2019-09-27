using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class ChangeUserCreatedTypeInDashboard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "UserCreated",
                table: "Dashboard",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "UserCreated",
                table: "Dashboard",
                nullable: true,
                oldClrType: typeof(long));
        }
    }
}
