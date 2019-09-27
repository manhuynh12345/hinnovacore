using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class DashboardTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dashboard");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dashboard",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LayoutId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UserCreated = table.Column<Guid>(nullable: true),
                    isActive = table.Column<bool>(nullable: false),
                    isDelete = table.Column<bool>(nullable: false),
                    isPublish = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dashboard", x => x.Id);
                });
        }
    }
}
