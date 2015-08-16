using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SistemaAcademico.Business.WebApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/secretaries")]
    public class SecretariesController : ApiController
    {
        private ApplicationDbContext _db;
        public SecretariesController(ApplicationDbContext db)
        {
            this._db = db;
        }

        [HttpGet]
        [Route("get-all-students")]
        public IHttpActionResult GetAllStudents()
        {
            var students = _db.Students
                                .Select(x => new
                                {
                                    UserName = x.UserName,
                                    Email = x.Email,
                                    Course = x.Course.Name,
                                    AmountSubject = x.SchoolClasses.Count
                                }).ToList();

            if (students != null)
                return Ok(students);

            return NotFound();
        }


        [HttpGet]
        [Route("get-info-student")]
        public IHttpActionResult GetInfoStudent(string studentUserName)
        {
            var students = _db.Students
                                .Where(x => x.UserName == studentUserName)
                                .Select(x => new
                                {
                                    UserName = x.UserName,
                                    Email = x.Email,
                                    Scores = x.Scores.OrderBy(y => y.SchoolClass.StarDate).Select(y => new
                                    {
                                        Value = y.Value,
                                        Subject = y.SchoolClass.Subject.Name,
                                        SchoolClass = y.SchoolClass.Name,
                                        StartDate = y.SchoolClass.StarDate,
                                        EndDate = y.SchoolClass.EndDate
                                    })
                                    .ToList()
                                })
                                .FirstOrDefault();

            if (students != null)
                return Ok(students);

            return NotFound();
        }
    }
}
