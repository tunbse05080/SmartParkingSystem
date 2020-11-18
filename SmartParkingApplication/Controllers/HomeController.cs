using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SmartParkingApplication.Models;

namespace SmartParkingApplication.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            SmartParkingEntities db = new SmartParkingEntities();
            List<User> listUser = db.Users.ToList();
            List<ParkingPlace> listPPlace = db.ParkingPlaces.ToList();
            List<MonthlyTicket> listMonthlyTickets = db.MonthlyTickets.ToList();
            ViewBag.NumberOfUser = listUser.Count();
            ViewBag.NumberOfPPlace = listPPlace.Count();
            ViewBag.NumberOfMTicket = listMonthlyTickets.Count();
            return View();
        }
    }
}
