using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;


namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            //---data to send to the server---
            Console.ReadKey();
            //---create a TCPClient object at the IP and port no.---
            
            
            TcpClient client = new TcpClient("127.0.0.1",8000);
            NetworkStream nwStream = client.GetStream();
            while (true)
            {
                
                Console.Clear();
                Console.WriteLine("\n\nTrimiteti codul operatiei corespunzatoare:\n");
                Console.WriteLine("1..Sortare in mod crescator dupa forstName;");
                Console.WriteLine("2..Sortare in mod credcator dupa departament");
                Console.WriteLine("3..Sortare in mod crescator dupa salariu;");
                string textToSend = Console.ReadLine();
                byte[] bytesToSend = ASCIIEncoding.ASCII.GetBytes(textToSend);

                //---send the text---

                Console.WriteLine("Sending : " + textToSend);
                nwStream.Write(bytesToSend, 0, bytesToSend.Length);

                //---read back the text---
                byte[] bytesToRead = new byte[client.ReceiveBufferSize];
                int bytesRead = nwStream.Read(bytesToRead, 0, client.ReceiveBufferSize);
                Console.WriteLine("Received : \n" + Encoding.ASCII.GetString(bytesToRead, 0, bytesRead));
                nwStream.Flush();
                Console.ReadKey();
            }
            Console.ReadLine();
            client.Close();
        }
    }
}
