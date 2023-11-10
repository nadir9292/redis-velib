import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react"
import { makeClient } from "../services/makeClient"

const DeleteDataDialog = (props) => {
  const { open, handleOpen, stationName, idData, city } = props

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await makeClient().post("/delete", {
        id: idData,
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
      className="bg-red-500 w-96 mx-auto my-32 px-4 py-6  shadow-xl border border-2 border-gray-900"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className=" mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 text-center mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <Typography variant="h5" className="text-center font-bold mb-8">
            Delete element {stationName} with ID : {idData} ?
          </Typography>
          <div className="flex justify-center">
            <Button onClick={handleOpen} className="mr-1 mx-2">
              CANCEL
            </Button>
            <Button type="submit" className="mr-1 mx-2 bg-red-900">
              YES DELETE
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  )
}

export default DeleteDataDialog
