using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class CustomMenuSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(maxLength: 1024, nullable: false),
                    Description = table.Column<string>(maxLength: 2048, nullable: true),
                    Index = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    IsDelimiter = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(maxLength: 1024, nullable: false),
                    Icon = table.Column<string>(maxLength: 1024, nullable: false),
                    Link = table.Column<string>(maxLength: 1024, nullable: false),
                    Parent = table.Column<Guid>(nullable: false),
                    IsParent = table.Column<bool>(nullable: false),
                    RequiredPermissionName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menus");
        }
    }
}
