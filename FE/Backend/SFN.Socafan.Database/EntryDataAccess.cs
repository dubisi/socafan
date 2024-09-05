using Microsoft.EntityFrameworkCore;
using SFN.Socafan.Common.Models;
using SFN.Socafan.Common.Models.Enum;
using SFN.Socafan.Database.DataAccess;
using SFN.Socafan.Util;

namespace SFN.Socafan.Database
{
    public class EntryDataAccess
    {
        private readonly SFNDbContext _context;

        public EntryDataAccess(SFNDbContext context)
        {
            _context = context;
        }

        public List<Answer> RetrieveEntries(int idUser, DateTime fromDate, DateTime toDate, UserLevel userLevel)
        {
            try
            {
                //if (userLevel == UserLevel.Adimin)
                //{
                //    return _context.Entries.ToList();
                //}

                var answers = _context.Answers.Include(a => a.Entry).Include(b => b.User).Where(c => c.IdUser == idUser).ToList();

                return answers.ToList();
            }
            catch (Exception ex) { return new List<Answer>(); }


        }

        public GamePlay? RetrieveGame()
        {
            try
            {
                var today = DateTime.Now.Date; // Gets today's date with time set to 00:00:00
                var game = _context.Games.FirstOrDefault(x => x.EnterdDate.Date == today);

                if (game == null)
                {
                    return null;
                }

                return game;
            }
            catch (Exception ex)
            {
                return null;
            }


        }

        public DataAccessResult PlaceEntry(Answer answer)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.IdUser == answer.IdUser);
                var game = _context.Games.FirstOrDefault(x => x.IdGamePlay == answer.IdGamePlay);

                //_context.Entries.Add(entry);
                //_context.SaveChanges();

                answer.User = user;
                answer.Game = game;

                var answe = _context.Answers.Add(answer);
                _context.SaveChanges();

                if (user == null)
                {
                    return new DataAccessResult(false, "User Not found");
                }



                return new DataAccessResult(true, "Entry placed successfully.");
            }
            catch (Exception ex)
            {
                return new DataAccessResult(true, "Bad request");
            }


        }
    }
}
