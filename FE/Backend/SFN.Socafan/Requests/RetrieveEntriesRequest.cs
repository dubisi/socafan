using SFN.Socafan.Common.Models.Enum;

namespace SFN.Socafan.API.Requests
{
    public class RetrieveEntriesRequest
    {
        public int IdUser { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public UserLevel UserLevel { get; set; }
    }
}
