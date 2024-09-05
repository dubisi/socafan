using Microsoft.AspNetCore.Mvc;
using SFN.Socafan.API.Requests;
using SFN.Socafan.Database;
using PlaceEntryRequest = SFN.Socafan.API.Requests.PlaceEntryRequest;

namespace SFN.Socafan.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntryController : ControllerBase
    {
        private readonly EntryDataAccess mEntryDataAccess;

        public EntryController(EntryDataAccess entryDataAccess)
        {
            mEntryDataAccess = entryDataAccess;
        }

        [HttpPost("RetrieveEntries")]
        public IActionResult RetrieveEntries([FromBody] RetrieveEntriesRequest request)
        {
            var retriveResut = mEntryDataAccess.RetrieveEntries(request.IdUser, request.FromDate, request.ToDate, request.UserLevel);

            return Ok(retriveResut);
        }

        [HttpPost("PlaceEntry")]
        public IActionResult PlaceEntry([FromBody] PlaceEntryRequest request)
        {
            var retriveResut = mEntryDataAccess.PlaceEntry(request.Answer);

            return Ok(retriveResut);
        }

        [HttpPost("RetrieveGame")]
        public IActionResult RetrieveGame()
        {
            var retriveResut = mEntryDataAccess.RetrieveGame();

            return Ok(retriveResut);
        }
    }
}
