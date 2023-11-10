import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react"
import { useState } from "react"
import { makeClient } from "../services/makeClient"

const EditDataDialog = (props) => {
  const { open, handleOpen, idData, stationName, city } = props
  const [stationNameLocal, setStationName] = useState("")
  const [cityLocal, setCity] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(event.currentTarget.city.value)
    console.log(event.currentTarget.stationName.value)

    try {
      const { data } = await makeClient().post("/edit", {
        id: idData,
        stationName: event.currentTarget.stationName.value,
        city: event.currentTarget.city.value,
      })
      console.log("data = ", data)
      handleOpen(false)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className="bg-orange-500 w-96 mx-auto my-32 px-4 py-6 shadow-xl border border-2 border-gray-900"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="font-bold text-xl flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 mx-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Edit item ID : {idData}
      </DialogHeader>
      <DialogBody className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <Input
            size="lg"
            placeholder="name station"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 my-4 placeholder-gray-300 bg-gray-900 rounded-lg text-white"
            name="stationName"
            value={stationNameLocal === "" ? stationName : stationNameLocal}
            onChange={(e) => setStationName(e.target.value)}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="city"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900  my-4  bg-gray-900 placeholder-gray-300 rounded-lg text-white"
            name="city"
            value={cityLocal === "" ? city : cityLocal}
            onChange={(e) => setCity(e.target.value)}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <div className="flex justify-center">
            <Button color="red" onClick={handleOpen} className="mr-1 mx-2">
              CANCEL
            </Button>
            <Button color="green" type="submit" className="mr-1 mx-2">
              CREATE
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  )
}

export default EditDataDialog
