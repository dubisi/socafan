using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SFN.Socafan.API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Entries",
                columns: table => new
                {
                    IdEntry = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EntryDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Payment = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entries", x => x.IdEntry);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    CellPhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    UserLevel = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    IdAnswer = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Q1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q5 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q6 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q7 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q8 = table.Column<int>(type: "INTEGER", nullable: false),
                    Q9 = table.Column<int>(type: "INTEGER", nullable: false),
                    IdEntry = table.Column<int>(type: "INTEGER", nullable: false),
                    IdUser = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.IdAnswer);
                    table.ForeignKey(
                        name: "FK_Answers_Entries_IdEntry",
                        column: x => x.IdEntry,
                        principalTable: "Entries",
                        principalColumn: "IdEntry",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answers_Users_IdUser",
                        column: x => x.IdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_IdEntry",
                table: "Answers",
                column: "IdEntry");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_IdUser",
                table: "Answers",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Entries");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
