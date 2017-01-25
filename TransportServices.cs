using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Noduri
{
    interface TransportServices
    {
          Task SenderMessage(string message);
          Task<string> ReadMessage();
        
    }
}
