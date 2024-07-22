import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormLabel, FormItem } from '@/components/ui/form'

type MultiSelectDropdownProps = {
  value?: string[]
  onChangeHandler: (value: string[]) => void
  placeholder?: string
  options: { label: string; value: string }[]
  isDisabled?: boolean
  uniqueValue: string // added unique value prop
}

const MultiSelectDropdown = ({
  value = [],
  onChangeHandler,
  placeholder = 'option',
  options,
  isDisabled = false,
  uniqueValue, // destructure the unique value prop
}: MultiSelectDropdownProps) => {
  const handleCheckboxChange = (checkedValue: string, checked: boolean) => {
    if (checked) {
      onChangeHandler([...value, checkedValue])
    } else {
      onChangeHandler(value.filter((val) => val !== checkedValue))
    }
  }

  return (
    <AccordionItem value={uniqueValue}>
      <AccordionTrigger disabled={isDisabled} className="accordion-trigger">
        {`Choose ${placeholder}`}
      </AccordionTrigger>
      <AccordionContent>
        {options.length > 0 &&
          options.map((option) => (
            <FormItem
              key={option.value}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option.value, !!checked)
                  }
                />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
      </AccordionContent>
    </AccordionItem>
  )
}

export default MultiSelectDropdown
