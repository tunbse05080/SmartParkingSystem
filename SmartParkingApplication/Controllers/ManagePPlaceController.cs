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
            ViewBag.listParkingPlace = db.ParkingPlaces.ToList();
            return View();
        }

        public ActionResult loadtTable(int ParkingPlaceID)
        {
            
            return Json ( db.ParkingPlaces.Where(x => x.ParkingPlaceID == ParkingPlaceID).Select(x => new
            {
                Id = x.ParkingPlaceID,
                Name = x.NameOfParking
            }).ToList(),JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadDataStatusPP()
        {
            var trans = from t in db.Transactions
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.CardID
                        select new {t.TransactionID, t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber };

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

                
                var tr = new { TransactionID = item.TransactionID, LicensePlates = item.LicensePlates, TimeIn = timeIn, TimeOutv = timeOut, TypeOfTicket = typeofTicket, CardNumber = item.CardNumber };
                list.Add(tr);
            }
            return Json(new { dataSSP = list}, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ParkingSSDetails(int id)
        {
            var tran = db.Transactions.Find(id);
            var typeTicket = "";
            
            if (tran.TypeOfTicket == 1)
            {
                typeTicket = "Vé Tháng";
            }
            else
            {
                typeTicket = "Vé Lượt";
            }
           
           
            
            var TimeIn = tran.TimeIn.Value.ToString("MM/dd/yyyy hh:mm:ss");
            var TimeOut = tran.TimeOutv.Value.ToString("MM/dd/yyyy hh:mm:ss");

            var result = new {tran.TransactionID,tran.LicensePlates,TimeIn,TimeOut, typeTicket, tran.Card.CardNumber };
            return Json(result, JsonRequestBehavior.AllowGet);
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

        public JsonResult loadDataParkingPlace()
        {
            var parking = from p in db.ParkingPlaces select new {p.ParkingPlaceID, p.NameOfParking,p.Location,p.NumberOfCar,p.NumberOfMotoBike,p.NumberCarBlank,p.NumberMotoBikeBlank,p.StatusOfParkingPlace};
            //if (!string.IsNullOrEmpty(namepp))
            //{
            //    parking = parking.Where(x => x.NameOfParking.Contains(namepp));
            //}

            List<Object> list = new List<object>();
            foreach (var item in parking)
            {
                string statusOfParking = string.Empty;
                switch (item.StatusOfParkingPlace)
                {
                    case 0:
                        statusOfParking = "Dừng hoạt động";
                        break;
                    case 1:
                        statusOfParking = "Đang hoạt động";
                        break;
                }
                var tr = new { ParkingPlaceID = item.ParkingPlaceID, NameOfParking = item.NameOfParking, Location = item.Location, NumberOfCar = item.NumberOfCar, NumberOfMotoBike = item.NumberOfMotoBike, NumberCarBlank = item.NumberCarBlank, NumberMotoBikeBlank = item.NumberMotoBikeBlank, StatusOfParkingPlace = statusOfParking };
                list.Add(tr);
            }
            var total = list.Count();
            return Json(new { datapp = list, total }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult loadDataWithParking(string nameOfParking)
        {
            var parking = from p in db.ParkingPlaces select new { p.ParkingPlaceID, p.NameOfParking, p.Location, p.NumberOfCar, p.NumberOfMotoBike, p.NumberCarBlank, p.NumberMotoBikeBlank, p.StatusOfParkingPlace };
            //if (!string.IsNullOrEmpty(namepp))
            //{
            //    parking = parking.Where(x => x.NameOfParking.Contains(namepp));
            //}

            List<Object> list = new List<object>();
            foreach (var item in parking)
            {
                string statusOfParking = string.Empty;
                switch (item.StatusOfParkingPlace)
                {
                    case 0:
                        statusOfParking = "Dừng hoạt động";
                        break;
                    case 1:
                        statusOfParking = "Đang hoạt động";
                        break;
                }
                var tr = new { ParkingPlaceID = item.ParkingPlaceID, NameOfParking = item.NameOfParking, Location = item.Location, NumberOfCar = item.NumberOfCar, NumberOfMotoBike = item.NumberOfMotoBike, NumberCarBlank = item.NumberCarBlank, NumberMotoBikeBlank = item.NumberMotoBikeBlank, StatusOfParkingPlace = statusOfParking };
                list.Add(tr);
            }
            var total = list.Count();
            return Json(new { datapp = list, total }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParkingPlaceDetails(int id)
        {
            var parking = db.ParkingPlaces.Find(id);
            var statusOfParking = "";
            if (parking.StatusOfParkingPlace == 0)
            {
                statusOfParking = "Dừng hoạt động";
            }
            else 
            {
                statusOfParking = "Đang hoạt động";
            }
           

                var result = new { parking.ParkingPlaceID, parking.NameOfParking, parking.Location, parking.NumberOfCar, parking.NumberOfMotoBike, parking.NumberCarBlank, parking.NumberMotoBikeBlank, statusOfParking};
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
        public JsonResult ComboboxStatusOfParking()
        {
            var list = db.ParkingPlaces.Select(u => u.StatusOfParkingPlace).Distinct().ToList();
            List<string> result = new List<string>();
            foreach (var item in list)
            {
                var statusOfParking = "";
                switch (item)
                {
                    case 0:
                        statusOfParking = "Dừng hoạt động";
                        result.Add(statusOfParking);
                        break;
                    case 1:
                        statusOfParking = "Đang hoạt động";
                        result.Add(statusOfParking);
                        break;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ComboboxListOfParking()
        {
            var list = db.ParkingPlaces.Select(u => u.NameOfParking).Distinct().ToList();
            List<string> result = new List<string>();
           
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}