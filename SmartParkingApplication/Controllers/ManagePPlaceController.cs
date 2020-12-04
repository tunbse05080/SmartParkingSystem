using SmartParkingApplication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace SmartParkingApplication.Controllers
{
    public class ManagePPlaceController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageParkingPlace
        public ActionResult ManageStatusParkingPlace()
        {
            return View();
        }

        public JsonResult LoadDataStatusPP(int pageSPP,DateTime timeFrom, DateTime timeTo , String nameSSP, int pageSizeSPP = 5)
        {
            var trans = from t in db.Transactions
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.CardID
                        select new { t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber };
            if (!string.IsNullOrEmpty(nameSSP))
            {
                trans = trans.Where(x => x.LicensePlates.Contains(nameSSP));
            }else if(!string.IsNullOrEmpty(timeFrom.ToString()) && !string.IsNullOrEmpty(timeTo.ToString()))
            {
                trans = trans.Where(x => x.TimeIn >= timeFrom && x.TimeOutv <= timeTo);
            }
            else
            {
                trans = trans.Where(x => x.TimeIn >= timeFrom && x.TimeOutv <= timeTo && x.LicensePlates.Contains(nameSSP));
            }
            List<Object> list = new List<object>();
            foreach (var item in trans)
            {
                var timeIn = item.TimeIn.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                var timeOut = item.TimeOutv.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                string typeofTicket = string.Empty;
                switch (item.TypeOfTicket)
                {
                    case 0: 
                        typeofTicket = "Vé Lượt";
                        break;
                    case 1:
                        typeofTicket = "Vé Tháng";
                        break;
                }
                
                var tr = new { LicensePlates = item.LicensePlates, TimeIn = timeIn, TimeOutv = timeOut, TypeOfTicket = typeofTicket, CardNumber = item.CardNumber };
                list.Add(tr);
            }

            var totalRow = list.Count();
            var result = list.Skip((pageSPP - 1) * pageSizeSPP).Take(pageSizeSPP);
            return Json(new { dataSSP = result, total = totalRow }, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult LoadInfoPPlace()
        //{
        //    var result = 0;
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult ListParkingPlace()
        {
            //var listParking = (from list in db.ParkingPlaces select list).ToList();
            return View();
        }

        public JsonResult loadDataParkingPlace(int pagepp, string namepp, int pageSizepp = 5)
        {
            var parking = from p in db.ParkingPlaces select new {p.ParkingPlaceID, p.NameOfParking,p.Location,p.NumberOfSlot,p.NumberOfCar,p.NumberOfMotoBike,p.NumberCarBlank,p.NumberMotoBikeBlank};
            if (!string.IsNullOrEmpty(namepp))
            {
                parking = parking.Where(x => x.NameOfParking.Contains(namepp));
            }

            List<Object> list = new List<object>();
            foreach (var item in parking)
            {
                
                var tr = new { ParkingPlaceID = item.ParkingPlaceID, NameOfParking = item.NameOfParking, Location = item.Location, NumberOfSlot = item.NumberOfSlot, NumberOfCar = item.NumberOfCar, NumberOfMotoBike = item.NumberOfMotoBike, NumberCarBlank = item.NumberCarBlank, NumberMotoBikeBlank = item.NumberMotoBikeBlank };
                list.Add(tr);
            }
            var totalRowpp = list.Count();
            var result = list.Skip((pagepp - 1) * pageSizepp).Take(pageSizepp);

            return Json(new { datapp = result, total = totalRowpp }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParkingPlaceDetails(int id)
        {
            var parking = db.ParkingPlaces.Find(id);
           
            var result = new { parking.ParkingPlaceID, parking.NameOfParking, parking.Location, parking.NumberOfSlot, parking.NumberOfCar, parking.NumberOfMotoBike, parking.NumberCarBlank, parking.NumberMotoBikeBlank };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePP(ParkingPlace parking)
        {
            if (ModelState.IsValid)
            {
                db.Entry(parking).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(parking, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create(ParkingPlace parking)
        {
            if (ModelState.IsValid)
            {
                db.ParkingPlaces.Add(parking);
                db.SaveChanges();
            }

            return Json(parking, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}