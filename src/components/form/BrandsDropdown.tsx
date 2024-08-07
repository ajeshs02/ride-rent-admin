'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Brand = {
  id: string | number
  label: string
  value: string
}

type BrandsDropdownProps = {
  value?: string
  onChangeHandler?: (value: string) => void
  placeholder?: string
  isDisabled?: boolean
}

const BrandsDropdown = ({
  value,
  onChangeHandler,
  placeholder = 'brand',
  isDisabled = false,
}: BrandsDropdownProps) => {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || '')
  const [brands, setBrands] = React.useState<Brand[]>([])

  React.useEffect(() => {
    // Simulate data fetching delay
    const fetchBrands = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setBrands([
        { id: 1, label: 'Brand A', value: 'brand_a' },
        { id: 2, label: 'Brand B', value: 'brand_b' },
        { id: 3, label: 'Brand C', value: 'brand_c' },
        { id: 4, label: 'Rolse Royce', value: 'rolseroys' },
      ])
    }

    fetchBrands()
  }, [])

  const handleSelect = (currentValue: string) => {
    setSelectedValue(currentValue)
    if (onChangeHandler) onChangeHandler(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={isDisabled}
          className="justify-between w-full font-normal"
        >
          {selectedValue
            ? brands.find((brand) => brand.value === selectedValue)?.label
            : `Choose ${placeholder}`}
          <ChevronDown className="w-6 h-6 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:!w-96 p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {brands.map((brand) => (
                <CommandItem
                  key={brand.id}
                  value={brand.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValue === brand.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {brand.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default BrandsDropdown
