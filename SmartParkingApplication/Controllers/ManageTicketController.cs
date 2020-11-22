using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageTicketController : Controller
    {
        // GET: ManageTicket
        public ActionResult Index()
        {
            return View();
        }

        //List ExtendTicket
        public ActionResult ListExtendTicket()
        {
            return View();
        }
    }
}