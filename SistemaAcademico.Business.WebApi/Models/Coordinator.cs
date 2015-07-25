using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models
{
    /// <summary>
    /// Coordenador
    /// </summary>
    public class Coordinator : User
    {
        public virtual ICollection<Course> Courses { get; private set; }

        #region ctor
        public Coordinator()
        {
            this.Courses = new List<Course>();
        }
        #endregion
    }
}