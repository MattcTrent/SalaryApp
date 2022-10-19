using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalaryApp.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "SalaryApp");

            migrationBuilder.CreateTable(
                name: "SystemParameter",
                schema: "SalaryApp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Group = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(20,4)", nullable: false),
                    LowerThreshold = table.Column<decimal>(type: "decimal(20,4)", nullable: true),
                    UpperThreshold = table.Column<decimal>(type: "decimal(20,4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemParameter", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "SalaryApp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(20,5)", nullable: false),
                    pension = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.InsertData(
                schema: "SalaryApp",
                table: "SystemParameter",
                columns: new[] { "Id", "Group", "LowerThreshold", "Name", "Rate", "UpperThreshold" },
                values: new object[,]
                {
                    { 1, "Tax", 12570.00m, "Basic", 20.00m, 50570.00m },
                    { 2, "Tax", 50570.00m, "Higher", 40.00m, 150000.00m },
                    { 3, "Tax", 150000.00m, "Additional", 45.00m, null },
                    { 4, "NI", 12576.00m, "Basic", 13.25m, 50268.00m },
                    { 5, "NI", 50268.00m, "Additional", 3.25m, null },
                    { 6, "Student Finance", 19895.00m, "Plan 1", 9.00m, null },
                    { 7, "Student Finance", 27275.00m, "Plan 2", 9.00m, null }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SystemParameter",
                schema: "SalaryApp");

            migrationBuilder.DropTable(
                name: "User",
                schema: "SalaryApp");
        }
    }
}
