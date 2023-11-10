import { Navbar, Typography } from "@material-tailwind/react"
import Link from "next/link"
import { useEffect } from "react"
import { useState } from "react"

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  return (
    <Navbar className="sticky bg-yellow-400 opacity-90 top-0 z-10 h-max max-w-full rounded-none px-4 py-1 lg:px-8">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href="/">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium flex items-center">
            <span className="text-gray-900 font-bold text-xl">VELIB'</span>
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 511.999 511.999"
              style={{
                enableBackground: "new 0 0 511.999 511.999",
                fill: "#000000",
              }}
              className="w-9 h-9 mx-4"
            >
              <g>
                <g>
                  <path d="M407.661,217.114c-4.814,0-9.549,0.334-14.192,0.969L354.512,86.205h-59.15v31.347h35.724l20.566,69.622H192.678 l-19.803-35.295h20.133v-31.347H118.46v31.347h18.471l31.353,55.879l-17.297,20.383c-14.046-7.05-29.889-11.027-46.646-11.027 C46.807,217.114,0,263.921,0,321.454c0,57.533,46.807,104.34,104.339,104.34c52.207,0,95.58-38.543,103.164-88.667h43.044v19.705 h-8.882v31.347h49.11v-31.347h-8.882v-32.916l33.938-105.396h45.079l2.498,8.456c-35.471,16.681-60.09,52.755-60.09,94.477 c0,57.533,46.807,104.34,104.34,104.34c57.533,0,104.339-46.807,104.339-104.34C512,263.921,465.193,217.114,407.661,217.114z  M175.62,337.127c-7.193,32.739-36.413,57.32-71.281,57.32c-40.247,0-72.992-32.745-72.992-72.993 c0-40.248,32.745-72.992,72.992-72.992c34.868,0,64.087,24.581,71.281,57.319h-71.281v31.347H175.62z M254.8,305.78h-47.297 c-3.509-23.187-14.678-43.894-30.836-59.456l23.596-27.805H282.9L254.8,305.78z M407.661,394.447 c-40.25,0-72.993-32.745-72.993-72.993c0-27.483,15.273-51.458,37.773-63.907l20.19,68.347l30.063-8.88l-20.191-68.351 c1.706-0.12,3.422-0.203,5.159-0.203c40.248,0,72.992,32.745,72.992,72.992C480.653,361.702,447.908,394.447,407.661,394.447z" />
                </g>
              </g>
            </svg>
          </Typography>
        </Link>
        <div className="flex items-center gap-4"></div>
      </div>
    </Navbar>
  )
}

export default NavBar
