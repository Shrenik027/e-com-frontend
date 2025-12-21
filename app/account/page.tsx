"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";
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
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "profile" | "addresses" | "security" | "orders" | "wishlist"
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

  /* ================= LOADING STATE ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
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
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMsg.textContent = "Profile updated successfully!";
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

      setUser(res.data.user ?? res.data);
      resetAddressForm();

      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMsg.textContent = editingAddress
        ? "Address updated!"
        : "Address added!";
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
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMsg.textContent = "Password updated successfully!";
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
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
        activeTab === id
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
      {count !== undefined && (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            activeTab === id ? "bg-white/20" : "bg-gray-200"
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
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-2">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
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
            <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-2">
              <SidebarItem id="dashboard" label="Dashboard" icon={Home} />
              <SidebarItem id="profile" label="Profile" icon={User} />
              <SidebarItem
                id="addresses"
                label="Addresses"
                icon={MapPin}
                count={user.addresses.length}
              />
              <SidebarItem id="orders" label="Orders" icon={Package} />
              <SidebarItem id="wishlist" label="Wishlist" icon={Heart} />
              <SidebarItem id="security" label="Security" icon={Shield} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-4">
              <button
                onClick={logout}
                className="flex items-center justify-center gap-2 w-full text-red-600 hover:text-red-700 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>

          {/* MAIN PANEL */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
              {/* DASHBOARD TAB */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, {user.name} 👋
                    </h2>
                    <p className="text-gray-600">
                      Here's an overview of your account
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold text-gray-900 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            user.emailVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
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

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="font-semibold text-gray-900">
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

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Saved Addresses
                          </p>
                          <p className="font-semibold text-gray-900 text-2xl">
                            {user.addresses.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className="flex items-center gap-4 p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
                          <Edit2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">
                            Update Profile
                          </p>
                          <p className="text-sm text-gray-500">
                            Edit your personal information
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab("security")}
                        className="flex items-center gap-4 p-4 border rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200">
                          <Lock className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">
                            Change Password
                          </p>
                          <p className="text-sm text-gray-500">
                            Update your security settings
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="max-w-2xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Profile Settings
                    </h2>
                    <p className="text-gray-600">
                      Update your personal information and preferences
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter your full name"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              value={user.email}
                              readOnly
                              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-3 pl-11 text-gray-500"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="+1 (555) 123-4567"
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <button
                          onClick={updateProfile}
                          disabled={savingProfile}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
                        >
                          {savingProfile ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Saved Addresses
                      </h2>
                      <p className="text-gray-600">
                        Manage your shipping and billing addresses
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        resetAddressForm();
                        setShowAddressForm(true);
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                      Add New Address
                    </button>
                  </div>

                  {/* Address Grid */}
                  {user.addresses.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {user.addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`border rounded-xl p-6 transition-all ${
                            addr.isDefault
                              ? "border-blue-300 bg-blue-50/30"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <Home className="w-5 h-5 text-gray-400" />
                              {addr.isDefault && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                                  <CheckCircle className="w-3 h-3" />
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editAddress(addr)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit address"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteAddress(addr._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete address"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="font-medium text-gray-900 mb-2">
                            {addr.street}
                          </p>
                          <p className="text-gray-600 mb-1">
                            {addr.city}, {addr.zipCode}
                          </p>
                          <p className="text-gray-600">{addr.country}</p>

                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr._id)}
                              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No addresses saved
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Add your first shipping address
                      </p>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Add Address
                      </button>
                    </div>
                  )}

                  {/* Address Form */}
                  {showAddressForm && (
                    <div className="mt-8 pt-8 border-t">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="123 Main St"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="10001"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="defaultAddress"
                          className="text-sm text-gray-700"
                        >
                          Set as default shipping address
                        </label>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <button
                          onClick={saveAddress}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                          {editingAddress ? "Update Address" : "Save Address"}
                        </button>
                        <button
                          onClick={resetAddressForm}
                          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="max-w-2xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Security Settings
                    </h2>
                    <p className="text-gray-600">
                      Manage your password and security preferences
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Change Password Card */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Change Password
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.current ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.new ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword.new ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Must be at least 6 characters long
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.confirm ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                          <button
                            onClick={changePassword}
                            disabled={
                              changingPassword ||
                              !currentPassword ||
                              !newPassword ||
                              !confirmPassword
                            }
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                          >
                            {changingPassword ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Updating...
                              </>
                            ) : (
                              <>
                                <Lock className="w-5 h-5" />
                                Update Password
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Security Tips */}
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security Tips
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Use a unique password that you don't use elsewhere
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Enable two-factor authentication if available
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Regularly update your password every 3-6 months
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === "orders" && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your order history will appear here
                  </p>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Start Shopping
                  </a>
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === "wishlist" && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Save items you love for later
                  </p>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-rose-700 transition-all"
                  >
                    <Heart className="w-5 h-5" />
                    Browse Products
                  </a>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
