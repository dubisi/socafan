namespace SFN.Socafan.Common.Models
{
    public class GamePlay
    {
        public int IdGamePlay { get; set; }
        public DateTime EnterdDate { get; set; }
        public string Home { get; set; }
        public string Away { get; set; }
        public List<Answer>? Answers { get; set; }
    }
}
