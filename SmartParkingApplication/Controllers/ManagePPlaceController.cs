using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManagePPlaceController : Controller
    {
        // GET: ManageParkingPlace
        public ActionResult ManageStatusParkingPlace()
        {
            return View();
        }

        public ActionResult ListParkingPlace()
        {
            return View();
        }

        public ActionResult CreateParkingPlace()
        {
            return View();
        }
    }
}