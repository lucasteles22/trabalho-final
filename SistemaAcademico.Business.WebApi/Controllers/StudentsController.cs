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
    [Authorize]
    public class StudentsController : ApiController
    {
        private ApplicationDbContext _db;
        public StudentsController(ApplicationDbContext db)
        {
            this._db = db;
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<object> Get()
        {
            return _db.Students.OrderBy(x => x.UserName).Select(x => new { UserName = x.UserName, Id = x.Id }).ToList(); ;
        }

        [HttpGet]
        [Route("info")]
        [AllowAnonymous]
        public IHttpActionResult GetInfo(string userName)
        {
            var student = _db.Students
                                .Where(x => x.UserName == userName)
                                .Select(x => new 
                                { 
                                    UserName = userName, 
                                    Email = x.Email, 
                                    Scores = x.Scores.Select(y => new 
                                    {
                                        Value = y.Value, 
                                        Subject = y.SchoolClass.Subject.Name, 
                                        SchoolClass = y.SchoolClass.Name 
                                    }).ToList()
                                })
                                .FirstOrDefault();

            if (student != null)
                return Ok(student);

            return NotFound();
        }
    }
}
