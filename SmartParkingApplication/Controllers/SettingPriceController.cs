using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public JsonResult LoadDataPrice(int ParkingPlaceID)
        {
            List<Object> list = new List<Object>();
            var result = (from s in db.Prices
                          where s.ParkingPlaceID == ParkingPlaceID
                          select new { s.PriceID, s.TypeOfvehicle, s.DayPrice, s.MonthPrice, s.FirstBlock, s.NextBlock }).ToList();
            foreach(var item in result)
            {
                var typeOfVehicle = "";
                switch (item.TypeOfvehicle)
                {
                    case 0:
                        typeOfVehicle = "Xe máy";
                        break;
                    case 1:
                        typeOfVehicle = "Ô tô";
                        break;
                }
                list.Add(new { typeOfVehicle , item.DayPrice, item.MonthPrice, item.FirstBlock, item.NextBlock });
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ComboboxTypeOfVehicle()
        {
            var list = db.Prices.Select(u => u.TypeOfvehicle).Distinct().ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePR(Price id)
        {
            if (ModelState.IsValid)
            {
                db.Entry(id).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(id, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Details(string typeOfvehicle)
        {
            var set = db.Prices.Find(typeOfvehicle);

            var result = new { set.PriceID, set.TypeOfvehicle, set.DayPrice, set.MonthPrice, set.FirstBlock, set.NextBlock };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PriceDetails(int id)
        {
            var pr = db.Prices.Find(id);


            var result = new { pr.PriceID, pr.TypeOfvehicle, pr.DayPrice, pr.MonthPrice, pr.FirstBlock, pr.NextBlock };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}