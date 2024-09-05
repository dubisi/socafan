using SFN.Socafan.Common.Models;
using SFN.Socafan.Common.Models.Enum;

namespace SFN.Socafan.API.Requests
{
    public class UserUpdateRequest
    {
        public MessageAction action { get; set; }
        public User? user { get; set; }
    }
}
