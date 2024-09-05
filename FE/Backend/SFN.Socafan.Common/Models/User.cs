using SFN.Socafan.Common.Models.Enum;

namespace SFN.Socafan.Common.Models
{

    public class User
    {
        public int IdUser { get; set; }
        public required string Name { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; }
        public required string CellPhoneNumber { get; set; }
        public UserLevel UserLevel { get; set; }
        public required List<Answer> Answers { get; set; }

    }
}
