using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalaryApp.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                schema: "SalaryApp",
                table: "SystemParameter",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
