import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react"
import { useState } from "react"
import { makeClient } from "../services/makeClient"

const CreateDataDialog = (props) => {
  const { open, handleOpen } = props
  const [stationName, setStationName] = useState("")
  const [city, setCity] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(event.currentTarget.city.value)
    console.log(event.currentTarget.stationName.value)

    try {
      const { data } = await makeClient().post("/create", {
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
      className="bg-gray-200 w-96 mx-auto my-32 px-4 py-6  shadow-xl border border-2 border-gray-900"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="font-bold text-xl flex justify-center mb-4">
        CREATE NEW ITEM
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
            value={stationName}
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
            value={city}
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

export default CreateDataDialog
