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
    //[Authorize(Roles = "Quản lý")]
    public class ManagePPlaceController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();
        // GET: ManageParkingPlace
        public ActionResult ManageStatusParkingPlace()
        {
            ViewBag.listParkingPlace = db.ParkingPlaces.ToList();
            return View();
        }

        public ActionResult HistoryParking()
        {
            return View();
        }

        public ActionResult loadtTableMotor(int ParkingPlaceID)
        {

            return Json(db.ParkingPlaces.Where(x => x.ParkingPlaceID == ParkingPlaceID).Select(x => new
            {
                Id = x.ParkingPlaceID,
                ToTalDaGuiOto = x.NumberOfCar - x.NumberCarBlank,
                NumberMotoBikeBlank = x.NumberMotoBikeBlank,
                ToTalDaGuiXemay = x.NumberOfMotoBike - x.NumberMotoBikeBlank,
                NumberCarlank = x.NumberCarBlank,
               

            }).ToList(), JsonRequestBehavior.AllowGet) ;
        }

        public JsonResult LoadDataStatusPP(int ParkingPlaceID)
        {
            
            var trans = from t in db.Transactions.Where(x => x.ParkingPlaceID == ParkingPlaceID && x.TimeOutv == null)
                        join c in db.Cards on t.CardID equals c.CardID into table1
                        from c in table1.DefaultIfEmpty()
                        orderby t.CardID
                        select new {t.TransactionID, t.LicensePlates, t.TimeIn, t.TypeOfTicket, c.CardNumber,t.TypeOfVerhicleTran };

            List<Object> list = new List<object>();
            foreach (var item in trans)
            {
                var timeIn = item.TimeIn.Value.ToString("dd/MM/yyyy HH:mm:ss tt");
                
                string typeofTicket = string.Empty;
                string typeofVe= string.Empty;
                switch (item.TypeOfTicket)
                {
                    case 0: 
                        typeofTicket = "Vé Lượt";
                        break;
                    case 1:
                        typeofTicket = "Vé Tháng";
                        break;
                }
                switch (item.TypeOfVerhicleTran)
                {
                    case 0:
                        typeofVe = "Xe máy";
                        break;
                    case 1:
                        typeofVe = "Ô tô";
                        break;
                }

                var tr = new { TransactionID = item.TransactionID, LicensePlates = item.LicensePlates, TimeIn = timeIn, TypeOfTicket = typeofTicket, CardNumber = item.CardNumber, TypeOfVerhicleTran = typeofVe };
                list.Add(tr);
            }
            return Json(new { dataSSP = list}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadHistoryParking(int ParkingPlaceID, DateTime timeFrom, DateTime timeTo, string txtSearchHistory)
        {
            var trans = (from t in db.Transactions
                         where t.ParkingPlaceID == ParkingPlaceID && t.TimeOutv != null && DateTime.Compare((DateTime)t.TimeIn, timeFrom) >= 0 && DateTime.Compare((DateTime)t.TimeOutv, timeTo) <= 0 && t.LicensePlates.Contains(txtSearchHistory)
                         join c in db.Cards on t.CardID equals c.CardID into table1
                         from c in table1.DefaultIfEmpty()
                         orderby t.TimeIn
                         select new { t.TransactionID, t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber, t.TypeOfVerhicleTran, t.TotalPrice }).ToList();

            List<Object> list = new List<object>();
            foreach (var item in trans)
            {
                var timeIn = item.TimeIn.Value.ToString("dd/MM/yyyy HH:mm:ss");
                var timeOut = item.TimeOutv.Value.ToString("dd/MM/yyyy HH:mm:ss");
                string typeofTicket = string.Empty;
                string typeOfVehicle = string.Empty;
                switch (item.TypeOfTicket)
                {
                    case 0:
                        typeofTicket = "Vé Tháng";
                        break;
                    case 1:
                        typeofTicket = "Vé Lượt";
                        break;
                }
                switch (item.TypeOfVerhicleTran)
                {
                    case 0:
                        typeOfVehicle = "Xe máy";
                        break;
                    case 1:
                        typeOfVehicle = "Ô tô";
                        break;
                }
                var tr = new { item.TransactionID, item.LicensePlates, timeIn, timeOut, typeofTicket, item.CardNumber, typeOfVehicle, item.TotalPrice };
                list.Add(tr);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDayFirstInLastOut()
        {
            var data1 = (from t in db.Transactions
                         orderby t.TimeIn ascending
                         select new { t.TimeIn }).FirstOrDefault();
            var data2 = (from t in db.Transactions
                         orderby t.TimeOutv descending
                         select new { t.TimeOutv }).FirstOrDefault();
            var firstIn = data1.TimeIn.Value.ToString("yyyy-MM-ddThh:mm:ss");
            var lastOut = data2.TimeOutv.Value.ToString("yyyy-MM-ddThh:mm:ss");
            return Json(new { firstIn, lastOut }, JsonRequestBehavior.AllowGet);
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
            var typeVE = "";

            if (tran.TypeOfVerhicleTran == 1)
            {
                typeVE = "Ô tô";
            }
            else
            {
                typeVE = "Xe máy";
            }
            var TimeIn = tran.TimeIn.Value.ToString("MM/dd/yyyy hh:mm:ss");
            

            var result = new {tran.TransactionID,tran.LicensePlates,TimeIn, typeTicket, tran.Card.CardNumber,typeVE,tran.TotalPrice};
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

                var result = new { parking.ParkingPlaceID, parking.NameOfParking, parking.Location, parking.NumberOfCar, parking.NumberOfMotoBike, parking.NumberCarBlank, parking.NumberMotoBikeBlank, statusOfParking, parking.StatusOfParkingPlace };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //check name parking place exist or not if not exist, update parking
        public JsonResult CheckNameParkingExistToUpdate(ParkingPlace parkingPlace)
        {
            var check = true;
            var result = (from p in db.ParkingPlaces
                          where p.NameOfParking.ToLower().Equals(parkingPlace.NameOfParking.ToLower())
                          select new { p.NameOfParking }).FirstOrDefault();
            var result2 = (from p in db.ParkingPlaces
                           where p.ParkingPlaceID == parkingPlace.ParkingPlaceID
                           select new { p.NameOfParking }).FirstOrDefault();
            if (result == null || result2.NameOfParking == parkingPlace.NameOfParking)
            {
                UpdatePP(parkingPlace);
                check = false;
            }
            return Json(check, JsonRequestBehavior.AllowGet);
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
        //check name parking place exist or not if not exist, add parking
        public JsonResult CheckNameParkingExistToAdd(ParkingPlace parkingPlace)
        {
            var check = true;
            var result = (from p in db.ParkingPlaces
                          where p.NameOfParking.ToLower().Equals(parkingPlace.NameOfParking.ToLower())
                          select new { p.NameOfParking }).FirstOrDefault();
            if(result == null)
            {
                Create(parkingPlace);
                check = false;
            }
            return Json(check, JsonRequestBehavior.AllowGet);
        }

        public void Create(ParkingPlace parking)
        {
            if (ModelState.IsValid)
            {
                db.ParkingPlaces.Add(parking);
                db.SaveChanges();
            }
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