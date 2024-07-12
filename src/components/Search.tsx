import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

function SearchComponent({ isLoading }: { isLoading: boolean }) {
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearch = () => {
    const regex = /^[a-zA-Z_]+$/
    if (!regex.test(searchValue)) {
      setError('Search term contains invalid characters.')
      return
    }

    setError(null)
    if (searchValue) {
      setSearchParams({ search: searchValue })
    } else {
      searchParams.delete('search')
      setSearchParams(searchParams)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    const regex = /^[a-zA-Z_]*$/
    if (!regex.test(value)) {
      setError('Search term contains invalid characters.')
    } else {
      setError(null)
      if (!value) {
        searchParams.delete('search')
        setSearchParams(searchParams)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="flex items-center gap-x-1">
        <Input
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search brand"
          className="bg-white h-[40px] focus-visible:ring-offset-0 placeholder:text-gray-500 rounded-2xl p-regular-16 px-4 py-3 border focus-visible:ring-transparent"
        />
        <button
          aria-label="search brand"
          disabled={isLoading || !searchValue}
          onClick={handleSearch}
          className="w-10 h-8 p-1 text-white rounded-full cursor-pointer flex-center bg-yellow aspect-square"
        >
          <Search width={20} />
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default SearchComponent
