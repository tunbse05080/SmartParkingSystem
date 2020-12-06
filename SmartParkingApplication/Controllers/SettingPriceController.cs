using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class SettingPriceController : Controller
    {
        // GET: SettingPrice
        private SmartParkingsEntities db = new SmartParkingsEntities();
        public ActionResult Index()
        {
            return View();
        }
    }
}