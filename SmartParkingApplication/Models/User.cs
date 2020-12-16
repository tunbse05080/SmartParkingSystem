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
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Transactions = new HashSet<Transaction>();
            this.Transactions1 = new HashSet<Transaction>();
            this.UserSchedules = new HashSet<UserSchedule>();
        }
    
        public int UserID { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string PassWork { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        public Nullable<int> Gender { get; set; }
        public string UserAddress { get; set; }
        public string IdentityCard { get; set; }
        public Nullable<int> Phone { get; set; }
        public string email { get; set; }
        public Nullable<System.DateTime> ContractSigningDate { get; set; }
        public Nullable<System.DateTime> ContractExpirationDate { get; set; }
        public Nullable<int> RoleID { get; set; }
        public Nullable<int> ParkingPlaceID { get; set; }
        public Nullable<int> StatusOfWork { get; set; }
    
        public virtual ParkingPlace ParkingPlace { get; set; }
        public virtual Role Role { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transaction> Transactions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Transaction> Transactions1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserSchedule> UserSchedules { get; set; }
    }
}
