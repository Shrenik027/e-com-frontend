"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "@/services/api";
import { getMyOrders } from "@/services/order";
import type { Order as OrderType } from "@/services/types/order";
import {
  User,
  MapPin,
  Shield,
  Settings,
  LogOut,
  Home,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Edit2,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  ChevronRight,
  CreditCard,
  Package,
  Heart,
  Bell,
  Lock,
  Globe,
  Save,
} from "lucide-react";

/* ================= TYPES ================= */

type Address = {
  _id: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

type UserType = {
  name: string;
  email: string;
  role: string;
  phone?: string;
  emailVerified: boolean;
  addresses: Address[];
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "profile" | "addresses" | "security" | "orders"
  >("dashboard");

  /* ---------- Profile ---------- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  /* ---------- Address ---------- */
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  /* ---------- Security ---------- */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  /* ================= FETCH USER ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        const data = res.data.user ?? res.data;
        setUser(data);
        setName(data.name);
        setPhone(data.phone || "");
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  /* ================= FETCH ORDERS ================= */

  useEffect(() => {
    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const ordersData = await getMyOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  /* ================= LOADING STATE ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-background-tertiary border-t-brand"></div>
          <p className="mt-6 text-lg text-muted font-medium">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  /* ================= ACTIONS ================= */

  const updateProfile = async () => {
    setSavingProfile(true);
    try {
      const res = await API.put("/users/me", { name, phone });
      setUser(res.data.user ?? res.data);

      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-6 right-6 bg-gradient-to-r from-accent-green to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-[100] flex items-center gap-3";
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span class="font-semibold">Profile updated successfully!</span>
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch {
      alert("Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const resetAddressForm = () => {
    setEditingAddress(null);
    setStreet("");
    setCity("");
    setZipCode("");
    setCountry("");
    setIsDefault(false);
    setShowAddressForm(false);
  };

  const editAddress = (addr: Address) => {
    setEditingAddress(addr);
    setStreet(addr.street);
    setCity(addr.city);
    setZipCode(addr.zipCode);
    setCountry(addr.country);
    setIsDefault(addr.isDefault);
    setShowAddressForm(true);
  };

  const saveAddress = async () => {
    const payload = { street, city, zipCode, country, isDefault };

    try {
      const res = editingAddress
        ? await API.put(`/users/address/${editingAddress._id}`, payload)
        : await API.post("/users/address", payload);

      // Handle response shape properly
      if (res.data.user) {
        setUser(res.data.user);
      } else if (res.data.addresses) {
        setUser({ ...user, addresses: res.data.addresses });
      } else {
        // Re-fetch user data to ensure consistency
        const userRes = await API.get("/users/me");
        setUser(userRes.data.user ?? userRes.data);
      }

      resetAddressForm();

      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-6 right-6 bg-gradient-to-r from-accent-green to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-[100] flex items-center gap-3";
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span class="font-semibold">${
          editingAddress ? "Address updated!" : "Address added!"
        }</span>
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch {
      alert("Failed to save address");
    }
  };

  const deleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await API.delete(`/users/address/${id}`);
      setUser(res.data.user ?? res.data);
    } catch {
      alert("Failed to delete address");
    }
  };

  const setDefaultAddress = async (id: string) => {
    try {
      const res = await API.put(`/users/address/${id}`, { isDefault: true });
      setUser(res.data.user ?? res.data);
    } catch {
      alert("Failed to set default address");
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);
    try {
      await API.put("/users/change-password", {
        oldPassword: currentPassword,
        newPassword,
      });

      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-6 right-6 bg-gradient-to-r from-accent-green to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-[100] flex items-center gap-3";
      successMsg.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <span class="font-semibold">Password updated successfully!</span>
      `;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      alert("Failed to change password. Please check your current password.");
    } finally {
      setChangingPassword(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  /* ================= UI COMPONENTS ================= */

  const SidebarItem = ({
    id,
    label,
    icon: Icon,
    count,
  }: {
    id: typeof activeTab;
    label: string;
    icon: React.ElementType;
    count?: number;
  }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl text-base transition-all duration-200 ${
        activeTab === id
          ? "bg-gradient-to-r from-brand to-orange-500 text-white shadow-lg"
          : "text-secondary hover:bg-background-tertiary hover:text-primary"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{label}</span>
      </div>
      {count !== undefined && (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            activeTab === id
              ? "bg-white/20"
              : "bg-background-tertiary text-muted"
          }`}
        >
          {count}
        </span>
      )}
      <ChevronRight
        className={`w-4 h-4 transition-transform ${
          activeTab === id ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      {/* HEADER */}
      <div className="bg-background-secondary border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">My Account</h1>
              <p className="text-muted mt-3">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-medium text-primary">{user.name}</p>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <aside className="space-y-3">
            <div className="bg-background-secondary rounded-2xl border border-theme p-4 space-y-2">
              <SidebarItem id="dashboard" label="Dashboard" icon={Home} />
              <SidebarItem id="profile" label="Profile" icon={User} />
              <SidebarItem
                id="addresses"
                label="Addresses"
                icon={MapPin}
                count={user.addresses.length}
              />
              <SidebarItem id="orders" label="Orders" icon={Package} />
              <SidebarItem id="security" label="Security" icon={Shield} />
            </div>

            <div className="bg-background-secondary rounded-2xl border border-theme p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="flex items-center justify-center gap-2 w-full text-red-500 hover:text-red-600 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </aside>

          {/* MAIN PANEL */}
          <main className="lg:col-span-3">
            <div className="bg-background-secondary rounded-2xl border border-theme p-6 md:p-8">
              {/* DASHBOARD TAB */}
              {activeTab === "dashboard" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Welcome back, {user.name} 👋
                    </h2>
                    <p className="text-muted text-lg">
                      Here's an overview of your account
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-background-tertiary border border-theme rounded-2xl p-6 hover:border-brand/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-accent-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-muted">Email</p>
                          <p className="font-semibold text-primary truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            user.emailVerified
                              ? "bg-accent-green/10 text-accent-green"
                              : "bg-brand/10 text-brand"
                          }`}
                        >
                          {user.emailVerified ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </>
                          ) : (
                            "Not Verified"
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="bg-background-tertiary border border-theme rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted">Member Since</p>
                          <p className="font-semibold text-primary">
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background-tertiary border border-theme rounded-2xl p-6 hover:border-accent-green/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent-green/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-accent-green" />
                        </div>
                        <div>
                          <p className="text-sm text-muted">Saved Addresses</p>
                          <p className="font-semibold text-primary text-2xl">
                            {user.addresses.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-6">
                      Quick Actions
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab("profile")}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-theme hover:border-accent-blue transition-all group bg-background-tertiary"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                          <Edit2 className="w-5 h-5 text-accent-blue" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-primary">
                            Update Profile
                          </p>
                          <p className="text-sm text-muted">
                            Edit your personal information
                          </p>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab("security")}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-theme hover:border-accent-green transition-all group bg-background-tertiary"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent-green/10 flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                          <Lock className="w-5 h-5 text-accent-green" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-primary">
                            Change Password
                          </p>
                          <p className="text-sm text-muted">
                            Update your security settings
                          </p>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-2xl"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Profile Settings
                    </h2>
                    <p className="text-muted text-lg">
                      Update your personal information and preferences
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-background-tertiary rounded-2xl border border-theme p-6">
                      <h3 className="font-semibold text-primary mb-6 flex items-center gap-3">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pl-12 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                              placeholder="Enter your full name"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              value={user.email}
                              readOnly
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pl-12 text-muted"
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pl-12 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                              placeholder="+1 (555) 123-4567"
                            />
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-theme">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={updateProfile}
                          disabled={savingProfile}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-orange-500 text-white px-7 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {savingProfile ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Save Changes
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-3">
                        Saved Addresses
                      </h2>
                      <p className="text-muted text-lg">
                        Manage your shipping and billing addresses
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        resetAddressForm();
                        setShowAddressForm(true);
                      }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-orange-500 text-white px-5 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-brand/20"
                    >
                      <Plus className="w-5 h-5" />
                      Add New Address
                    </motion.button>
                  </div>

                  {/* Address Grid */}
                  {user.addresses.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {user.addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`border rounded-2xl p-6 transition-all ${
                            addr.isDefault
                              ? "border-brand bg-gradient-to-br from-background-tertiary to-background-secondary"
                              : "border-theme hover:border-accent-blue bg-background-tertiary"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <Home
                                className={`w-5 h-5 ${
                                  addr.isDefault ? "text-brand" : "text-muted"
                                }`}
                              />
                              {addr.isDefault && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-brand/10 to-orange-500/10 text-brand text-xs font-bold">
                                  <CheckCircle className="w-3 h-3" />
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => editAddress(addr)}
                                className="p-2.5 text-muted hover:text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
                                title="Edit address"
                              >
                                <Edit2 className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteAddress(addr._id)}
                                className="p-2.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete address"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>

                          <p className="font-semibold text-primary text-lg mb-2">
                            {addr.street}
                          </p>
                          <p className="text-secondary mb-1">
                            {addr.city}, {addr.zipCode}
                          </p>
                          <p className="text-secondary">{addr.country}</p>

                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr._id)}
                              className="mt-6 text-sm font-semibold text-accent-blue hover:text-[#60A5FA]"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-theme rounded-2xl">
                      <MapPin className="w-12 h-12 text-theme mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No addresses saved
                      </h3>
                      <p className="text-muted mb-6">
                        Add your first shipping address
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddressForm(true)}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-orange-500 text-white px-5 py-3.5 rounded-xl font-bold"
                      >
                        <Plus className="w-5 h-5" />
                        Add Address
                      </motion.button>
                    </div>
                  )}

                  {/* Address Form */}
                  {showAddressForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-8 pt-8 border-t border-theme"
                    >
                      <h3 className="text-xl font-semibold text-primary mb-6">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Street Address
                          </label>
                          <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full bg-background border border-theme rounded-xl px-4 py-3.5 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                            placeholder="123 Main St"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            City
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-background border border-theme rounded-xl px-4 py-3.5 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            ZIP Code
                          </label>
                          <input
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full bg-background border border-theme rounded-xl px-4 py-3.5 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                            placeholder="10001"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Country
                          </label>
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-background border border-theme rounded-xl px-4 py-3.5 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                            placeholder="United States"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="defaultAddress"
                          checked={isDefault}
                          onChange={(e) => setIsDefault(e.target.checked)}
                          className="w-5 h-5 rounded-lg border-theme bg-background text-brand focus:ring-brand focus:ring-2"
                        />
                        <label
                          htmlFor="defaultAddress"
                          className="text-secondary font-medium"
                        >
                          Set as default shipping address
                        </label>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={saveAddress}
                          className="bg-gradient-to-r from-brand to-orange-500 text-white px-6 py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-brand/20"
                        >
                          {editingAddress ? "Update Address" : "Save Address"}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={resetAddressForm}
                          className="border border-theme text-secondary px-6 py-3.5 rounded-xl font-bold text-lg hover:bg-background-tertiary transition-colors"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-2xl"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Security Settings
                    </h2>
                    <p className="text-muted text-lg">
                      Manage your password and security preferences
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Change Password Card */}
                    <div className="bg-background-tertiary rounded-2xl border border-theme p-6">
                      <h3 className="font-semibold text-primary mb-6 flex items-center gap-3">
                        <Lock className="w-5 h-5" />
                        Change Password
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.current ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pr-12 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  current: !prev.current,
                                }))
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary"
                            >
                              {showPassword.current ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.new ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pr-12 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  new: !prev.new,
                                }))
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary"
                            >
                              {showPassword.new ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <p className="mt-3 text-sm text-muted">
                            Must be at least 6 characters long
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary mb-3">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.confirm ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="w-full bg-background border border-theme rounded-xl px-5 py-4 pr-12 text-secondary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  confirm: !prev.confirm,
                                }))
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-secondary"
                            >
                              {showPassword.confirm ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-4">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={changePassword}
                            disabled={
                              changingPassword ||
                              !currentPassword ||
                              !newPassword ||
                              !confirmPassword
                            }
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-green to-[#4ADE80] text-white px-7 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-accent-green/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {changingPassword ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Updating...
                              </>
                            ) : (
                              <>
                                <Lock className="w-5 h-5" />
                                Update Password
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Security Tips */}
                    <div className="bg-background-tertiary rounded-2xl border border-theme p-6">
                      <h4 className="font-semibold text-primary mb-6 flex items-center gap-3">
                        <Shield className="w-5 h-5" />
                        Security Tips
                      </h4>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                          <span className="text-secondary">
                            Use a unique password that you don't use elsewhere
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                          <span className="text-secondary">
                            Enable two-factor authentication if available
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                          <span className="text-secondary">
                            Regularly update your password every 3-6 months
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ORDERS TAB */}
              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      Order History
                    </h2>
                    <p className="text-muted text-lg">
                      Track and manage your orders
                    </p>
                  </div>

                  {ordersLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme border-t-brand"></div>
                      <p className="mt-4 text-muted">Loading your orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-theme mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        No orders yet
                      </h3>
                      <p className="text-muted mb-6">
                        Your order history will appear here
                      </p>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/shop"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-brand to-orange-500 text-white px-6 py-3.5 rounded-xl font-bold"
                      >
                        Start Shopping
                      </motion.a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border border-theme rounded-2xl p-6 hover:border-brand/30 transition-colors bg-background-tertiary"
                        >
                          {/* HEADER */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="font-semibold text-primary">
                                Order #{order._id.slice(-6).toUpperCase()}
                              </p>
                              <p className="text-sm text-muted">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex flex-col sm:items-end gap-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                  order.orderStatus === "delivered"
                                    ? "bg-accent-green/10 text-accent-green"
                                    : order.orderStatus === "cancelled"
                                    ? "bg-red-500/10 text-red-500"
                                    : order.orderStatus === "shipped"
                                    ? "bg-purple-500/10 text-purple-500"
                                    : "bg-brand/10 text-brand"
                                }`}
                              >
                                {order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)}
                              </span>

                              <p className="font-bold text-primary text-lg">
                                ₹{order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* ITEMS */}
                          {order.items.length > 0 && (
                            <div className="pt-4 border-t border-theme">
                              <p className="text-sm text-muted mb-2">
                                {order.items.length} item
                                {order.items.length > 1 ? "s" : ""} in this
                                order
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {order.items.slice(0, 3).map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="text-xs text-muted bg-background px-3 py-1 rounded-full"
                                  >
                                    {item.quantity}× {item.name}
                                  </div>
                                ))}

                                {order.items.length > 3 && (
                                  <div className="text-xs text-muted bg-background px-3 py-1 rounded-full">
                                    +{order.items.length - 3} more
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
