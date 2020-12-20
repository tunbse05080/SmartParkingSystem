using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class StatisticReportController : Controller
    {
        // GET: ManageStatistic
        private SmartParkingsEntities db = new SmartParkingsEntities();

        public ActionResult IncomeStatistic()
        {
            return View();
        }

        public ActionResult DensityStatistic()
        {
            return View();
        }

        public ActionResult IncomeReport()
        {
            return View();
        }

        //Load Chart IncomeStatistic
        public JsonResult LoadDataIncome(int idParking, int idTypeOfTicket)
        {
            List<double> listIncomeMoto = new List<double>();
            List<double> listIncomeCar = new List<double>();
            for (int i = 0; i < 12; i++)
            {

                if (idTypeOfTicket == 1)
                {
                    //get income dataMoto of DailyTicket ( most nearly 12 months )
                    var dataMoto = (from tr in db.Transactions
                                    where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == 1)
                                    select new { tr.TotalPrice }).ToList();
                    var sumMoto = dataMoto.Select(s => s.TotalPrice).Sum();
                    listIncomeMoto.Add((double)sumMoto);

                    //get income dataCar of DailyTicket ( most nearly 12 months )
                    var dataCar = (from tr in db.Transactions
                                   where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == 1)
                                   select new { tr.TotalPrice }).ToList();
                    var sumCar = dataCar.Select(s => s.TotalPrice).Sum();
                    listIncomeCar.Add((double)sumCar);
                }
                else
                {
                    //get income dataMoto of MonthlyTicket ( most nearly 12 months )
                    var dataMoto = (from mi in db.MonthlyIncomeStatements
                                    where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 0)
                                    select new { mi.TotalPrice }).ToList();
                    var sumMoto = dataMoto.Select(s => s.TotalPrice).Sum();
                    listIncomeMoto.Add((double)sumMoto);

                    //get income dataCar of MonthlyTicket ( most nearly 12 months )
                    var dataCar = (from mi in db.MonthlyIncomeStatements
                                   where (mi.MonthlyTicket.RegisDate.Value.Month == DateTime.Now.Month - i) && (mi.MonthlyTicket.TypeOfVehicle == 1)
                                   select new { mi.TotalPrice }).ToList();
                    var sumCar = dataCar.Select(s => s.TotalPrice).Sum();
                    listIncomeCar.Add((double)sumCar);
                }
            }
            listIncomeMoto.Reverse();
            listIncomeCar.Reverse();
            return Json(new { listIncomeMoto, listIncomeCar }, JsonRequestBehavior.AllowGet);
        }

        //Load Chart CarDensity
        public JsonResult LoadChartCarDensity(int idParking)
        {
            List<double> listMotoDestiny = new List<double>();
            List<double> listCarDestiny = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                //get density dataMoto base on ParkingPlace ID ( most nearly 12 months )
                var dataMoto = (from tr in db.Transactions
                                where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking)
                                select new { tr.TypeOfVerhicleTran }).ToList();
                listMotoDestiny.Add(dataMoto.Count());

                //get density dataCar base on ParkingPlace ID ( most nearly 12 months )
                var dataCar = (from tr in db.Transactions
                               where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking)
                               select new { tr.TypeOfVerhicleTran }).ToList();
                listCarDestiny.Add(dataCar.Count());
            }
            listMotoDestiny.Reverse();
            listCarDestiny.Reverse();
            return Json(new { listMotoDestiny, listCarDestiny }, JsonRequestBehavior.AllowGet);
        }

        //Load data report income base on parkingplace, date, workingShift
        public JsonResult LoadDataIncomeReport(int id, DateTime dateTime, int workingShift)
        {
            //dateTime.ToString("MM/dd/yyyy HH:mm:ss");
            DateTime dateFrom = dateTime;
            DateTime dateTo = dateTime;
            switch (workingShift)
            {
                case 0:
                    dateTo = dateTime.Add(TimeSpan.Parse("23:59:59"));
                    break;
                case 1:
                    dateFrom = dateTime.Add(TimeSpan.Parse("06:00:00"));
                    dateTo = dateTime.Add(TimeSpan.Parse("14:00:00"));
                    break;
                case 2:
                    dateFrom = dateTime.Add(TimeSpan.Parse("14:00:00"));
                    
                    dateTo = dateTime.Add(TimeSpan.Parse("22:00:00"));
                    break;
                case 3:
                    dateFrom = dateTime.Add(TimeSpan.Parse("22:00:00"));
                    dateTo = dateTime.Add(TimeSpan.Parse("06:00:00"));
                    dateTo = dateTo.AddDays(1);
                    break;
            }
            var result = (from tr in db.Transactions
                          where tr.ParkingPlaceID == id && DateTime.Compare((DateTime)tr.TimeOutv, dateFrom) > 0 && DateTime.Compare((DateTime)tr.TimeOutv,dateTo) <= 0
                          select new {tr.User.Account.UserName, tr.User.Name, tr.TotalPrice} into table1
                          group table1 by table1.UserName into groupby
                          select new { groupby.FirstOrDefault().UserName, groupby.FirstOrDefault().Name, totalPrice = groupby.Sum(x => x.TotalPrice)}).ToList();
            //var result = db.Transactions.Where(tr => tr.ParkingPlaceID == id && tr.TimeOutv > dateFrom && tr.TimeOutv <= dateTo).GroupBy(tr => tr.UserOID).Select(tr => new { totalPrice = tr.Sum(b => b.TotalPrice).ToString(), Name = tr. });
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //combobox Gender
        public JsonResult ComboboxNameParking()
        {
            var list = (from p in db.ParkingPlaces
                        select new { p.ParkingPlaceID, p.NameOfParking }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult ComboboxStaffName()
        //{
        //    var list = (from p in db.Users
        //                where p.AccountID != null && p.Account.RoleID == 2
        //                select new { p.UserID, p.Account.UserName }).ToList();

        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}
    }
}