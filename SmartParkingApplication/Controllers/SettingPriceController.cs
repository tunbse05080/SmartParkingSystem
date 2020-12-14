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

        public JsonResult UpdatePR(Price id)
        {
            if (ModelState.IsValid)
            {
                db.Entry(id).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(id, JsonRequestBehavior.AllowGet);
        }

        //get price of daily ticket base on typeOfVehicle
        public JsonResult GetPrice(int typeOfVehicle,int ParkingPlaceID)
        {
            var result = (from p in db.Prices
                          where p.TypeOfvehicle == typeOfVehicle && p.ParkingPlaceID == ParkingPlaceID
                          select new { p.DayPrice, p.NextBlock, p.FirstBlock }).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}