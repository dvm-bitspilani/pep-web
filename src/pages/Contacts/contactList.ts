interface Contact {
  id: number;
  name: string;
  // image: string;
  email: string;
  phone: string;
}

export const contacts: Contact[] = [
  {
    id: 1,
    name: "Nitya Agarwal",
    // image: "/Contacts/woman-product-designer.jpg",
    email: "f20240749@pilani.bits-pilani.ac.in",
    phone: "+919873777349",
  },
  {
    id: 2,
    name: "Anika Jha",
    // image: "/Contacts/man-software-engineer.png",
    email: "20240906@pilani.bits-pilani.ac.in",
    phone: "+919900724951",
  },
];
// Nitya Agarwal: +919873777349
// f20240749@pilani.bits-pilani.ac.in

// Anika Jha: +919900724951
// 20240906@pilani.bits-pilani.ac.in