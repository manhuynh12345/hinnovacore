using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HinnovaAbp.Migrations
{
    public partial class CreateLayoutConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LayoutConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ColIndex = table.Column<int>(nullable: false),
                    ContentId = table.Column<int>(nullable: true),
                    HtmlCode = table.Column<string>(nullable: true),
                    LayoutId = table.Column<int>(nullable: false),
                    Ratio = table.Column<int>(nullable: false),
                    RowIndex = table.Column<int>(nullable: false),
                    IsLayout = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayoutConfigs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LayoutConfigs");
        }
    }
}
