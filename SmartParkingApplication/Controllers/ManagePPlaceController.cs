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
            try
            {
                ViewBag.listParkingPlace = db.ParkingPlaces.ToList();
            }
            catch (Exception)
            {
                return Redirect("/ErrorPage");
            }
            
            return View();
        }

        public ActionResult HistoryParking()
        {
            return View();
        }

        public ActionResult loadtTableMotor(int ParkingPlaceID)
        {
            try
            {
                return Json(db.ParkingPlaces.Where(x => x.ParkingPlaceID == ParkingPlaceID).Select(x => new
                {
                    Id = x.ParkingPlaceID,
                    ToTalDaGuiOto = x.NumberOfCar - x.NumberCarBlank,
                    NumberMotoBikeBlank = x.NumberMotoBikeBlank,
                    ToTalDaGuiXemay = x.NumberOfMotoBike - x.NumberMotoBikeBlank,
                    NumberCarlank = x.NumberCarBlank,


                }).ToList(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult LoadDataStatusPP(int ParkingPlaceID)
        {
            List<Object> list = new List<object>();
            try
            {
                var trans = from t in db.Transactions.Where(x => x.ParkingPlaceID == ParkingPlaceID && x.TimeOutv == null)
                            join c in db.Cards on t.CardID equals c.CardID into table1
                            from c in table1.DefaultIfEmpty()
                            orderby t.CardID
                            select new { t.TransactionID, t.LicensePlates, t.TimeIn, t.TypeOfTicket, c.CardNumber, t.TypeOfVerhicleTran };


                foreach (var item in trans)
                {
                    var timeIn = item.TimeIn.Value.ToString("dd/MM/yyyy HH:mm:ss tt");

                    string typeofTicket = string.Empty;
                    string typeofVe = string.Empty;
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
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(new { dataSSP = list }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadHistoryParking(int ParkingPlaceID, DateTime timeFrom, DateTime timeTo, string txtSearchHistory)
        {
            List<Object> list = new List<object>();
            try
            {
                var trans = (from t in db.Transactions
                             where t.ParkingPlaceID == ParkingPlaceID && t.TimeOutv != null && DateTime.Compare((DateTime)t.TimeIn, timeFrom) >= 0 && DateTime.Compare((DateTime)t.TimeOutv, timeTo) <= 0 && t.LicensePlates.Contains(txtSearchHistory)
                             join c in db.Cards on t.CardID equals c.CardID into table1
                             from c in table1.DefaultIfEmpty()
                             orderby t.TimeIn
                             select new { t.TransactionID, t.LicensePlates, t.TimeIn, t.TimeOutv, t.TypeOfTicket, c.CardNumber, t.TypeOfVerhicleTran, t.TotalPrice, userIn = t.User1.Account.UserName, userOut = t.User2.Account.UserName }).ToList();


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
                    var tr = new { item.TransactionID, item.LicensePlates, timeIn, timeOut, typeofTicket, item.CardNumber, typeOfVehicle, item.TotalPrice, item.userIn, item.userOut };
                    list.Add(tr);
                }
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParkingSSDetails(int id)
        {
            try
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


                var result = new { tran.TransactionID, tran.LicensePlates, TimeIn, typeTicket, tran.Card.CardNumber, typeVE, tran.TotalPrice };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            
        }


        public ActionResult ListParkingPlace()
        {
            return View();
        }

        public JsonResult loadDataParkingPlace()
        {
            List<Object> list = new List<object>();
            var total = 0;
            try
            {
                var parking = from p in db.ParkingPlaces select new { p.ParkingPlaceID, p.NameOfParking, p.Location, p.NumberOfCar, p.NumberOfMotoBike, p.NumberCarBlank, p.NumberMotoBikeBlank, p.StatusOfParkingPlace };

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
                total = list.Count();
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(new { datapp = list, total }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult loadDataWithParking(string nameOfParking)
        {
            List<Object> list = new List<object>();
            var total = 0;
            try
            {
                var parking = from p in db.ParkingPlaces select new { p.ParkingPlaceID, p.NameOfParking, p.Location, p.NumberOfCar, p.NumberOfMotoBike, p.NumberCarBlank, p.NumberMotoBikeBlank, p.StatusOfParkingPlace };

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
                total = list.Count();
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(new { datapp = list, total }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ParkingPlaceDetails(int id)
        {
            try
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
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

        }

        //check name parking place exist or not if not exist, update parking
        public JsonResult CheckNameParkingExistToUpdate(ParkingPlace parkingPlace)
        {
            var check = true;
            try
            {
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
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(check, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePP(ParkingPlace parking)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(parking).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                return Json("UpdateFalse", JsonRequestBehavior.AllowGet);
            }
            return Json(parking, JsonRequestBehavior.AllowGet);
        }

        //check name parking place exist or not if not exist, add parking
        public JsonResult CheckNameParkingExistToAdd(ParkingPlace parkingPlace)
        {
            var check = true;
            try
            {
                var result = (from p in db.ParkingPlaces
                              where p.NameOfParking.ToLower().Equals(parkingPlace.NameOfParking.ToLower())
                              select new { p.NameOfParking }).FirstOrDefault();
                if (result == null)
                {
                    Create(parkingPlace);
                    check = false;
                }
            }
            catch (Exception)
            {
                return Json("AddFalse", JsonRequestBehavior.AllowGet);
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
            List<string> result = new List<string>();
            try
            {
                var list = db.ParkingPlaces.Select(u => u.StatusOfParkingPlace).Distinct().ToList();

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
            }
            catch (Exception)
            {
                return Json("LoadFalse", JsonRequestBehavior.AllowGet);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}