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
        public JsonResult LoadDataPrice(int pagepr, String namepr, int pageSizepr = 5)
        {
            var set = from s in db.Prices select new { s.PriceID, s.TypeOfvehicle, s.DayPrice, s.MonthPrice, s.FirstBlock, s.NextBlock };


            List<Object> list = new List<object>();
            foreach (var item in set)
            {


                var s = new { PriceID = item.PriceID, TypeOfvehicle = item.TypeOfvehicle, MonthPrice = item.MonthPrice, FirstBlock = item.FirstBlock, NextBlock = item.NextBlock };
                list.Add(s);
            }

            var totalRowpr = list.Count();
            var result = list.Skip((pagepr - 1) * pageSizepr).Take(pageSizepr);

            return Json(new { datapr = result, total = totalRowpr }, JsonRequestBehavior.AllowGet);
        }
    }
}