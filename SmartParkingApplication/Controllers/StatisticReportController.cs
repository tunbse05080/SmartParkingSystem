using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SmartParkingApplication.Controllers
{
    //[Authorize(Roles = "Quản lý")]
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

        public ActionResult WorkingShiftStatistic()
        {
            return View();
        }

        //Load Chart IncomeStatistic
        public JsonResult LoadDataIncome(int idParking, int idTypeOfTicket)
        {
            List<Object> list = new List<object>();
            for (int i = 0; i < 12; i++)
            {
                if (idTypeOfTicket == 1)
                {
                    DateTime dateTime = DateTime.Now.AddMonths(-i);
                    //get income dataMoto of DailyTicket ( most nearly 12 months )
                    var dataMoto = (from tr in db.Transactions
                                    where tr.TimeOutv.Value.Year == dateTime.Year && tr.TimeOutv.Value.Month == dateTime.Month && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == 1)
                                    select new { tr.TotalPrice }).ToList();
                    var sumMoto = dataMoto.Select(s => s.TotalPrice).Sum();

                    //get income dataCar of DailyTicket ( most nearly 12 months )
                    var dataCar = (from tr in db.Transactions
                                   where tr.TimeOutv.Value.Year == dateTime.Year && tr.TimeOutv.Value.Month == dateTime.Month && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking) && (tr.TypeOfTicket == 1)
                                   select new { tr.TotalPrice }).ToList();
                    var sumCar = dataCar.Select(s => s.TotalPrice).Sum();
                    Object data = new { dateTime.Month, sumCar, sumMoto };
                    list.Add(data);
                }
                else
                {
                    DateTime dateTime = DateTime.Now.AddMonths(-i);
                    //get income dataMoto of MonthlyTicket ( most nearly 12 months )
                    var dataMoto = (from mi in db.MonthlyIncomeStatements
                                    where mi.PaymentDate.Value.Year == dateTime.Year && mi.PaymentDate.Value.Month == dateTime.Month && (mi.MonthlyTicket.TypeOfVehicle == 0) && mi.MonthlyTicket.ParkingPlaceID == idParking
                                    select new { mi.TotalPrice }).ToList();
                    var sumMoto = dataMoto.Select(s => s.TotalPrice).Sum();

                    //get income dataCar of MonthlyTicket ( most nearly 12 months )
                    var dataCar = (from mi in db.MonthlyIncomeStatements
                                   where mi.PaymentDate.Value.Year == dateTime.Year && mi.PaymentDate.Value.Month == dateTime.Month && (mi.MonthlyTicket.TypeOfVehicle == 1) && mi.MonthlyTicket.ParkingPlaceID == idParking
                                   select new { mi.TotalPrice }).ToList();
                    var sumCar = dataCar.Select(s => s.TotalPrice).Sum();
                    Object data = new { dateTime.Month, sumCar, sumMoto };
                    list.Add(data);
                }
            }
            list.Reverse();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Load Chart CarDensity
        public JsonResult LoadDataIncomeAll(int choice)
        {
            var result = (from tr in db.ParkingPlaces
                          select new { tr.ParkingPlaceID, tr.NameOfParking }).ToList();
            List<Object> list = new List<object>();
            if (choice == 0)
            {
                foreach (var item in result)
                {

                    var dataMotoDailyTK = (from tr in db.Transactions
                                           where tr.TimeOutv.Value.Year == DateTime.Now.Year && tr.TimeOutv.Value.Month == DateTime.Now.Month && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == item.ParkingPlaceID)
                                           select new { tr.TotalPrice }).ToList();

                    var dataCarDailyTK = (from tr in db.Transactions
                                          where tr.TimeOutv.Value.Year == DateTime.Now.Year && tr.TimeOutv.Value.Month == DateTime.Now.Month && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == item.ParkingPlaceID)
                                          select new { tr.TotalPrice }).ToList();

                    var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                             where mi.PaymentDate.Value.Year == DateTime.Now.Year && mi.PaymentDate.Value.Month == DateTime.Now.Month && (mi.MonthlyTicket.TypeOfVehicle == 0) && mi.MonthlyTicket.ParkingPlaceID == item.ParkingPlaceID
                                             select new { mi.TotalPrice }).ToList();

                    var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                            where mi.PaymentDate.Value.Year == DateTime.Now.Year && mi.PaymentDate.Value.Month == DateTime.Now.Month && (mi.MonthlyTicket.TypeOfVehicle == 1) && mi.MonthlyTicket.ParkingPlaceID == item.ParkingPlaceID
                                            select new { mi.TotalPrice }).ToList();

                    var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                    var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();

                    Object data = new { item.NameOfParking, sumMoto, sumCar };
                    list.Add(data);
                }
            }
            else
            {
                foreach (var item in result)
                {
                    var dataMotoDailyTK = (from tr in db.Transactions
                                           where tr.TimeOutv.Value.Year == DateTime.Now.Year && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == item.ParkingPlaceID)
                                           select new { tr.TotalPrice }).ToList();

                    var dataCarDailyTK = (from tr in db.Transactions
                                          where tr.TimeOutv.Value.Year == DateTime.Now.Year && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == item.ParkingPlaceID)
                                          select new { tr.TotalPrice }).ToList();

                    var dataMotoMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                             where mi.PaymentDate.Value.Year == DateTime.Now.Year && (mi.MonthlyTicket.TypeOfVehicle == 0) && mi.MonthlyTicket.ParkingPlaceID == item.ParkingPlaceID
                                             select new { mi.TotalPrice }).ToList();

                    var dataCarMonthlyTK = (from mi in db.MonthlyIncomeStatements
                                            where mi.PaymentDate.Value.Year == DateTime.Now.Year && (mi.MonthlyTicket.TypeOfVehicle == 1) && mi.MonthlyTicket.ParkingPlaceID == item.ParkingPlaceID
                                            select new { mi.TotalPrice }).ToList();

                    var sumMoto = dataMotoDailyTK.Select(s => s.TotalPrice).Sum() + dataMotoMonthlyTK.Select(s => s.TotalPrice).Sum();
                    var sumCar = dataCarDailyTK.Select(s => s.TotalPrice).Sum() + dataCarMonthlyTK.Select(s => s.TotalPrice).Sum();

                    Object data = new { item.NameOfParking, sumMoto, sumCar };
                    list.Add(data);
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Load Chart CarDensity
        public JsonResult LoadChartCarDensity(int idParking)
        {
            List<Object> list = new List<Object>();
            for (int i = 0; i < 12; i++)
            {
                DateTime dateTime = DateTime.Now.AddMonths(-i);
                //get density dataMoto base on ParkingPlace ID ( most nearly 12 months )
                var dataMoto = (from tr in db.Transactions
                                where tr.TimeIn.Value.Year == dateTime.Year && tr.TimeIn.Value.Month == dateTime.Month  && (tr.TypeOfVerhicleTran == 0) && (tr.ParkingPlaceID == idParking)
                                select new { tr.TypeOfVerhicleTran, tr.TimeIn.Value.Month }).ToList();

                //get density dataCar base on ParkingPlace ID ( most nearly 12 months )
                var dataCar = (from tr in db.Transactions
                               where tr.TimeIn.Value.Year == dateTime.Year && tr.TimeIn.Value.Month == dateTime.Month && (tr.TypeOfVerhicleTran == 1) && (tr.ParkingPlaceID == idParking)
                               select new { tr.TypeOfVerhicleTran }).ToList();
                Object data = new { dateTime.Month, dataMoto = dataMoto.Count(), dataCar = dataCar.Count() };
                list.Add(data);
            }
            list.Reverse();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Load Chart CarDensity
        public JsonResult LoadChartCarDensityAll(int choice)
        {
            var result = (from tr in db.ParkingPlaces
                          select new { tr.ParkingPlaceID, tr.NameOfParking }).ToList();
            List<Object> list = new List<object>();
            if (choice == 0)
            {
                foreach (var item in result)
                {
                    //number moto come in of each parking on current monthly
                    var dataMoto = (from tr in db.Transactions
                                    where tr.TimeIn.Value.Year == DateTime.Now.Year && tr.TimeIn.Value.Month == DateTime.Now.Month && tr.ParkingPlaceID == item.ParkingPlaceID && tr.TypeOfVerhicleTran == 0
                                    select new { tr.ParkingPlace.NameOfParking, tr.TypeOfVerhicleTran }).ToList();
                    //number car come in of each parking on current monthly
                    var dataCar = (from tr in db.Transactions
                                   where tr.TimeIn.Value.Year == DateTime.Now.Year && tr.TimeIn.Value.Month == DateTime.Now.Month && tr.ParkingPlaceID == item.ParkingPlaceID && tr.TypeOfVerhicleTran == 1
                                   select new { tr.ParkingPlace.NameOfParking, tr.TypeOfVerhicleTran }).ToList();
                    var data = new { item.NameOfParking, dataMoto = dataMoto.Count(), dataCar = dataCar.Count() };
                    list.Add(data);
                }
            }
            else
            {
                foreach (var item in result)
                {
                    //number moto come in of each parking on current year
                    var dataMoto = (from tr in db.Transactions
                                    where tr.TimeIn.Value.Year == DateTime.Now.Year && tr.ParkingPlaceID == item.ParkingPlaceID && tr.TypeOfVerhicleTran == 0
                                    select new { tr.ParkingPlace.NameOfParking, tr.TypeOfVerhicleTran }).ToList();
                    //number car come in of each parking on current year
                    var dataCar = (from tr in db.Transactions
                                   where tr.TimeIn.Value.Year == DateTime.Now.Year && tr.ParkingPlaceID == item.ParkingPlaceID && tr.TypeOfVerhicleTran == 1
                                   select new { tr.ParkingPlace.NameOfParking, tr.TypeOfVerhicleTran }).ToList();
                    var data = new { item.NameOfParking, dataMoto = dataMoto.Count(), dataCar = dataCar.Count() };
                    list.Add(data);
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //count number shift of staff follow username ( most nearly 12 months )
        public JsonResult LoadDataWorkingShift(int id)
        {
            List<Object> list = new List<Object>();
            for (int i = 0; i < 12; i++)
            {
                DateTime dateTime = DateTime.Now.AddMonths(-i);
                var result = (from us in db.UserSchedules
                            where us.User.Account.AccountID == id && us.Schedule.TimeStart.Value.Year == dateTime.Year && us.Schedule.TimeStart.Value.Month == dateTime.Month
                              select new { us.UserScheduleID }).ToList();
                Object data = new { dateTime.Month, total = result.Count() };
                list.Add(data);
            }
            list.Reverse();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Load data report income base on parkingplace, date, workingShift
        public JsonResult LoadDataIncomeReport(int id, DateTime dateTime, int workingShift)
        {
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
                          where tr.ParkingPlaceID == id && DateTime.Compare((DateTime)tr.TimeOutv, dateFrom) > 0 && DateTime.Compare((DateTime)tr.TimeOutv, dateTo) <= 0
                          select new { tr.User.Account.UserName, tr.User.Name, tr.TotalPrice } into table1
                          group table1 by table1.UserName into groupby
                          select new { groupby.FirstOrDefault().UserName, groupby.FirstOrDefault().Name, totalPrice = groupby.Sum(x => x.TotalPrice) }).ToList();
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
        //public List<double> ListIncome12Monthlys()
        //{
        //    List<double> listMotoDestiny = new List<double>();
        //    List<double> listCarDestiny = new List<double>();
        //    for (int i = 0; i < 12; i++)
        //    {
        //        //get density dataMoto base on ParkingPlace ID ( most nearly 12 months )
        //        var dataMoto = (from tr in db.Transactions
        //                        where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 0)
        //                        select new { tr.TypeOfVerhicleTran }).ToList();
        //        listMotoDestiny.Add(dataMoto.Count());

        //        //get density dataCar base on ParkingPlace ID ( most nearly 12 months )
        //        var dataCar = (from tr in db.Transactions
        //                       where (tr.TimeOutv.Value.Month == DateTime.Now.Month - i) && (tr.TypeOfVerhicleTran == 1)
        //                       select new { tr.TypeOfVerhicleTran }).ToList();
        //        listCarDestiny.Add(dataCar.Count());
        //    }
        //    listMotoDestiny.Reverse();
        //    listCarDestiny.Reverse();
        //    return null;
        //}


        //public ActionResult ExportIncome12Monthlys()
        //{
        //    var schedule = db.Schedules.ToList();
        //    var useschedule = db.UserSchedules.ToList();
        //    // var role = db.Roles.ToList();
        //    var alluser = new GridView();
        //    //===================================================
        //    DataTable dt = new DataTable();
        //    //Add Datacolumn
        //    DataColumn workCol = dt.Columns.Add("Tên chủ thẻ", typeof(String));

        //    dt.Columns.Add("Ca làm việc", typeof(String));
        //    dt.Columns.Add("Số điện thoại", typeof(String));
        //    dt.Columns.Add("Email", typeof(String));
        //    dt.Columns.Add("Loại xe", typeof(String));
        //    dt.Columns.Add("Ngày đăng kí", typeof(String));
        //    dt.Columns.Add("Ngày hết hạn", typeof(String));

        //    foreach (var item in Schedule)
        //    {
        //        DataRow newRow = dt.NewRow();
        //        string typeVehicle = "";
        //        switch (item.TypeOfVehicle)
        //        {
        //            case 0:
        //                typeVehicle = "Xe Máy";
        //                break;
        //            case 1:
        //                typeVehicle = "Ô tô";
        //                break;
        //        }
        //        newRow["Tên chủ thẻ"] = item.CusName;
        //        newRow["Số CMND"] = item.IdentityCard;
        //        newRow["Số điện thoại"] = item.Phone;
        //        newRow["Email"] = item.Email;
        //        newRow["Loại xe"] = typeVehicle;
        //        newRow["Ngày đăng kí"] = item.RegisDate;
        //        newRow["Ngày hết hạn"] = item.ExpiryDate;

        //        dt.Rows.Add(newRow);
        //    }

        //    //====================================================
        //    alluser.DataSource = dt;
        //    // gv.DataSource = ds;
        //    alluser.DataBind();

        //    Response.ClearContent();
        //    Response.Buffer = true;

        //    Response.AddHeader("content-disposition", "attachment; filename=danh-sach.xls");
        //    Response.ContentType = "application/ms-excel";

        //    Response.Charset = "";
        //    StringWriter objStringWriter = new StringWriter();
        //    HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);

        //    alluser.RenderControl(objHtmlTextWriter);

        //    Response.Output.Write(objStringWriter.ToString());
        //    Response.Flush();
        //    Response.End();
        //    return Redirect("/StatisticReport/IncomeStatistic");
        //}
    }
}