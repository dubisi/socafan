using SFN.Socafan.Common.Models.Enum;

namespace SFN.Socafan.Common.Models
{
    public class Entry
    {
        public int IdEntry { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool Active { get; set; }
        public Status Status { get; set; }
        public Payment Payment { get; set; }
        public List<Answer>? Answers { get; set; }
    }
}
