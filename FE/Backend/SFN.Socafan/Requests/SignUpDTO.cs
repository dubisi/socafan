namespace SFN.Socafan.API.Requests
{
    public class SignUpDTO
    {
        public int IdUser { get; set; }
        public required string Name { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string CellPhoneNumber { get; set; }
    }
}
