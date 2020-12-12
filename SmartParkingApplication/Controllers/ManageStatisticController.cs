using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManageStatisticController : Controller
    {
        // GET: ManageStatistic
        private SmartParkingsEntities db = new SmartParkingsEntities();

        public ActionResult IncomeStatistic()
        {
            return View();
        }

        public JsonResult LoadDataIncome()
        {
            List<double> list = new List<double>();
            for (int i = 0; i < 12; i++)
            {
                var data = (from tr in db.Transactions
                            where tr.TimeOutv.Value.Month == DateTime.Now.Month - i
                            select new { tr.TotalPrice }).ToList();
                var sum = data.Select(s => s.TotalPrice).Sum();
                int count = data.Count();
                list.Add((double)sum);
            }
            list.Reverse();
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        public ActionResult DensityStatistic()
        {
            return View();
        }
    }
}