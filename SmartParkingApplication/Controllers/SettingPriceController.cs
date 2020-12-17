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
            var result = (from p in db.Prices
                          where p.ParkingPlaceID == ParkingPlaceID
                          select new { p.PriceID, p.TypeOfvehicle, p.DayPrice, p.FirstBlock, p.NextBlock , p.TimeOfApply }).ToList();
            foreach (var item in result)
            {
                var TimeApply = item.TimeOfApply.Value.ToString("dd/MM/yyyy");
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
                list.Add(new { item.PriceID, typeOfVehicle, item.DayPrice, item.FirstBlock, item.NextBlock, TimeApply});
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadDataPriceMonthly(int ParkingPlaceID)
        {
            List<Object> list = new List<Object>();
            var result = (from p in db.MothlyPrices
                          where p.ParkingPlaceID == ParkingPlaceID
                          select new { p.MonthlyPriceID, p.TypeOfvehicle, p.MonthlyPrice,p.TimeOfApplyMontlhyPrice }).ToList();
            foreach (var item in result)
            {
                var TimeApply = item.TimeOfApplyMontlhyPrice.Value.ToString("dd/MM/yyyy");
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
                list.Add(new { item.MonthlyPriceID, typeOfVehicle, item.MonthlyPrice, TimeApply });
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Check Update for DailyPrice
        public JsonResult CheckUpdateDailyPrice(Price price)
        {
            var result = (from p in db.Prices
                          where p.ParkingPlaceID == price.ParkingPlaceID && p.TypeOfvehicle == price.TypeOfvehicle && p.TimeOfApply == price.TimeOfApply
                          select new { p.PriceID }).FirstOrDefault();
            if (price.PriceID == 0 && result == null)
            {
                price.FirstBlock = 0;
                price.NextBlock = 0;
                price.TimeOfNextBlock = 0;
                price.TimeOfFirstBlock = 0;
                Create(price);
            }
            else
            {
                price.PriceID = result.PriceID;
                price.FirstBlock = 0;
                price.NextBlock = 0;
                price.TimeOfNextBlock = 0;
                price.TimeOfFirstBlock = 0;
                Update(price);
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        //Check Update for BlockPrice
        public JsonResult CheckUpdateBlockPrice(Price price)
        {
            var result = (from p in db.Prices
                          where p.ParkingPlaceID == price.ParkingPlaceID && p.TypeOfvehicle == price.TypeOfvehicle && p.TimeOfApply == price.TimeOfApply
                          select new { p.PriceID }).FirstOrDefault();
            if (price.PriceID == 0 && result == null)
            {
                price.DayPrice = 0;
                Create(price);
            }
            else
            {
                price.PriceID = result.PriceID;
                price.DayPrice = 0;
                Update(price);
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        //Update monthly price for all parkingplace
        public JsonResult UpdateMonthlyPrice(MothlyPrice monthlyPrice)
        {
            var result = "";
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //create price day and block
        public JsonResult Create(Price price)
        {
            if (ModelState.IsValid)
            {
                db.Prices.Add(price);
                db.SaveChanges();
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        //update price price day and block
        public JsonResult Update(Price price)
        {
            //var errors = ModelState.Values.SelectMany(v => v.Errors);
            if (ModelState.IsValid)
            {
                db.Entry(price).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        //get detail info price of month ticket
        public JsonResult PriceMonthDetails(int id)
        {
            MothlyPrice price = db.MothlyPrices.Find(id);
            var TimeOfApply = price.TimeOfApplyMontlhyPrice.Value.ToString("dd/MM/yyyy");
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
                price.MonthlyPrice,
                TimeOfApply
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get detail info price of day and block
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
                price.FirstBlock,
                price.NextBlock,
                price.TimeOfFirstBlock,
                price.TimeOfNextBlock,
                TimeOfApply
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //get price of Monthly ticket base on typeOfVehicle
        //public JsonResult GetPriceMonthly(int typeOfVehicle)
        //{
        //    var result = (from p in db.Prices
        //                  where p.TypeOfvehicle == typeOfVehicle
        //                  select new {p.MonthPrice}).FirstOrDefault();
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}

    }
}