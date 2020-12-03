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
                //foreach (var item in trans)
                //{
                //    var timeIn = item.TimeIn;
                //    var timeOut = item.TimeOutv;
                //    var tr = new { LicensePlates = item.LicensePlates, TimeIn = timeIn, TimeOutv = timeOut, TypeOfTicket = item.TypeOfTicket, CardNumber = item.CardNumber };
                //    int i = tr.TimeIn.CompareTo(timeFrom);
                //}
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
            trans = trans.Skip((pageSPP - 1) * pageSizeSPP).Take(pageSizeSPP);
            return Json(new { dataSSP = list, total = totalRow }, JsonRequestBehavior.AllowGet);
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
            var parking = from p in db.ParkingPlaces select new { p.NameOfParking,p.Location,p.NumberOfCar,p.NumberOfMotoBike};

            var totalRow = parking.Count();
            parking = parking.Skip((pagepp - 1) * pageSizepp).Take(pageSizepp);

            return Json(new { datapp = parking, total = totalRow }, JsonRequestBehavior.AllowGet);
        }

        // GET: ParkingPlaces/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ParkingPlaces/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ParkingPlaceID,NameOfParking,Location,NumberOfSlot,NumberOfCar,NumberOfMotoBike,NumberCarBlank,NumberMotoBikeBlank")] ParkingPlace parkingPlace)
        {
            if (ModelState.IsValid)
            {
                db.ParkingPlaces.Add(parkingPlace);
                db.SaveChanges();
                return RedirectToAction("ListParkingPlace");
            }

            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // POST: ParkingPlaces/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ParkingPlaceID,NameOfParking,Location,NumberOfSlot,NumberOfCar,NumberOfMotoBike,NumberCarBlank,NumberMotoBikeBlank")] ParkingPlace parkingPlace)
        {
            if (ModelState.IsValid)
            {
                db.Entry(parkingPlace).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("ListParkingPlace");
            }
            return View(parkingPlace);
        }

        // GET: ParkingPlaces/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            if (parkingPlace == null)
            {
                return HttpNotFound();
            }
            return View(parkingPlace);
        }

        // POST: ParkingPlaces/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ParkingPlace parkingPlace = db.ParkingPlaces.Find(id);
            db.ParkingPlaces.Remove(parkingPlace);
            db.SaveChanges();
            return RedirectToAction("ListParkingPlace");
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