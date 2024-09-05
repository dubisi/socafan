using SFN.Socafan.Common.Models.Enum;

namespace SFN.Socafan.Common.Models
{
    public class Answer
    {
        public int IdAnswer { get; set; }
        public AnswerEnum Q1 { get; set; }
        public AnswerEnum Q2 { get; set; }
        public AnswerEnum Q3 { get; set; }
        public AnswerEnum Q4 { get; set; }
        public AnswerEnum Q5 { get; set; }
        public AnswerEnum Q6 { get; set; }
        public AnswerEnum Q7 { get; set; }
        public AnswerEnum Q8 { get; set; }
        public AnswerEnum Q9 { get; set; }
        public int IdEntry { get; set; }
        public Entry? Entry { get; set; }
        public int IdUser { get; set; }
        public User? User { get; set; }
        public int IdGamePlay { get; set; }
        public GamePlay? Game { get; set; }
    }
}
