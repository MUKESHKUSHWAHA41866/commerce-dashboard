"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export function DateRangePicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(2025, 1, 1), // February 1, 2025
    to: new Date(2025, 1, 28), // February 28, 2025
  })

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 border border-[#d9d9d9] rounded-md px-3 py-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2Z"
              stroke="#8c9198"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M11 1V3" stroke="#8c9198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 1V3" stroke="#8c9198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 7H14" stroke="#8c9198" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">
            {format(date.from, "MMM dd, yyyy")} - {format(date.to, "MMM dd, yyyy")}
          </span>
          <ChevronDown className="w-4 h-4 text-[#8c9198]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex">
          <Calendar
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                setDate({ from: range.from, to: range.to })
              }
            }}
            numberOfMonths={2}
          />
        </div>
        <div className="flex items-center justify-end gap-2 p-3 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => setIsOpen(false)} className="bg-[#027056] hover:bg-[#025d47]">
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

