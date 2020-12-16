using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class SettingController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: Setting
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult LoadDataPrice(int page, String name, int pageSize = 5  )
        {
            var set = from s in db.Prices select new { s.PriceID,s.TypeOfvehicle,s.DayPrice,s.FirstBlock,s.NextBlock};
           

            List<Object> list = new List<object>();
            foreach (var item in set)
            {
               
               
                var tr = new { PriceID = item.PriceID, TypeOfvehicle = item.TypeOfvehicle, FirstBlock = item.FirstBlock,NextBlock = item.NextBlock };
                list.Add(tr);
            }

            var totalRow = list.Count();
            var result = list.Skip((page - 1) * pageSize).Take(pageSize);

            return Json(new { data = result, total = totalRow }, JsonRequestBehavior.AllowGet);
        }
    }
}