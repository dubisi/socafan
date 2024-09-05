using SFN.Socafan.Common.Models;
using SFN.Socafan.Common.Models.Enum;
using SFN.Socafan.Database.DataAccess;
using SFN.Socafan.Util;

namespace SFN.Socafan.Database
{
    public class AuthorizationDataAccess
    {
        private readonly SFNDbContext _context;

        public AuthorizationDataAccess(SFNDbContext context)
        {
            _context = context;
        }

        public void AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public User? RetrieveUserByUsername(string username)
        {
            return _context.Users.SingleOrDefault(u => u.UserName == username);
        }

        public DataAccessResult RetriveUser(int idUser)
        {
            var user = _context.Users.FirstOrDefault(x => x.IdUser == idUser);

            if (user == null)
            {
                return new DataAccessResult(false, "user not found");
            }
            return new DataAccessResult(true, "user login");
        }

        public List<User> RetriveUsers()
        {
            return _context.Users.ToList();
        }

        public DataAccessResult UpdateUser(User user, MessageAction action)
        {
            try
            {
                if (user != null)
                {
                    if (action == MessageAction.Add)
                    {
                        _context.Users.Add(user);
                    }
                    else if (action == MessageAction.Delete)
                    {
                        _context.Users.Remove(user);
                    }
                    else
                    {
                        _context.Users.Update(user);
                    }
                }
                _context.SaveChanges();
                return new DataAccessResult(true, "user added succesfully");
            }
            catch (Exception ex)
            {
                return new DataAccessResult(false, $"user not found {ex.Message}");
            }
        }
    }
}
