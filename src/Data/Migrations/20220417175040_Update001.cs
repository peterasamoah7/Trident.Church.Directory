using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Update001 : Migration
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
                principalColumn: "Id");
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
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
