using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Update002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParishGroups_Parishes_ParishId",
                table: "ParishGroups");

            migrationBuilder.AddForeignKey(
                name: "FK_ParishGroups_Parishes_ParishId",
                table: "ParishGroups",
                column: "ParishId",
                principalTable: "Parishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParishGroups_Parishes_ParishId",
                table: "ParishGroups");

            migrationBuilder.AddForeignKey(
                name: "FK_ParishGroups_Parishes_ParishId",
                table: "ParishGroups",
                column: "ParishId",
                principalTable: "Parishes",
                principalColumn: "Id");
        }
    }
}
