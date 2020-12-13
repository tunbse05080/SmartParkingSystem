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
        SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: Home
        public ActionResult Index()
        {

            List<User> listUser = db.Users.ToList();
            List<ParkingPlace> listPPlace = db.ParkingPlaces.ToList();
            List<MonthlyTicket> listMonthlyTickets = db.MonthlyTickets.ToList();
            ViewBag.NumberOfUser = listUser.Count();
            ViewBag.NumberOfPPlace = listPPlace.Count();
            ViewBag.NumberOfMTicket = listMonthlyTickets.Count();
            return View();
        }

        public JsonResult loadChartDashboard()
        {
            List<double> listIncomeMoto = new List<double>();
            List<double> listIncomeCar = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                //get income dataMotoDailyTK of DailyTicket ( most nearly 12 months )
                var dataMotoDailyTK = (from tr in db.Transactions
                                where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.TypeOfTicket == 1)
                                select new { tr.TotalPrice }).ToList();

                //get income dataCarDailyTK of DailyTicket ( most nearly 12 months )
                var dataCarDailyTK = (from tr in db.Transactions
                               where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.TypeOfTicket == 1)
                               select new { tr.TotalPrice }).ToList();

                //get income dataMotoMonthlyTK of MonthlyTicket ( most nearly 12 months )
                var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                select new { mi.TotalPrice }).ToList();

                //get income dataCarMonthlyTK of MonthlyTicket ( most nearly 12 months )
                var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                               where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 1)
                               select new { mi.TotalPrice }).ToList();

                var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarDailyTK.Select(s => s.TotalPrice).Sum();

                listIncomeMoto.Add((double)sumMoto);
                listIncomeCar.Add((double)sumCar);

            }
            listIncomeMoto.Reverse();
            listIncomeCar.Reverse();
            return Json(new { listIncomeMoto, listIncomeCar }, JsonRequestBehavior.AllowGet);
        }
    }
}
