using SFN.Socafan.Common.Models;
using SFN.Socafan.Database.DataAccess;

namespace SFN.Socafan.Database
{
    public class AdminDataAccess
    {
        private readonly SFNDbContext _context;

        public AdminDataAccess(SFNDbContext context)
        {
            _context = context;
        }

        public bool PlaceGame(GamePlay play)
        {
            _context.Games.Add(play);
            _context.SaveChanges();
            return true;
        }

    }
}
