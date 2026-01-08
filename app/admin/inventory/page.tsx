export default function InventoryPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#1F2937] mb-2">Inventory</h1>
      <p className="text-sm sm:text-base text-[#6B7280] mb-4 sm:mb-6">
        Track and manage your product inventory across all stores.
      </p>
      
      <div className="bg-white rounded-lg sm:rounded-xl border border-[#E5E7EB] p-4 sm:p-6" style={{ boxShadow: '0 1px 3px 0 rgba(16, 24, 40, 0.08)' }}>
        <h2 className="text-base sm:text-lg font-semibold text-[#1F2937] mb-3 sm:mb-4">Inventory Management</h2>
        <p className="text-sm sm:text-base text-[#6B7280]">
          View and manage product inventory levels
        </p>
      </div>
    </div>
  );
}
