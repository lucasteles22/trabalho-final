using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Microsoft.Owin.Security.DataProtection;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SistemaAcademico.Business.WebApi.App_Start.Identity;
using SistemaAcademico.Business.WebApi.Models;
using SistemaAcademico.Business.WebApi.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SistemaAcademico.Business.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            SimpleInjector();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        private void SimpleInjector()
        {
            // Create the container as usual.
            var container = new Container();

            // Register your types, for instance using the RegisterWebApiRequest
            // extension from the integration package:
            container.RegisterWebApiRequest<ApplicationUserManager>();
            container.RegisterWebApiRequest<ApplicationDbContext>();
            container.RegisterWebApiRequest<IUserStore<User>>(() => new Microsoft.AspNet.Identity.EntityFramework.UserStore<User>(container.GetInstance<ApplicationDbContext>()));
            container.RegisterWebApiRequest<ISecureDataFormat<AuthenticationTicket>, SecureDataFormat<AuthenticationTicket>>();
            container.RegisterWebApiRequest<ITextEncoder, Base64UrlTextEncoder>();
            container.RegisterWebApiRequest<IDataSerializer<AuthenticationTicket>, TicketSerializer>();
            container.RegisterWebApiRequest<IDataProtector>(() => new Microsoft.Owin.Security.DataProtection.DpapiDataProtectionProvider().Create("ASP.NET Identity"));
            

            // This is an extension method from the integration package.
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
            container.Verify();
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}
