import { sidebarContent } from '@/constants'
import { useAdminContext } from '@/context/AdminContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar, isSmallScreen } = useAdminContext()
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (link: string) => {
    navigate(link)
    toggleSidebar()
  }

  return (
    <aside
      className={`fixed top-0 h-full bg-white w-56  transition-all duration-300 ease-in-out z-[101]   ${
        isSidebarOpen ? 'left-0' : '-left-56'
      } ${!isSmallScreen && '!left-0'}`}
    >
      <div className="flex items-center justify-between p-0  h-[4.84rem] border-b border-b-slate-100 px-[0.6rem]">
        <Link to={'/'} className="p-0 text-sm text-right text-gray-600">
          <figure className="ml-2">
            <img
              src={'/assets/logo/header/header_logo.webp'}
              className="w-32"
              alt="Ride Rent Logo"
            />
            <figcaption className="text-[0.6rem]">
              Quick way to get a{' '}
              <span className="italic font-bold text-black">Ride On Rent</span>
            </figcaption>
          </figure>
        </Link>

        {isSmallScreen && (
          <button
            aria-label="Sidebar Toggle"
            className="inline-flex items-center justify-center p-0 mb-1 bg-transparent border-none outline-none cursor-pointer group"
            onClick={toggleSidebar}
          >
            <X
              strokeWidth={2.5}
              className="w-8 h-8 transition-colors group-hover:text-yellow"
            />
          </button>
        )}
      </div>

      <div
        className={`flex flex-col items-center px-[0.6rem] h-full p-2 mt-2 ${
          !isSmallScreen && 'shadow-md'
        }`}
      >
        {sidebarContent.map((item) => {
          const Icon = item.icon

          const isActive =
            item.link === '/'
              ? location.pathname === item.link
              : location.pathname.startsWith(item.link)

          return (
            <div
              key={item.link}
              onClick={() => handleClick(item.link)}
              className={`w-[95%] mx-auto flex items-center gap-2 h-12 py-2 px-4 rounded-lg transition-all duration-100 ease-out ${
                isActive
                  ? 'bg-yellow text-white hover:text-white'
                  : 'hover:text-yellow hover:bg-slate-100'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(item.link)}
            >
              <Icon className="text-xl" size={20} strokeWidth={3} />
              <span className="font-medium">{item.label}</span>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
