import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="w-full h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-bold text-green-600">EzzApply</h1>

      <div className="flex items-center gap-4">
        <Link to="/jobs" className="text-sm text-gray-600 hover:text-black">
          Jobs
        </Link>

        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-green-600 text-white
                          flex items-center justify-center font-semibold cursor-pointer">
            U
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md
                          opacity-0 group-hover:opacity-100 pointer-events-none
                          group-hover:pointer-events-auto transition">
            <Link
              to="/applicant/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/applicant/applied-jobs"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Applied Jobs
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
