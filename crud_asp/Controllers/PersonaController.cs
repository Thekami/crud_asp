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
        persona Persona = new persona();

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
            persona[] x = Persona.read(status);
            return Json(x);
        }

        //public JsonResult add(persona persona)
        //{
        //    persona Persona = new persona();
        //    int result = Persona.add(persona);

        //    return Json(result);
        //}

        public JsonResult add(persona persona)
        {
            int result = Persona.add(persona);
            return Json(result);
        }

        public JsonResult delete(String id)
        {
            int result = Persona.delete(id);
            return Json(result);
        }

        public JsonResult update(persona persona)
        {
            int result = Persona.update(persona);
            return Json(result);
        }

        public JsonResult get(String id)
        {
            persona[] result = Persona.get(id);
            return Json(result);
        }
    }
}