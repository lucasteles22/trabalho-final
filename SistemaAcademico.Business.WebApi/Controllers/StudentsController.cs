using SistemaAcademico.Business.WebApi.Models;
using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SistemaAcademico.Business.WebApi.Controllers
{
    [RoutePrefix("api/students")]
    public class StudentsController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IEnumerable<string> Get()
        {
            IEnumerable<string> students = new List<string>();
            using (var db = new ApplicationDbContext())
            {
                students = db.Students.OrderBy(x => x.UserName).Select(x => x.UserName).ToList();
            }
            return students;
        }
    }
}
