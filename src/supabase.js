import { createClient } from "@supabase/supabase-js";

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

// Initialize mock users in localStorage if empty
if (!localStorage.getItem("supabase_mock_users")) {
  localStorage.setItem("supabase_mock_users", JSON.stringify(defaultMockUsers));
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
