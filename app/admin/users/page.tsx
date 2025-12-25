"use client";

import { useEffect, useState } from "react";
import {
  getAllUsers,
  toggleUserStatus,
  updateUserRole,
} from "@/services/adminUsers";
import Link from "next/link";
import {
  Users,
  User,
  Shield,
  ShieldAlert,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusToggle = async (userId: string) => {
    try {
      setUpdatingId(userId);
      await toggleUserStatus(userId);
      await loadUsers();
    } catch {
      alert("Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      setUpdatingId(userId);
      await updateUserRole(userId, role as "user" | "admin");
      await loadUsers();
    } catch {
      alert("Failed to update user role");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "blocked" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    blocked: users.filter((u) => !u.isActive).length,
    admins: users.filter((u) => u.role === "admin").length,
    users: users.filter((u) => u.role === "user").length,
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#F59E0B]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Loading Users
            </h3>
            <p className="text-muted">Fetching user data from your store...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            User Management
          </h1>
          <p className="text-muted mt-2">
            Manage user accounts, roles, and access
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2.5 bg-background-tertiary border border-theme rounded-lg text-secondary hover:text-primary hover:bg-background-tertiary/80 transition-colors disabled:opacity-50"
            title="Refresh users"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.total}
            </span>
          </div>
          <p className="text-xs text-muted">Total Users</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-[#22C55E]/10 rounded-lg">
              <UserCheck className="w-5 h-5 text-[#22C55E]" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.active}
            </span>
          </div>
          <p className="text-xs text-muted">Active</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <UserX className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.blocked}
            </span>
          </div>
          <p className="text-xs text-muted">Blocked</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.admins}
            </span>
          </div>
          <p className="text-xs text-muted">Admins</p>
        </div>

        <div className="bg-background-secondary rounded-xl border border-theme p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <User className="w-5 h-5 text-cyan-500" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {stats.users}
            </span>
          </div>
          <p className="text-xs text-muted">Regular Users</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-background-secondary rounded-xl border border-theme p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background-tertiary border border-theme rounded-lg text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="user">Regular Users</option>
                <option value="admin">Administrators</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background-tertiary border border-theme rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
            <div className="text-sm text-muted">
              {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-background-secondary rounded-xl border border-theme overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background-tertiary">
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  User
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Contact
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Role
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-semibold text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <Users className="w-16 h-16 text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No users found
                      </h3>
                      <p className="text-muted">
                        {searchTerm ||
                        roleFilter !== "all" ||
                        statusFilter !== "all"
                          ? "No users match your search criteria"
                          : "No users registered yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-background-tertiary/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link href={`/admin/users/${user._id}`} className="group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user.name?.[0]?.toUpperCase() || "U"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-primary group-hover:text-[#F59E0B] transition-colors">
                              {user.name || "Unnamed User"}
                            </p>
                            <p className="text-xs text-muted mt-1">
                              ID: {user._id?.slice(-8).toUpperCase() || "N/A"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td className="p-4">
                      <div>
                        <p className="font-medium text-primary flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted" />
                          {user.email || "No email"}
                        </p>
                        {user.createdAt && (
                          <p className="text-xs text-muted mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={user.role}
                          disabled={updatingId === user._id}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="px-3 py-1.5 bg-background-tertiary border border-theme rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                        {updatingId === user._id && (
                          <Loader2 className="w-4 h-4 animate-spin text-[#F59E0B]" />
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          user.isActive
                            ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20"
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Blocked
                          </>
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/users/${user._id}`}
                          className="p-2 text-[#38BDF8] hover:text-[#60A5FA] hover:bg-[#38BDF8]/10 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleStatusToggle(user._id)}
                          disabled={updatingId === user._id}
                          className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                            user.isActive
                              ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              : "text-[#22C55E] hover:text-[#16A34A] hover:bg-[#22C55E]/10"
                          }`}
                          title={user.isActive ? "Block user" : "Unblock user"}
                        >
                          {updatingId === user._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : user.isActive ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
