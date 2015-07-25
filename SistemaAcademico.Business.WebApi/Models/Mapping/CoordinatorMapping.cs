using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SistemaAcademico.Business.WebApi.Models.Mapping
{
    public class CoordinatorMapping : EntityTypeConfiguration<Coordinator>
    {
        public CoordinatorMapping()
        {
            ToTable("Coordinators");
        }
    }
}