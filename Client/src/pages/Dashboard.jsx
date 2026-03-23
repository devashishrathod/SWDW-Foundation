import { useMemo, useState } from "react";
import {
  Users,
  Heart,
  Image,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  UserCheck,
  Building,
  Filter,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { RangeFilter } from "../components/dashboard/RangeFilter";
import { TIME_PERIODS } from "../constants/appConstants";

// Mock data for SWDW Foundation
const buildSWDWDashboard = ({ range }) => {
  const seed =
    range === TIME_PERIODS.TODAY ? 1 : range === TIME_PERIODS.WEEKLY ? 7 : 30;

  return {
    metrics: {
      volunteers: {
        current: 85 + seed * 2,
        prev: 78 + seed,
        trendPct: 12,
      },
      users: {
        current: 1250 + seed * 5,
        prev: 1100 + seed * 3,
        trendPct: 15,
      },
      donations: {
        current: 328000 + seed * 1000,
        prev: 280000 + seed * 800,
        trendPct: 20,
      },
      gallery: {
        current: 450 + seed * 3,
        prev: 400 + seed * 2,
        trendPct: 8,
      },
    },
    categoryData: [
      { name: "Education", value: 350, color: "bg-red-500" },
      { name: "Healthcare", value: 280, color: "bg-red-400" },
      { name: "Community", value: 180, color: "bg-red-300" },
      { name: "Environment", value: 120, color: "bg-red-200" },
    ],
    donationChart: [
      { month: "Jan", amount: 45000, efficiency: 75 },
      { month: "Feb", amount: 52000, efficiency: 82 },
      { month: "Mar", amount: 48000, efficiency: 78 },
      { month: "Apr", amount: 61000, efficiency: 85 },
      { month: "May", amount: 58000, efficiency: 88 },
      { month: "Jun", amount: 64000, efficiency: 92 },
    ],
    todayStats: {
      active: 750,
      pending: 350,
      completed: 150,
    },
  };
};

export function AdminDashboard() {
  const { user } = useAuth();
  const [range, setRange] = useState(TIME_PERIODS.WEEKLY);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const dashboard = useMemo(
    () =>
      buildSWDWDashboard({
        range,
        ...(range === TIME_PERIODS.CUSTOM
          ? dateRange
          : { startDate: "", endDate: "" }),
      }),
    [range, dateRange],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="rounded-3xl border border-red-200/70 bg-gradient-to-br from-white via-red-50/40 to-white p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              SWDW Foundation Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Overview of volunteers, users, donations and gallery
            </p>
          </div>
          <RangeFilter
            value={range}
            onChange={setRange}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateChange={setDateRange}
          />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Volunteers
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboard.metrics.volunteers.current}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">
                    {dashboard.metrics.volunteers.trendPct}%
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboard.metrics.users.current}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">
                    {dashboard.metrics.users.trendPct}%
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Donations
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{dashboard.metrics.donations.current.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">
                    {dashboard.metrics.donations.trendPct}%
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Gallery Items
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dashboard.metrics.gallery.current}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">
                    {dashboard.metrics.gallery.trendPct}%
                  </span>
                </div>
              </div>
              <div className="bg-teal-100 p-3 rounded-lg">
                <Image className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mb-6">
          {/* Category/Service Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Category Distribution
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {dashboard.categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${category.color} mr-3`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {category.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Simple donut chart visualization */}
            <div className="mt-4 flex justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-8 border-red-500"></div>
                <div className="absolute inset-2 rounded-full border-8 border-red-400 border-t-transparent border-r-transparent transform rotate-45"></div>
                <div className="absolute inset-4 rounded-full border-8 border-red-300 border-b-transparent border-l-transparent transform -rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">930</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Donation Report
              </h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {dashboard.donationChart.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {item.month}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-red-500 h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(item.amount / 65000) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          ₹{(item.amount / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.efficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Revenue (₹)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Efficiency %</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Overview
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Active</p>
                  <p className="text-xl font-bold text-green-900">
                    {dashboard.todayStats.active}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-800">Pending</p>
                  <p className="text-xl font-bold text-orange-900">
                    {dashboard.todayStats.pending}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <div className="w-4 h-1 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Completed</p>
                  <p className="text-xl font-bold text-red-900">
                    {dashboard.todayStats.completed}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
