// import DashboardIcon from "../assets/icons/Group.svg";
import { FaUsers } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { Dashboard } from "../pages";
import { MdFeedback } from "react-icons/md";
import { ImEarth } from "react-icons/im";

export const navLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
    component: <Dashboard />,
  },
  {
    title: "Access",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
    items: [
      { title: "Previleges", path: "/access/privileges" },
      { title: "Roles", path: "/access/roles" },
      { title: "Sub-Admin", path: "/access/sub-admin" },
    ],
  },
  {
    title: "Users Management",
    path: "/users-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Promotion Management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
    items: [
      { title: "Banner", path: "/access/banner" },
      { title: "Pop-up", path: "/access/pop-up" },
    ],
  },
  {
    title: "Books Management",
    path: "/books-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Publish Book",
    path: "/publish-book",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Parish Management",
    path: "/parish-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Events Management",
    path: "/events-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Feedback Management",
    path: "/feedback-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Contact Management",
    path: "/contact-management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Settings Management",
    icon: (
      <svg
        className="w-4 h-4"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_206_4413"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <path d="M0 0H32V32H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_206_4413)">
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
          <path
            d="M22.6667 23.9898V31.9898H28C29.0609 31.9898 30.0783 31.5684 30.8284 30.8182C31.5786 30.0681 32 29.0507 32 27.9898V15.8298C32.0007 15.1367 31.7314 14.4705 31.2493 13.9725L19.9187 1.72313C19.4193 1.18284 18.8136 0.751709 18.1395 0.456846C17.4655 0.161983 16.7377 0.00976562 16.002 0.00976562C15.2663 0.00976562 14.5385 0.161983 13.8645 0.456846C13.1904 0.751709 12.5847 1.18284 12.0853 1.72313L0.774667 13.9685C0.278284 14.4682 -0.00020734 15.1441 1.15822e-07 15.8485V27.9898C1.15822e-07 29.0507 0.421427 30.0681 1.17157 30.8182C1.92172 31.5684 2.93913 31.9898 4 31.9898H9.33333V23.9898C9.35867 20.3538 12.2933 17.3858 15.8373 17.3005C19.5013 17.2111 22.6387 20.2311 22.6667 23.9898Z"
            fill="currentColor"
          />
          <path
            d="M16 19.9902C14.9391 19.9902 13.9217 20.4117 13.1716 21.1618C12.4214 21.912 12 22.9294 12 23.9902V31.9902H20V23.9902C20 22.9294 19.5786 21.912 18.8284 21.1618C18.0783 20.4117 17.0609 19.9902 16 19.9902Z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
    items: [
      { title: "Admin Email", path: "/settings/admin-email" },
      { title: "Region", path: "/settings/region" },
      { title: "Province", path: "/settings/province" },
      { title: "Book Category", path: "/settings/book-category" },
      { title: "Book Language", path: "/settings/book-language" },
      { title: "About Kirista", path: "/settings/about-kirista" },
      { title: "About RCCG", path: "/settings/about-rccg" },
      { title: "About RCCG Structure", path: "/settings/about-rccg-structure" },
      {
        title: "About RCCG Continent 2",
        path: "/settings/about-rccg-continent2",
      },
      { title: "Terms", path: "/settings/terms" },
      { title: "Privacy", path: "/settings/privacy" },
      { title: "FAQ", path: "/settings/faq" },
    ],
  },
];

export const notifications = [
  {
    title: "New User Sign up",
    icon: <FaUsers className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: false,
  },
  {
    title: "New Contact Recieved",
    icon: <HiUser className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: false,
  },
  {
    title: "New Feedback Recieved",
    icon: <MdFeedback className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: true,
  },
  {
    title: "New User Sign up",
    icon: <FaUsers className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: true,
  },
  {
    title: "New Contact Recieved",
    icon: <HiUser className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: true,
  },
  {
    title: "New Feedback Recieved",
    icon: <MdFeedback className="text-base text-blue-500" />,
    clickHandler: null,
    markAsRead: true,
  },
];

export const dashboardCards = [
  {
    title: "Total Countries",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 53,
    colSpan: "col-span-2",
  },
  {
    title: "Total Users",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Regions",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Android Users",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Provinces",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total iOS Users",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Zones",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Books",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Areas",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Contacts",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Parishes",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Feedbacks",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 138148,
    colSpan: "col-span-1",
  },
  {
    title: "Total Events",
    icon: <ImEarth className="text-lg text-blue-500" />,
    num: 355131,
    colSpan: "col-span-1",
  },
];

export const contactListItems = [
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Difficulties",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
];

export const feedbackListItems = [
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
  {
    title: "Jerry",
    photoUrl: "https://i.pravatar.cc/30",
    subtitle: "Reading Aid",
    text: "safktg iyast fuy astiuyatsifytasifytasuiytfust st ustfuyatsf fs fsutfsatfosf ystf sft astyf usay dtfaysfsua tfosay tfas tfasytfusyt fastyf as tfsay fuasytf osfstfoifta oitf aosfas ytfayst fas tfsftiua5rtegfaystf asyftfasiyft sft.",
  },
];
