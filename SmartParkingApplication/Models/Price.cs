//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SmartParkingApplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Price
    {
        public int PriceID { get; set; }
        public Nullable<int> TypeOfvehicle { get; set; }
        public Nullable<int> DayPrice { get; set; }
        public Nullable<int> FirstBlock { get; set; }
        public Nullable<int> NextBlock { get; set; }
        public Nullable<int> ParkingPlaceID { get; set; }
        public Nullable<int> TimeOfFirstBlock { get; set; }
        public Nullable<int> TimeOfNextBlock { get; set; }
        public Nullable<System.DateTime> TimeOfApply { get; set; }
    
        public virtual ParkingPlace ParkingPlace { get; set; }
    }
}
