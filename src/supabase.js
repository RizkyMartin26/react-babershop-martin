import { createClient } from "@supabase/supabase-js";
import initialProducts from "./data/products";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== "YOUR_SUPABASE_URL_HERE" &&
  supabaseAnonKey &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY_HERE";

// Global auth state listeners for Mock Client
let mockListeners = [];
let mockSession = null;

// Initialize mock session from localStorage if exists
try {
  const savedSession = localStorage.getItem("supabase_mock_session");
  if (savedSession) {
    mockSession = JSON.parse(savedSession);
  }
} catch (e) {
  console.error("Failed to load mock session", e);
}

// Default initial users for mock database
const defaultMockUsers = [
  {
    id: "usr-001",
    name: "Admin Rizky",
    email: "admin@elite.com",
    password: "password123",
    role: "admin",
    phone: "08123456789",
    created_at: new Date().toISOString(),
  },
  {
    id: "usr-002",
    name: "John Barber",
    email: "john@barber.com",
    password: "password123",
    role: "barber",
    phone: "08134444555",
    created_at: new Date().toISOString(),
  },
  {
    id: "usr-003",
    name: "Budi Santoso",
    email: "budi@guest.com",
    password: "password123",
    role: "customer",
    phone: "081355577788",
    created_at: new Date().toISOString(),
  }
];

// Helper generators for mock tables
const getMockBarbers = () => {
  const mockNames = ["Michael Jordan", "David Beckham", "Ryan Reynolds", "Chris Evans", "Tom Holland", "Zayn Malik", "Harry Styles", "Justin Bieber", "Shawn Mendes", "Chris Hemsworth", "Robert Downey", "Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Will Smith", "Keanu Reeves", "Dwayne Johnson", "Jason Statham", "Vin Diesel", "Tom Cruise", "Ryan Gosling", "Jake Gyllenhaal", "Christian Bale", "Hugh Jackman", "Zac Efron", "Channing Tatum", "Liam Hemsworth", "Mark Wahlberg", "Matt Damon", "Ben Affleck"];
  const roles = ["Classic & Fade", "Modern Style", "Beard Expert", "Hair Coloring", "Hair Tattoo", "Kids Haircut", "Scissor Cut", "Hot Towel Shave"];
  const unsplashIds = [
    "1506794778202-cad84cf45f1d", "1507003211169-0a1dd7228f2d", "1500648767791-00dcc994a43e", 
    "1519085360753-af0119f7cbe7", "1492562080023-ab3db95bfbce", "1531427186611-ecfd6d936c79", 
    "1504257432389-52343af065f6", "1480455624313-e27b44cb8d5b", "1507591064344-4c6ce005b128", 
    "1543852786-1cf6624b9987"
  ];
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: mockNames[i] || `Barber ${i + 1}`,
    role: roles[i % roles.length],
    rating: parseFloat((Math.random() * (5 - 4.2) + 4.2).toFixed(1)),
    bookings: Math.floor(Math.random() * 300) + 50,
    experience: `${Math.floor(Math.random() * 10) + 2} years`,
    phone: `+62 81${Math.floor(Math.random() * 90000000) + 10000000}`,
    status: Math.random() > 0.3 ? "Available" : "Busy",
    initials: (mockNames[i] || `B ${i + 1}`).split(' ').map(n => n[0]).join(''),
    image: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=300&auto=format&fit=crop`,
    created_at: new Date().toISOString()
  }));
};

const getMockCustomers = () => {
  const firstNames = ["John", "Michael", "David", "Ryan", "Chris", "Kevin", "James", "Robert", "William", "Joseph", "Daniel", "Matthew", "Anthony", "Mark", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Brian"];
  const lastNames = ["Doe", "Smith", "Beckham", "Reynolds", "Evans", "Hart", "Bond", "Stark", "Wayne", "Kent", "Parker", "Banner", "Odinson", "Rogers", "Barton", "Romanoff", "Fury", "Hill", "Coulson", "Carter"];
  return Array.from({ length: 30 }).map((_, index) => {
    const fName = firstNames[index % firstNames.length];
    const lName = lastNames[(index * 3) % lastNames.length];
    const visits = Math.floor(Math.random() * 40) + 1;
    const status = visits > 15 ? "VIP" : "Regular";
    const phoneEnd = String(1000 + index * 111).padStart(4, '0');
    return {
      id: index + 1,
      name: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@example.com`,
      phone: `+62 812-${String(100 + index).padStart(4, '0')}-${phoneEnd}`,
      visits: visits,
      status: status,
      initials: `${fName[0]}${lName[0]}`,
      created_at: new Date().toISOString()
    };
  });
};

const getMockServices = () => {
  const serviceNames = [
    "Classic Haircut", "Premium Haircut", "Beard Trim & Line-up", "Hair Coloring (Black)", "Hot Towel Shave",
    "Hair Wash & Styling", "Kids Haircut", "Father & Son Combo", "VIP Grooming Package", "Keratin Treatment",
    "Scalp Massage", "Buzz Cut & Taper", "Fade Haircut", "Pompadour Styling", "Mullet Styling",
    "Hair Tattoo & Design", "Mustache Grooming", "Eyebrow Threading", "Facial Treatment", "Express Haircut",
    "Wedding Groom Package", "Hair Highlights", "Perming Style", "Anti-Dandruff Treatment", "Hair Loss Therapy",
    "Executive Shave", "Beard Coloring", "Ear Wax Removal", "Full Head Shave", "Gentleman's Polish"
  ];
  const imageIds = [
    "1621605815971-fbc98d665033", "1517832606299-7ae9b720a186", "1519699047748-de8e457a634e", 
    "1521590832167-7bcbfaa6381f", "1585747860715-2ba37e788b70", "1519014816548-bf5fe059798b", 
    "1593702275687-f8b402bf1fb5", "1600626333486-57889a7776f4", "1599351431202-1e0f0137899a", 
    "1503736334156-8c12148ce769", "1532798442725-41036acc7489", "1605497788044-5a32c7078486"
  ];
  return Array.from({ length: 30 }).map((_, index) => {
    const basePrice = 50 + (index % 15) * 20;
    const popular = index === 0 || index === 1 || index === 4 || index === 8 || index === 12;
    const durationStr = `${20 + (index % 5) * 10} min`;
    return {
      id: index + 1,
      image: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?w=800&q=80`,
      title: serviceNames[index],
      price: `Rp ${basePrice},000`,
      duration: durationStr,
      popular: popular,
      created_at: new Date().toISOString()
    };
  });
};

const getMockBookings = () => {
  const barbers = ["Michael Jordan", "David Beckham", "Ryan Reynolds", "Chris Evans", "Tom Hardy"];
  const services = ["Premium Haircut", "Classic Haircut + Beard", "Hot Towel Shave", "Hair Coloring", "Kids Haircut"];
  return Array.from({ length: 30 }).map((_, index) => {
    const fNames = ["Alex", "James", "Robert", "William", "Joseph", "Daniel", "Matthew", "Anthony", "Mark", "Steven", "Paul", "Andrew"];
    const lNames = ["Smith", "Wilson", "Brown", "Davis", "Miller", "Taylor", "Anderson", "Thomas", "Jackson", "White"];
    const customer = `${fNames[index % fNames.length]} ${lNames[(index * 2) % lNames.length]}`;
    const barber = barbers[index % barbers.length];
    const service = services[index % services.length];
    let status = "Confirmed";
    if (index % 5 === 0) status = "Pending";
    if (index % 4 === 0) status = "Completed";
    if (index % 12 === 0) status = "Cancelled";
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + (index % 15) - 2); 
    const date = dateObj.toISOString().split('T')[0];
    const hour = 9 + (index % 10);
    const time = `${hour.toString().padStart(2, '0')}:${index % 2 === 0 ? '00' : '30'}`;
    return {
      id: `BK${String(1001 + index).padStart(4, '0')}`,
      customer,
      barber,
      service,
      date,
      time,
      status,
      created_at: new Date().toISOString()
    };
  });
};

const getMockMembers = () => {
  return [
    { id: "MB001", name: "John Doe", level: "Gold", points: 1200, totalSpent: "Rp 3.500.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB002", name: "Michael Smith", level: "Silver", points: 850, totalSpent: "Rp 2.100.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB003", name: "David Beckham", level: "Bronze", points: 450, totalSpent: "Rp 950.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB004", name: "Ryan Reynolds", level: "Gold", points: 1800, totalSpent: "Rp 5.400.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB005", name: "Cristiano Ronaldo", level: "Gold", points: 2500, totalSpent: "Rp 8.200.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB006", name: "Lionel Messi", level: "Gold", points: 2200, totalSpent: "Rp 7.100.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB007", name: "Neymar Junior", level: "Silver", points: 950, totalSpent: "Rp 2.700.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB008", name: "Kylian Mbappe", level: "Silver", points: 800, totalSpent: "Rp 2.300.000", status: "Inactive", created_at: new Date().toISOString() },
    { id: "MB009", name: "Kevin De Bruyne", level: "Bronze", points: 350, totalSpent: "Rp 800.000", status: "Active", created_at: new Date().toISOString() },
    { id: "MB010", name: "Erling Haaland", level: "Bronze", points: 400, totalSpent: "Rp 900.000", status: "Active", created_at: new Date().toISOString() }
  ];
};

// Initialize mock tables in localStorage if empty
if (!localStorage.getItem("supabase_mock_users")) {
  localStorage.setItem("supabase_mock_users", JSON.stringify(defaultMockUsers));
}
if (!localStorage.getItem("supabase_mock_barbers")) {
  localStorage.setItem("supabase_mock_barbers", JSON.stringify(getMockBarbers()));
}
if (!localStorage.getItem("supabase_mock_customers")) {
  localStorage.setItem("supabase_mock_customers", JSON.stringify(getMockCustomers()));
}
if (!localStorage.getItem("supabase_mock_services")) {
  localStorage.setItem("supabase_mock_services", JSON.stringify(getMockServices()));
}
if (!localStorage.getItem("supabase_mock_products")) {
  localStorage.setItem("supabase_mock_products", JSON.stringify(initialProducts));
}
if (!localStorage.getItem("supabase_mock_bookings")) {
  localStorage.setItem("supabase_mock_bookings", JSON.stringify(getMockBookings()));
}
if (!localStorage.getItem("supabase_mock_members")) {
  localStorage.setItem("supabase_mock_members", JSON.stringify(getMockMembers()));
}

// Helper to get/set mock DB tables
const getMockTable = (name) => {
  try {
    const data = localStorage.getItem(`supabase_mock_${name}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const setMockTable = (name, data) => {
  localStorage.setItem(`supabase_mock_${name}`, JSON.stringify(data));
};

// Mock Query Builder
class MockQueryBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this.data = getMockTable(tableName);
    this.filters = [];
  }

  select(fields = "*") {
    // Basic select, does not filter columns for simplicity
    return this;
  }

  eq(column, value) {
    this.filters.push({ column, value, type: "eq" });
    return this;
  }

  async insert(rows) {
    const newRows = Array.isArray(rows) ? rows : [rows];
    const updatedRows = newRows.map(row => ({
      id: row.id || `row-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      ...row
    }));
    
    this.data = [...this.data, ...updatedRows];
    setMockTable(this.tableName, this.data);
    return { data: updatedRows, error: null };
  }

  async update(values) {
    this.data = this.data.map(item => {
      let matches = true;
      for (const filter of this.filters) {
        if (filter.type === "eq" && item[filter.column] !== filter.value) {
          matches = false;
        }
      }
      if (matches) {
        return { ...item, ...values };
      }
      return item;
    });

    setMockTable(this.tableName, this.data);
    
    // Return updated items
    const updatedItems = this.data.filter(item => {
      let matches = true;
      for (const filter of this.filters) {
        if (filter.type === "eq" && item[filter.column] !== filter.value) {
          matches = false;
        }
      }
      return matches;
    });

    return { data: updatedItems, error: null };
  }

  async delete() {
    const beforeLength = this.data.length;
    this.data = this.data.filter(item => {
      let matches = true;
      for (const filter of this.filters) {
        if (filter.type === "eq" && item[filter.column] !== filter.value) {
          matches = false;
        }
      }
      return !matches; // Keep items that DO NOT match filters
    });

    setMockTable(this.tableName, this.data);
    return { data: { count: beforeLength - this.data.length }, error: null };
  }

  // Executes query
  async then(onfulfilled) {
    let result = [...this.data];
    // Apply filters
    for (const filter of this.filters) {
      if (filter.type === "eq") {
        result = result.filter(item => item[filter.column] === filter.value);
      }
    }
    
    const response = { data: result, error: null };
    if (onfulfilled) {
      return onfulfilled(response);
    }
    return response;
  }
}

// Create a simulated client
const mockSupabase = {
  isMock: true,
  
  from(tableName) {
    return new MockQueryBuilder(tableName);
  },

  auth: {
    async signUp({ email, password, options }) {
      console.log("[Mock Auth] Sign Up Request:", email);
      const users = getMockTable("users");
      
      if (users.some(u => u.email === email)) {
        return { data: { user: null }, error: new Error("Email already registered.") };
      }

      const name = options?.data?.name || email.split("@")[0];
      const phone = options?.data?.phone || "";
      const role = options?.data?.role || "customer";

      const newUser = {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        password, // Simulating password hashing by storing plaintext for mock
        role,
        phone,
        created_at: new Date().toISOString()
      };

      users.push(newUser);
      setMockTable("users", users);

      const session = {
        access_token: `mock-token-${Math.random().toString(36).substr(2, 12)}`,
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: { name, phone, role },
          created_at: newUser.created_at
        }
      };

      // Set session automatically on registration
      mockSession = session;
      localStorage.setItem("supabase_mock_session", JSON.stringify(session));
      
      // Notify listeners
      mockListeners.forEach(listener => listener("SIGNED_IN", session));

      return { data: { user: session.user, session }, error: null };
    },

    async signInWithPassword({ email, password }) {
      console.log("[Mock Auth] Sign In Request:", email);
      const users = getMockTable("users");
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { data: { user: null, session: null }, error: new Error("Email atau password salah.") };
      }

      const session = {
        access_token: `mock-token-${Math.random().toString(36).substr(2, 12)}`,
        user: {
          id: user.id,
          email: user.email,
          user_metadata: { name: user.name, phone: user.phone, role: user.role },
          created_at: user.created_at
        }
      };

      mockSession = session;
      localStorage.setItem("supabase_mock_session", JSON.stringify(session));
      
      // Notify listeners
      mockListeners.forEach(listener => listener("SIGNED_IN", session));

      return { data: { user: session.user, session }, error: null };
    },

    async signOut() {
      console.log("[Mock Auth] Sign Out Request");
      mockSession = null;
      localStorage.removeItem("supabase_mock_session");
      
      // Notify listeners
      mockListeners.forEach(listener => listener("SIGNED_OUT", null));
      return { error: null };
    },

    async getSession() {
      return { data: { session: mockSession }, error: null };
    },

    async getUser() {
      if (mockSession?.user) {
        return { data: { user: mockSession.user }, error: null };
      }
      return { data: { user: null }, error: null };
    },

    async updateUser({ data: metadata }) {
      if (!mockSession?.user) {
        return { data: null, error: new Error("Not authenticated") };
      }
      mockSession.user.user_metadata = { ...mockSession.user.user_metadata, ...metadata };
      localStorage.setItem("supabase_mock_session", JSON.stringify(mockSession));
      return { data: { user: mockSession.user }, error: null };
    },

    onAuthStateChange(callback) {
      mockListeners.push(callback);
      // Immediately call with current state
      callback(mockSession ? "SIGNED_IN" : "SIGNED_OUT", mockSession);
      
      // Return unsubscribe function
      return {
        data: {
          subscription: {
            unsubscribe() {
              mockListeners = mockListeners.filter(l => l !== callback);
            }
          }
        }
      };
    }
  }
};

// Exports client based on configuration
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabase;

console.log(
  isSupabaseConfigured
    ? "[Supabase] Connected to real database."
    : "[Supabase] Missing/default keys. Running in MOCK localStorage mode."
);
export default supabase;
