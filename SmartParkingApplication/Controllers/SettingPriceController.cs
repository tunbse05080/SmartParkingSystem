﻿using SmartParkingApplication.Models;
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
                          select new { p.PriceID, p.TypeOfvehicle, p.DayPrice, p.MonthPrice, p.FirstBlock, p.NextBlock , p.TimeOfApply }).ToList();
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
                list.Add(new { item.PriceID, typeOfVehicle, item.DayPrice, item.MonthPrice, item.FirstBlock, item.NextBlock, TimeApply});
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //Check Update for DailyPrice
        public JsonResult CheckUpdate(Price price)
        {
            var result = (from p in db.Prices
                          where p.ParkingPlaceID == price.ParkingPlaceID && p.TypeOfvehicle == price.TypeOfvehicle && p.TimeOfApply == price.TimeOfApply
                          select new { p.PriceID, p.MonthPrice,p.FirstBlock,p.NextBlock,p.TimeOfFirstBlock,p.TimeOfNextBlock}).FirstOrDefault();
            if (price.PriceID == 0 || result == null)
            {
                price.PriceID = 0;
                price.MonthPrice = 1;
                price.FirstBlock = 1;
                price.NextBlock = 1;
                price.TimeOfNextBlock = 1;
                price.TimeOfFirstBlock = 1;
                Create(price);
            }
            else
            {
                price.PriceID = result.PriceID;
                price.MonthPrice = result.MonthPrice;
                price.FirstBlock = result.FirstBlock;
                price.NextBlock = result.NextBlock;
                price.TimeOfNextBlock = result.TimeOfNextBlock;
                price.TimeOfFirstBlock = result.TimeOfFirstBlock;
                Update(price);
            }
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        //create
        public JsonResult Create(Price price)
        {
            if (ModelState.IsValid)
            {
                db.Prices.Add(price);
                db.SaveChanges();
            }

            return Json(price, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Price price)
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

        //get price of Monthly ticket base on typeOfVehicle
        public JsonResult GetPriceMonthly(int typeOfVehicle)
        {
            var result = (from p in db.Prices
                          where p.TypeOfvehicle == typeOfVehicle
                          select new {p.MonthPrice}).FirstOrDefault();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}