using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Update003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParishionerParishGroup_ParishGroups_ParishGroupId",
                table: "ParishionerParishGroup");

            migrationBuilder.DropForeignKey(
                name: "FK_ParishionerParishGroup_Parishioners_ParishionerId",
                table: "ParishionerParishGroup");

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Sacraments",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Parishioners",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "ParishGroups",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Parishes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Audits",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_ParishionerParishGroup_ParishGroups_ParishGroupId",
                table: "ParishionerParishGroup",
                column: "ParishGroupId",
                principalTable: "ParishGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParishionerParishGroup_Parishioners_ParishionerId",
                table: "ParishionerParishGroup",
                column: "ParishionerId",
                principalTable: "Parishioners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParishionerParishGroup_ParishGroups_ParishGroupId",
                table: "ParishionerParishGroup");

            migrationBuilder.DropForeignKey(
                name: "FK_ParishionerParishGroup_Parishioners_ParishionerId",
                table: "ParishionerParishGroup");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Sacraments");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Parishioners");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "ParishGroups");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Parishes");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Audits");

            migrationBuilder.AddForeignKey(
                name: "FK_ParishionerParishGroup_ParishGroups_ParishGroupId",
                table: "ParishionerParishGroup",
                column: "ParishGroupId",
                principalTable: "ParishGroups",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ParishionerParishGroup_Parishioners_ParishionerId",
                table: "ParishionerParishGroup",
                column: "ParishionerId",
                principalTable: "Parishioners",
                principalColumn: "Id");
        }
    }
}
