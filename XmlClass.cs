using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Noduri
{
    class XmlClass
    {
        public static XDocument CreateDocument() {
            XDocument doc = new XDocument(new XDeclaration("1.0", "utf-8", "yes"));
            XElement employees = new XElement("Employees");
            doc.Add(employees);
            return doc;
        }
        public static void AddEmployeeXml(HashSet<Employee> employeeList,ref XDocument doc)
        {

            XElement employees = doc.Element("Employees");
            
            foreach (var item in employeeList)
            {
                
                XElement employee = new XElement("employee",
                        new XElement("firtName", item.firstName),
                        new XElement("lastName", item.lastName),
                        new XElement("departament", item.departament),
                        new XElement("salary", item.salary)

                        );

                doc.Element("Employees").Add(employee);

            }
            
            


        }
        public static XDocument ConvertStringToXml(string str) {
            return XDocument.Parse(str);
        }

        public static HashSet<Employee> GetListFromXml(XDocument doc) {
            HashSet<Employee> listEmpl=new HashSet<Employee>();

            var sel = from item in doc.Descendants("employee")
                      select new
                      {

                          firstName = item.Element("firtName").Value,
                          lastName = item.Element("lastName").Value,
                          departament = item.Element("departament").Value,
                          salary = Int16.Parse(item.Element("salary").Value)
                      };
            foreach (var item in sel) {
                Employee em = new Employee();
                em.firstName = item.firstName;
                em.lastName = item.lastName;
                em.departament = item.departament;
                em.salary = item.salary;
                listEmpl.Add(em);
            }
            return listEmpl;

        }
      
        public static XDocument SortXml(string cod,XDocument doc) {
           XDocument doc1 = new XDocument(new XDeclaration("1.0", "utf-8", "yes"));
           XElement employees = new XElement("Employees");
           doc1.Add(employees);
           var sel = from item in doc.Descendants("employee")
                     select new
                     {

                         firstName = item.Element("firtName").Value,
                         lastName = item.Element("lastName").Value,
                         departament = item.Element("departament").Value,
                         salary = Int16.Parse(item.Element("salary").Value)
                     };
           switch (cod) {

                case "1":
                  
                   foreach (var item in sel.OrderBy(p => p.firstName))
                   {
                       XElement employee = new XElement("employee",
                                new XElement("firtName", item.firstName),
                                new XElement("lastName", item.lastName),
                                new XElement("departament", item.departament),
                                new XElement("salary", item.salary)

                                );
                       employees.Add(employee);

                   }
                       break;
               case "2":
                       
                       foreach (var item in sel.OrderBy(p => p.departament))
                       {
                           XElement employee = new XElement("employee",
                                    new XElement("firtName", item.firstName),
                                    new XElement("lastName", item.lastName),
                                    new XElement("departament", item.departament),
                                    new XElement("salary", item.salary)

                                    );
                           employees.Add(employee);

                       }
                       break;
               case "3":
                      foreach (var item in sel.OrderBy(p => p.salary))
                       {
                           XElement employee = new XElement("employee",
                                    new XElement("firtName", item.firstName),
                                    new XElement("lastName", item.lastName),
                                    new XElement("departament", item.departament),
                                    new XElement("salary", item.salary)

                                    );
                           employees.Add(employee);

                       }
                       break;
            }
           return doc1;
        }

    }
}
