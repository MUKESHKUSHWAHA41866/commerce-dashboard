export function PlatformTabs() {
  return (
    <div className="flex gap-4 mt-4">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#f8cb46]/10 rounded-md border border-[#f8cb46]/30">
        <div className="w-5 h-5 bg-[#f8cb46] rounded flex items-center justify-center text-xs font-bold text-white">
          B
        </div>
        <span className="text-sm font-medium">Blinkit</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-[#6c4fed]/10 rounded-md border border-[#6c4fed]/30">
        <div className="w-5 h-5 bg-[#6c4fed] rounded flex items-center justify-center text-xs font-bold text-white">
          Z
        </div>
        <span className="text-sm font-medium">Zepto</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-[#e25d33]/10 rounded-md border border-[#e25d33]/30">
        <div className="w-5 h-5 bg-[#e25d33] rounded flex items-center justify-center text-xs font-bold text-white">
          I
        </div>
        <span className="text-sm font-medium">Instamart</span>
      </div>
    </div>
  )
}

