using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Noduri
{
    class ReceiverUdp:TransportServices
    {
        UdpClient listener;
        int port_receive;
        IPEndPoint EPlistener;
        int port_listener;
        SenderUdp s_receive;
        public ReceiverUdp(int port) {
            this.port_listener = port;
            listener = new UdpClient(port_listener);
           EPlistener = new IPEndPoint(IPAddress.Parse("127.0.0.1"), port_listener);
        }

        public async Task SenderMessage(string message)//citim rezultatul requestului
        {
                s_receive = new SenderUdp();
                s_receive.SetSenderPort(port_receive + 1);
                s_receive.SenderMessage(message);
           
        }
        
        public async  Task<string> ReadMessage()
        {
            var bytes = await listener.ReceiveAsync();
            this.port_receive = bytes.RemoteEndPoint.Port;
            // Console.WriteLine(port_receive);
            return ASCIIEncoding.ASCII.GetString(bytes.Buffer, 0, bytes.Buffer.Length);
        }
    }
}