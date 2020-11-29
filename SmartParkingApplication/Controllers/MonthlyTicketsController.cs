using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SmartParkingApplication.Models;

namespace SmartParkingApplication.Controllers
{
    public class MonthlyTicketsController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();

        // GET: MonthlyTickets
        public ActionResult Index()
        {
            var monthlyTickets = db.MonthlyTickets.Include(m => m.Card).Include(m => m.ParkingPlace);
            return View(monthlyTickets.ToList());
        }

        // GET: MonthlyTickets/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonthlyTicket monthlyTicket = db.MonthlyTickets.Find(id);
            if (monthlyTicket == null)
            {
                return HttpNotFound();
            }
            return View(monthlyTicket);
        }

        // GET: MonthlyTickets/Create
        public ActionResult Create()
        {
            ViewBag.CardID = new SelectList(db.Cards, "CardID", "CardNumber");
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking");
            return View();
        }

        // POST: MonthlyTickets/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MonthlyTicketID,CusName,IdentityCard,Phone,Email,TypeOfVehicle,LicensePlates,RegisDate,ExpiryDate,CardID,ParkingPlaceID")] MonthlyTicket monthlyTicket)
        {
            if (ModelState.IsValid)
            {
                db.MonthlyTickets.Add(monthlyTicket);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CardID = new SelectList(db.Cards, "CardID", "CardNumber", monthlyTicket.CardID);
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", monthlyTicket.ParkingPlaceID);
            return View(monthlyTicket);
        }

        // GET: MonthlyTickets/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonthlyTicket monthlyTicket = db.MonthlyTickets.Find(id);
            if (monthlyTicket == null)
            {
                return HttpNotFound();
            }
            ViewBag.CardID = new SelectList(db.Cards, "CardID", "CardNumber", monthlyTicket.CardID);
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", monthlyTicket.ParkingPlaceID);
            return View(monthlyTicket);
        }

        // POST: MonthlyTickets/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "MonthlyTicketID,CusName,IdentityCard,Phone,Email,TypeOfVehicle,LicensePlates,RegisDate,ExpiryDate,CardID,ParkingPlaceID")] MonthlyTicket monthlyTicket)
        {
            if (ModelState.IsValid)
            {
                db.Entry(monthlyTicket).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CardID = new SelectList(db.Cards, "CardID", "CardNumber", monthlyTicket.CardID);
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking", monthlyTicket.ParkingPlaceID);
            return View(monthlyTicket);
        }

        // GET: MonthlyTickets/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MonthlyTicket monthlyTicket = db.MonthlyTickets.Find(id);
            if (monthlyTicket == null)
            {
                return HttpNotFound();
            }
            return View(monthlyTicket);
        }

        // POST: MonthlyTickets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            MonthlyTicket monthlyTicket = db.MonthlyTickets.Find(id);
            db.MonthlyTickets.Remove(monthlyTicket);
            db.SaveChanges();
            return RedirectToAction("Index");
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
