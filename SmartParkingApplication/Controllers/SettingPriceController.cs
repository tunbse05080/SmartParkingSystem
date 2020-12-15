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
            foreach (var item in result)
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
                list.Add(new { item.PriceID, typeOfVehicle, item.DayPrice, item.MonthPrice, item.FirstBlock, item.NextBlock });
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateSP(Price price)
        {
            //var data = (from p in db.Prices
            //                  where p.ParkingPlaceID == price.ParkingPlaceID && p.TypeOfvehicle == price.TypeOfvehicle
            //                  select new { p.PriceID, p.NextBlock, p.FirstBlock, p.MonthPrice, p.TypeOfvehicle, p.ParkingPlaceID, price.DayPrice }).Single();
            //Price priceUpdate = new Price { 
            //        PriceID = data.PriceID, 
            //        TypeOfvehicle = data.TypeOfvehicle, 
            //        DayPrice = data.DayPrice, 
            //        MonthPrice = data.MonthPrice, 
            //        FirstBlock = data.FirstBlock, 
            //        NextBlock = data.NextBlock, 
            //        ParkingPlaceID = data.ParkingPlaceID };
            if (ModelState.IsValid)
            {
                db.Entry(price).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PriceDetails(int id)
        {
            Price price = db.Prices.Find(id);
            var TimeOfApply = price.TimeOfApply.Value.ToString("dd/MM/yyyy");
            var typeOfVehicle = "";
            switch (price.TypeOfvehicle)
            {
                case 0:
                    typeOfVehicle = "Xe máy";
                    break;
                case 1:
                    typeOfVehicle = "Ô tô";
                    break;
            }
            var result = new
            {
                typeOfVehicle,
                price.DayPrice,
                price.MonthPrice,
                price.FirstBlock,
                price.NextBlock,
                price.TimeOfFirstBlock,
                price.TimeOfNextBlock,
                TimeOfApply
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get price of daily ticket base on typeOfVehicle
        public JsonResult GetPrice(int typeOfVehicle, int ParkingPlaceID)
        {
            var result = (from p in db.Prices
                          where p.TypeOfvehicle == typeOfVehicle && p.ParkingPlaceID == ParkingPlaceID
                          select new { p.DayPrice, p.NextBlock, p.FirstBlock }).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}