using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SistemaAcademico.Business.WebApi.Controllers
{
    [RoutePrefix("api/coordinators")]
    [Authorize]
    public class CoordinatorsController : ApiController
    {
        private ApplicationDbContext _db;
        public CoordinatorsController(ApplicationDbContext db)
        {
            this._db = db;
        }
    }
}
