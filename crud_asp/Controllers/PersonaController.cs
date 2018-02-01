using crud_asp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace crud_asp.Controllers
{
    public class PersonaController : Controller
    {

        // GET: Persona
        public ActionResult Index()
        {

            //ViewBag.Message = "Mostrar personas";

            //persona Persona = new persona();
            //persona[] x = Persona.read();

            return View();
        }

        public JsonResult read(String status)
        {
            persona Persona = new persona();
            persona[] x = Persona.read(status);

            return Json(x);
        }
    }
}