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
            try
            {
                List<User> listUser = db.Users.Where(u => u.Account.Role.RoleID == 1).ToList();
                List<ParkingPlace> listPPlace = db.ParkingPlaces.ToList();
                List<MonthlyTicket> listMonthlyTickets = db.MonthlyTickets.ToList();
                ViewBag.NumberOfUser = listUser.Count();
                ViewBag.NumberOfPPlace = listPPlace.Count();
                ViewBag.NumberOfMTicket = listMonthlyTickets.Count();
                ViewBag.TotalIncome = TotalIncome();
            }catch (Exception)
            {
                return Redirect("/ErrorPage");
            }
            return View();
        }

        //Load total income of each Vehicle in the most nearly 12 months
        public JsonResult loadChartDashboard()
        {
            List<Object> list = new List<object>();
            try
            {
                for (int i = 0; i < 12; i++)
                {
                    DateTime dateTime = DateTime.Now.AddMonths(-i);
                    //get income dataMoto of DailyTicket ( most nearly 12 months )
                    var dataMotoDailyTK = (from tr in db.Transactions
                                           where tr.TimeOutv.Value.Year == dateTime.Year && tr.TimeOutv.Value.Month == dateTime.Month && (tr.TypeOfVerhicleTran == 0) && (tr.TypeOfTicket == 1)
                                           select new { tr.TotalPrice }).ToList();

                    //get income dataCar of DailyTicket ( most nearly 12 months )
                    var dataCarDailyTK = (from tr in db.Transactions
                                          where tr.TimeOutv.Value.Year == dateTime.Year && tr.TimeOutv.Value.Month == dateTime.Month && (tr.TypeOfVerhicleTran == 1) && (tr.TypeOfTicket == 1)
                                          select new { tr.TotalPrice }).ToList();

                    //get income dataMoto of MonthlyTicket ( most nearly 12 months )
                    var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                             where mi.PaymentDate.Value.Year == dateTime.Year && mi.PaymentDate.Value.Month == dateTime.Month && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                             select new { mi.TotalPrice }).ToList();

                    //get income dataCar of MonthlyTicket ( most nearly 12 months )
                    var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                            where mi.PaymentDate.Value.Year == dateTime.Year && mi.PaymentDate.Value.Month == dateTime.Month && (mi.MonthlyTicket.TypeOfVehicle == 1)
                                            select new { mi.TotalPrice }).ToList();

                    var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                    var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();
                    Object data = new { datetime = dateTime.Month + "/" + dateTime.Year, sumMoto, sumCar };
                    list.Add(data);
                }
                list.Reverse();
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Get total income of all vehicle in current month
        public string TotalIncome()
        {
            string result = "";
            try
            {
                int data;
                //get income dataMoto of DailyTicket ( the current month )
                var dataMotoDailyTK = (from tr in db.Transactions
                                       where tr.TimeOutv.Value.Year == DateTime.Now.Year && tr.TimeOutv.Value.Month == DateTime.Now.Month && (tr.TypeOfVerhicleTran == 0) && (tr.TypeOfTicket == 1)
                                       select new { tr.TotalPrice }).ToList();

                //get income dataCar of DailyTicket ( the current month )
                var dataCarDailyTK = (from tr in db.Transactions
                                      where tr.TimeOutv.Value.Year == DateTime.Now.Year && tr.TimeOutv.Value.Month == DateTime.Now.Month && (tr.TypeOfVerhicleTran == 1) && (tr.TypeOfTicket == 1)
                                      select new { tr.TotalPrice }).ToList();

                //get income dataMoto of MonthlyTicket ( the current month )
                var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                         where mi.PaymentDate.Value.Year == DateTime.Now.Year && mi.PaymentDate.Value.Month == DateTime.Now.Month && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                         select new { mi.TotalPrice }).ToList();

                //get income dataCar of MonthlyTicket ( the current month )
                var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                        where mi.PaymentDate.Value.Year == DateTime.Now.Year && mi.PaymentDate.Value.Month == DateTime.Now.Month && (mi.MonthlyTicket.TypeOfVehicle == 1)
                                        select new { mi.TotalPrice }).ToList();

                var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();

                data = (int)(sumCar + sumMoto);
                result = String.Format("{0:#,#.}", data);
            }
            catch (Exception)
            {
                return "";
            }
            return result;
        }
    }
}
