using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class CreateDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Audits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Parishes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parishes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Parish = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserRole = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParishGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParishId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParishGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParishGroups_Parishes_ParishId",
                        column: x => x.ParishId,
                        principalTable: "Parishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Parishioners",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FatherId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MotherId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PartnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HomeAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParishId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parishioners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parishioners_Parishes_ParishId",
                        column: x => x.ParishId,
                        principalTable: "Parishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ParishionerParishGroup",
                columns: table => new
                {
                    ParishionerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParishGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParishionerParishGroup", x => new { x.ParishionerId, x.ParishGroupId });
                    table.ForeignKey(
                        name: "FK_ParishionerParishGroup_ParishGroups_ParishGroupId",
                        column: x => x.ParishGroupId,
                        principalTable: "ParishGroups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ParishionerParishGroup_Parishioners_ParishionerId",
                        column: x => x.ParishionerId,
                        principalTable: "Parishioners",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Sacraments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    ParishionerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PriestId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    GodParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ParishId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sacraments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sacraments_Parishes_ParishId",
                        column: x => x.ParishId,
                        principalTable: "Parishes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Sacraments_Parishioners_ParishionerId",
                        column: x => x.ParishionerId,
                        principalTable: "Parishioners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ParishGroups_ParishId",
                table: "ParishGroups",
                column: "ParishId");

            migrationBuilder.CreateIndex(
                name: "IX_ParishionerParishGroup_ParishGroupId",
                table: "ParishionerParishGroup",
                column: "ParishGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Parishioners_ParishId",
                table: "Parishioners",
                column: "ParishId");

            migrationBuilder.CreateIndex(
                name: "IX_Sacraments_ParishId",
                table: "Sacraments",
                column: "ParishId");

            migrationBuilder.CreateIndex(
                name: "IX_Sacraments_ParishionerId",
                table: "Sacraments",
                column: "ParishionerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Audits");

            migrationBuilder.DropTable(
                name: "ParishionerParishGroup");

            migrationBuilder.DropTable(
                name: "Sacraments");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ParishGroups");

            migrationBuilder.DropTable(
                name: "Parishioners");

            migrationBuilder.DropTable(
                name: "Parishes");
        }
    }
}
