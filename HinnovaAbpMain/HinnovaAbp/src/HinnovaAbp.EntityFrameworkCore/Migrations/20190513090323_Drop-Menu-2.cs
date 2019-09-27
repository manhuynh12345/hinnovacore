using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class DropMenu2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(maxLength: 2048, nullable: true),
                    Icon = table.Column<string>(maxLength: 256, nullable: true),
                    Index = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    IsDelimiter = table.Column<bool>(nullable: false),
                    IsParent = table.Column<bool>(nullable: false),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    Link = table.Column<string>(maxLength: 1024, nullable: true),
                    Name = table.Column<string>(maxLength: 1024, nullable: false),
                    Parent = table.Column<int>(nullable: true),
                    RequiredPermissionName = table.Column<string>(maxLength: 256, nullable: true),
                    Title = table.Column<string>(maxLength: 1024, nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menus", x => x.Id);
                });
        }
    }
}
