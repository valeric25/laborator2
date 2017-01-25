using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Noduri
{
    class SenderUdp:TransportServices
    {
        UdpClient sendUdp;
        IPEndPoint EPsoket;
        int port_sender;    
        int my_port;
        public void  SetSenderPort(int portSender) {
           this.port_sender = portSender;
           EPsoket = new IPEndPoint(IPAddress.Parse("127.0.0.1"),port_sender);
           sendUdp.Connect(EPsoket);
        }
       
        
        public void SetMyPort(int my_port)
        {
            this.my_port = my_port;
            sendUdp = new UdpClient(my_port);
        }


        public async Task SenderMessage(string message)
        {
             byte[] sendbuf = Encoding.ASCII.GetBytes(message);
             sendUdp.SendAsync(sendbuf, sendbuf.Length);
        }

        public Task<string> ReadMessage()
        {
            throw new NotImplementedException();
        }
    }
}
