using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Noduri
{
    class Program
    {
        static void Main(string[] args)
        {

                  
                 SenderUdp s_udp = new SenderUdp();
                 TcpServer tcp;
                 Console.WriteLine("Portul de ascultare:");                    
               int listen_port = Int16.Parse(Console.ReadLine());
                  
                 HashSet<Employee> empl =Liste.SetEmployeesList(listen_port);
                 XDocument doc=XmlClass.CreateDocument();
                 XmlClass.AddEmployeeXml(empl,ref doc);
                              
                 ReceiverUdp r_udp = new ReceiverUdp(listen_port); //portul de ascultare este mereu mai mare cu o unitate decit portul aplicatiei

                 // Console.WriteLine("My_port");
                 // int my_port = Int16.Parse(Console.ReadLine());
                 s_udp.SetMyPort(listen_port-1);
               

                 Console.WriteLine("Apasati orce tasta pentru a trimite cererile");
                 Console.ReadKey();          
               
                 HashSet<int> listaLink =Liste.ListaPorturiVecine(listen_port);
                 
                 
                 foreach (var item in listaLink)
                 {
                   // SenderUdp s_udp = new SenderUdp(item, listen_port - 1);
                    s_udp.SetSenderPort(item);
                    s_udp.SenderMessage(doc.ToString());
                 }


                Console.WriteLine("Apasati orce tasta pentru a vedea rezultatele");
                Console.ReadKey(); 
               // SenderUdp s_udp = new SenderUdp(port_send, listen_port-1);//deci aici se efectueaza transmiterea mes de pe portul my_port spre portul port_send
                 
              Task  t = Task.Factory.StartNew(async() =>
                       {
                    //Console.WriteLine(doc.ToString());
                    HashSet<Employee> emplList = new HashSet<Employee>();
                  //  s_udp.SenderMessage("cerere");
                    String m;
                     
                    while((m = await r_udp.ReadMessage())!="quit")
                    {
                        //Console.WriteLine(XmlClass.ConvertStringToXml(m).ToString());
                        emplList= XmlClass.GetListFromXml(XmlClass.ConvertStringToXml(m));
                        XmlClass.AddEmployeeXml(emplList,ref doc);
                         Console.WriteLine(m);
                        // Console.WriteLine(doc.ToString()+"\n");                     
                        // Console.WriteLine(emplList);

                                   
                        // r_udp.SenderMessage("o ajuns tot normal");
                        //  string mes = await r_udp.ReadMessage();
                        //  Console.WriteLine(mes);
                    }
                     
                                      
                 }
                  
                 );
                  
                //t.Wait();
               if (listen_port == 1002)
                {
                    tcp = new TcpServer(8000);

                    string request_tcp;
                    while ((request_tcp = tcp.readClientMs()) != null)
                    {
                        Console.WriteLine(request_tcp.ToString());
                        
                        tcp.SendRequest(XmlClass.SortXml(request_tcp,doc).ToString());
                        
                       /* Console.WriteLine(request_tcp);
                        tcp.SendRequest(doc.ToString());*/
                    }
                   
                    Console.ReadKey();
                    
                    tcp.CloseServer();
                }
                Console.ReadKey();
        }
    }
}
