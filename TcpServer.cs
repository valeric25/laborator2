using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Noduri
{
    class TcpServer
    {
        TcpListener listener;
        int portListener;
        NetworkStream nwStream;
        TcpClient client;
        public TcpServer(int portListener) {
            this.portListener=portListener;
            IPAddress localAdd = IPAddress.Parse("127.0.0.1");
            listener = new TcpListener(localAdd, portListener);
            listener.Start();
        }

        public string readClientMs() {
            client = listener.AcceptTcpClient();
           
            //---get the incoming data through a network stream---
            nwStream = client.GetStream();
            byte[] buffer = new byte[client.ReceiveBufferSize];
            int bytesRead = nwStream.Read(buffer, 0, client.ReceiveBufferSize);

            //---convert the data received into a string---
            string dataReceived = Encoding.ASCII.GetString(buffer, 0, bytesRead);
             
            return dataReceived;
            client.Close();
            
        }

        public void SendRequest(string mess) {
            byte[] bytesToSend = ASCIIEncoding.ASCII.GetBytes(mess);
            nwStream.Write(bytesToSend, 0, bytesToSend.Length);
             
        }
        public void CloseServer() {
             
            listener.Stop();
        }


    }

}
