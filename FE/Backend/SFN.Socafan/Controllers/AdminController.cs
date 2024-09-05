using Microsoft.AspNetCore.Mvc;
using SFN.Socafan.API.Requests;
using SFN.Socafan.Common.Models;
using SFN.Socafan.Database;

namespace SFN.Socafan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly AdminDataAccess mAdminDataAccess;
        public AdminController(AdminDataAccess adminDataAccess)
        {
            mAdminDataAccess = adminDataAccess;
        }

        [HttpPost("PlaceGame")]
        public IActionResult Play([FromBody] GamePlayDTO play)
        {
            var pl = new GamePlay
            {
                EnterdDate = play.EnterdDate,
                Home = play.Home,
                Away = play.Away,
            };

            return Ok(mAdminDataAccess.PlaceGame(pl));
        }
    }
}
