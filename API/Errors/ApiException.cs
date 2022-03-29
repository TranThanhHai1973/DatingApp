using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiException
    {
        public ApiException(int statusCode, string messgase = null, string details = null)
        {
            StatusCode = statusCode;
            Messgase = messgase;
            Details = details;
        }

        public int StatusCode { get; set; }
         public string Messgase { get; set; }

         public string Details { get; set; }
    }
}