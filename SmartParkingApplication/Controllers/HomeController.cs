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

            List<User> listUser = db.Users.Where(u => u.Account.Role.RoleID == 2).ToList();
            List<ParkingPlace> listPPlace = db.ParkingPlaces.ToList();
            List<MonthlyTicket> listMonthlyTickets = db.MonthlyTickets.ToList();
            ViewBag.NumberOfUser = listUser.Count();
            ViewBag.NumberOfPPlace = listPPlace.Count();
            ViewBag.NumberOfMTicket = listMonthlyTickets.Count();
            ViewBag.TotalIncome = TotalIncome();
            return View();
        }

        //Load total income of each Vehicle in the most nearly 12 months
        public JsonResult loadChartDashboard()
        {
            List<double> listIncomeMoto = new List<double>();
            List<double> listIncomeCar = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                //get income dataMoto of DailyTicket ( most nearly 12 months )
                var dataMotoDailyTK = (from tr in db.Transactions
                                where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.TypeOfTicket == 1)
                                select new { tr.TotalPrice }).ToList();

                //get income dataCar of DailyTicket ( most nearly 12 months )
                var dataCarDailyTK = (from tr in db.Transactions
                               where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.TypeOfTicket == 1)
                               select new { tr.TotalPrice }).ToList();

                //get income dataMoto of MonthlyTicket ( most nearly 12 months )
                var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                select new { mi.TotalPrice }).ToList();

                //get income dataCar of MonthlyTicket ( most nearly 12 months )
                var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                               where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 1)
                               select new { mi.TotalPrice }).ToList();

                var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();

                listIncomeMoto.Add((double)sumMoto);
                listIncomeCar.Add((double)sumCar);

            }
            listIncomeMoto.Reverse();
            listIncomeCar.Reverse();
            return Json(new { listIncomeMoto, listIncomeCar }, JsonRequestBehavior.AllowGet);
        }

        //Get total income of all vehicle in current month
        public string TotalIncome()
        {
            int data;
            //get income dataMoto of DailyTicket ( the current month )
            var dataMotoDailyTK = (from tr in db.Transactions
                                   where (tr.TimeOutv.Value.Month == DateTime.Now.Month) && (tr.TypeOfVerhicleTran == 0) && (tr.TypeOfTicket == 1)
                                   select new { tr.TotalPrice }).ToList();

            //get income dataCar of DailyTicket ( the current month )
            var dataCarDailyTK = (from tr in db.Transactions
                                  where (tr.TimeOutv.Value.Month == DateTime.Now.Month) && (tr.TypeOfVerhicleTran == 1) && (tr.TypeOfTicket == 1)
                                  select new { tr.TotalPrice }).ToList();

            //get income dataMoto of MonthlyTicket ( the current month )
            var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                     where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month) && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                     select new { mi.TotalPrice }).ToList();

            //get income dataCar of MonthlyTicket ( the current month )
            var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                    where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month) && (mi.MonthlyTicket.TypeOfVehicle == 1)
                                    select new { mi.TotalPrice }).ToList();

            var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
            var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();

            data = (int)(sumCar + sumMoto);
            string result = String.Format("{0:#,#.}", data);
            return result;
        }


    }
}
