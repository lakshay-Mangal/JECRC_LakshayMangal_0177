using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BankingApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balance = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "Amount", "Balance", "Date", "Description", "Type" },
                values: new object[,]
                {
                    { 1, 1985.40m, "$12,234.45", "2019-12-03", "HACKERBANK INC. DES:CCD+ ID: 33375894749", 0 },
                    { 2, 42.99m, "$10,249.05", "2019-12-02", "AMAZON.COM*MT1TA4IQ0 AMZN.COM/BILLWA", 1 },
                    { 3, 87.34m, "$10,292.04", "2019-12-02", "WHOLE FOODS MARKET #10432 SAN FRANCISCO CA", 1 },
                    { 4, 3500.00m, "$10,379.38", "2019-12-01", "PAYROLL DIRECT DEPOSIT TECHCORP INC", 0 },
                    { 5, 13.99m, "$6,879.38", "2019-11-29", "NETFLIX.COM LOS GATOS CA", 1 },
                    { 6, 6.75m, "$6,893.37", "2019-11-28", "STARBUCKS STORE #08765 SAN JOSE CA", 1 },
                    { 7, 250.00m, "$6,900.12", "2019-11-28", "VENMO CASHOUT DES:TRANSFER ID: 99887766", 0 },
                    { 8, 55.20m, "$6,650.12", "2019-11-27", "SHELL OIL 12345678 SAN FRANCISCO CA", 1 },
                    { 9, 200.00m, "$6,705.32", "2019-11-26", "ATM WITHDRAWAL 123 MAIN ST SAN FRANCISCO CA", 1 },
                    { 10, 125.50m, "$6,905.32", "2019-11-25", "DIVIDEND REINVESTMENT PLAN", 0 },
                    { 11, 63.18m, "$6,779.82", "2019-11-24", "TRADER JOE'S #455 SAN FRANCISCO CA", 1 },
                    { 12, 9.99m, "$6,843.00", "2019-11-22", "APPLE.COM/BILL CUPERTINO CA", 1 },
                    { 13, 18.50m, "$6,852.99", "2019-11-21", "UBER *TRIP HELP.UBER.COM CA", 1 },
                    { 14, 3.45m, "$6,871.49", "2019-11-20", "INTEREST CREDIT HACKERBANK CHECKING", 0 },
                    { 15, 89.99m, "$6,868.04", "2019-11-19", "COMCAST XFINITY DES:AUTOPAY ID: 4482991", 1 },
                    { 16, 134.22m, "$6,958.03", "2019-11-18", "PG&E DES:ELECTRIC ID: 5839201", 1 },
                    { 17, 3500.00m, "$7,092.25", "2019-11-15", "PAYROLL DIRECT DEPOSIT TECHCORP INC", 0 },
                    { 18, 450.00m, "$3,592.25", "2019-11-14", "ZELLE TRANSFER FROM MIKE J.", 0 },
                    { 19, 47.83m, "$3,142.25", "2019-11-13", "SAFEWAY #1234 SAN FRANCISCO CA", 1 },
                    { 20, 22.16m, "$3,190.08", "2019-11-12", "WALGREENS #9876 SAN FRANCISCO CA", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
