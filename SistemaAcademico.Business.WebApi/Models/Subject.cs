using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    /// <summary>
    /// Disciplina
    /// </summary>
    public class Subject
    {
        public int Id { get; private set; }

        public string Name { get; private set; }

        public virtual ICollection<SchoolClass> SchoolClasses { get; private set; }
        //public virtual ICollection<Course> Course { get; private set; }

        #region ctor
        protected Subject()
        { }

        public Subject(string name)
        {
            this.Name = name;
            this.SchoolClasses = new List<SchoolClass>();
            //this.Course = new List<Course>();
        }
        #endregion


        public void AddSchoolClass(SchoolClass schoolClass)
        {
            this.SchoolClasses.Add(schoolClass);
        }
    }
}