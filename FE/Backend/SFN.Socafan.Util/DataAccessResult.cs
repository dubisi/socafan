using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SFN.Socafan.Util
{

    public class DataAccessResult
    {
        public bool Succesfull { get; set; }
        public string Message { get; set; }

        public DataAccessResult(bool success, string message)
        {
            Succesfull = success;
            Message = message;
        }
    }
}
