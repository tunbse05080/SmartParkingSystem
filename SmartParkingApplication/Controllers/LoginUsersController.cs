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
    public class LoginUsersController : Controller
    {
        private SmartParkingsEntities db = new SmartParkingsEntities();

        // GET: LoginUsers
        public ActionResult Index()
        {
            var users = db.Users.Include(u => u.ParkingPlace).Include(u => u.Role);
            return View(users.ToList());
        }

        
       

        // GET: LoginUsers/Create
        public ActionResult Create()
        {
            ViewBag.ParkingPlaceID = new SelectList(db.ParkingPlaces, "ParkingPlaceID", "NameOfParking");
            ViewBag.RoleID = new SelectList(db.Roles, "RoleID", "RoleName");
            return View();
        }

        // POST: LoginUsers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
      

        // GET: LoginUsers/Edit/5
       

        // POST: LoginUsers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        

        // GET: LoginUsers/Delete/5
      

        // POST: LoginUsers/Delete/5
       
            
    }
}
