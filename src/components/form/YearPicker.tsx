import React, { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface YearPickerProps {
  value?: string
  onChangeHandler?: () => void
  placeholder?: string
}

export default function YearPicker({
  value,
  onChangeHandler,
  placeholder = 'option',
}: YearPickerProps) {
  const years = []
  for (let year = new Date().getFullYear(); year >= 1900; year--) {
    years.push(year)
  }

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field ring-0 focus:ring-0 input-fields">
        <SelectValue placeholder={`Choose ${placeholder}`} />
      </SelectTrigger>
      <SelectContent className="max-h-44">
        {years.length > 0 &&
          years.map((year) => (
            <SelectItem
              key={year}
              value={year.toString()}
              className="select-item p-regular-14"
            >
              {year}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
