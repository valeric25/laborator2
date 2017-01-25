using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Noduri
{
    class Liste
    {

        public static HashSet<Employee> SetEmployeesList(int port) {
            HashSet<Employee> listaEmploye = new HashSet<Employee>();
            switch (port)
            {

                case 1000:
                    Employee em1 = new Employee();
                    em1.firstName = "Popescu";
                    em1.lastName = "Ion";
                    em1.departament = "Chirurgie";
                    em1.salary = 5000;
                    listaEmploye.Add(em1);
                    break;
                case 1002:
                    Employee em2 = new Employee();
                    em2.firstName = "Puica";
                    em2.lastName = "Anatolie";
                    em2.departament = "Director";
                    em2.salary = 6500;
                    listaEmploye.Add(em2);
                    break;
                case 1004:
                    Employee em3 = new Employee();
                    em3.firstName = "Damian";
                    em3.lastName = "Stefan";
                    em3.departament = "secretar";
                    em3.salary = 3600;
                    listaEmploye.Add(em3);
                    break;
                case 1006:
                    Employee em4 = new Employee();
                    em4.firstName = "Stratan";
                    em4.lastName = "Ion";
                    em4.departament = "Cardiologie";
                    em4.salary = 4700;
                    listaEmploye.Add(em4);
                    break;
                case 1008:
                    Employee em5 = new Employee();
                    em5.firstName = "Vilcu";
                    em5.lastName = "Olimpia";
                    em5.departament = "Cardiologie";
                    em5.salary = 5500;
                    listaEmploye.Add(em5);
                    break;
                case 1010:
                    Employee em6 = new Employee();
                    em6.firstName = "Ciobanu";
                    em6.lastName = "Mihaela";
                    em6.departament = "Oftamologie";
                    em6.salary = 6000;
                    listaEmploye.Add(em6);
                    break;
            }
            return listaEmploye;
        }
       
        public static  HashSet<int> ListaPorturiVecine(int port)
        {
            HashSet<int> legaturi = new HashSet<int>();
          switch (port) { 
            
                case 1000:
                    legaturi.Add(1002);                     
                    break;
                case 1002:
                    legaturi.Add(1000);
                    legaturi.Add(1004);
                    legaturi.Add(1006);
                    break;
                case 1004:
                    legaturi.Add(1002);
                    legaturi.Add(1008);
                    break;
                case 1006:
                    legaturi.Add(1002);
                    legaturi.Add(1008);
                    break;
                case 1008:
                    legaturi.Add(1004);
                    legaturi.Add(1006);
                    break;
                case 1010:
                    break;
          }
            return legaturi;
        
        }

    }
}
