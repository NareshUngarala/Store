export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-[#6B7280]">Total Revenue</h3>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-[#F2B705] flex items-center justify-center flex-shrink-0">
              <span className="text-[#1A1A1A] text-xs font-bold">$</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#1F2937]">$124,563</p>
          <p className="text-xs text-[#2E7D32] mt-1">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-[#6B7280]">Active Stores</h3>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-[#F2B705] flex items-center justify-center flex-shrink-0">
              <span className="text-[#1A1A1A] text-xs font-bold">🏪</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#1F2937]">24</p>
          <p className="text-xs text-[#6B7280] mt-1">3 new this month</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-[#6B7280]">Total Bookings</h3>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-[#F2B705] flex items-center justify-center flex-shrink-0">
              <span className="text-[#1A1A1A] text-xs font-bold">📅</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#1F2937]">1,247</p>
          <p className="text-xs text-[#2E7D32] mt-1">+8.2% from last month</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-[#6B7280]">Staff Members</h3>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-[#F2B705] flex items-center justify-center flex-shrink-0">
              <span className="text-[#1A1A1A] text-xs font-bold">👥</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#1F2937]">156</p>
          <p className="text-xs text-[#6B7280] mt-1">12 active today</p>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-2">Overview</h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Welcome to the StoreOS admin dashboard. Manage your retail operations efficiently.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-2">Quick Actions</h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Access frequently used features and shortcuts.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 card-hover" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
          <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-2">Recent Activity</h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            View the latest updates and notifications.
          </p>
        </div>
      </div>
    </div>
  );
}
