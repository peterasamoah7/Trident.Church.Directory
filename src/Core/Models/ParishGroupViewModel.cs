﻿using System;
using System.Collections.Generic;

namespace Core.Models
{
    public class ParishGroupViewModel : BaseViewModel
    {       
        /// <summary>
        /// Church Group Id
        /// </summary>
        public Guid Id { get; set; }
        
        /// <summary>
        /// Name of the parish
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Active
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Group Memberships
        /// </summary>
        public int MemberCount { get; set; }

        /// <summary>
        /// Name of Parish
        /// </summary>
        public ParishViewModel Parish { get; set; }

        /// <summary>
        /// Group Memberships
        /// </summary>
        public ICollection<ParishionerViewModel> Parishioners { get; set; } = new List<ParishionerViewModel>();
    }
}
