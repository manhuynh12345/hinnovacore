using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class CreateDashboardItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DashboardItem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemName = table.Column<string>(nullable: true),
                    ItemCode = table.Column<string>(nullable: true),
                    ItemType = table.Column<string>(nullable: true),
                    UserCreated = table.Column<Guid>(nullable: true),
                    BoxHeaderIcon = table.Column<string>(nullable: true),
                    BoxHeaderText = table.Column<string>(nullable: true),
                    BoxColor = table.Column<string>(nullable: true),
                    BoxContent = table.Column<string>(nullable: true),
                    BoxFooterIcon = table.Column<string>(nullable: true),
                    BoxDetailText = table.Column<string>(nullable: true),
                    BoxUrl = table.Column<string>(nullable: true),
                    ChartType = table.Column<string>(nullable: true),
                    ChartPalette = table.Column<string>(nullable: true),
                    ChartTitle = table.Column<string>(nullable: true),
                    ChartArgumentField = table.Column<string>(nullable: true),
                    ChartValueField = table.Column<string>(nullable: true),
                    ChartLabelName = table.Column<string>(nullable: true),
                    ChartStackedColumnName = table.Column<string>(nullable: true),
                    ColumnBuilder = table.Column<string>(nullable: true),
                    StoreProcedure = table.Column<string>(nullable: true),
                    isActive = table.Column<bool>(nullable: false),
                    isDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DashboardItem", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DashboardItem");
        }
    }
}
