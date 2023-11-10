import { useState } from "react"
import UseApi from "../src/components/UseApi"
import {
  Card,
  CardFooter,
  CardBody,
  Typography,
  Button,
  Input,
  List,
  ListItem,
  CardHeader,
} from "@material-tailwind/react"
import CreateDataDialog from "../src/components/createDataDialog"
import DeleteDataDialog from "../src/components/deleteDataDialog"
import NavBar from "../src/components/NavBar"
import EditDataDialog from "../src/components/EditDataDialog"

const Home = () => {
  const [label, setLabel] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [stationName, setStationName] = useState("")
  const [city, setCity] = useState("")
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  const handle = () => setOpen(true)
  const handle2 = (id) => {
    setCity(city)
    setStationName(stationName)
    setDeleteId(id)
    setOpen2(true)
  }
  const handle3 = (id, stationName, city) => {
    setCity(city)
    setStationName(stationName)
    setDeleteId(id)
    setOpen3(true)
  }

  const datas = UseApi([{}], "get", `/velib`)
  const [searchedDatas, setSearchedDatas] = useState([])

  const filterItems = (arr, query) => {
    return arr.filter((el) => {
      if (typeof el === "object") {
        const objectString = JSON.stringify(el)
        if (
          objectString.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return el
        }
      }
      return null
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    setSearchedDatas([])

    if (datas) {
      const stationSearch = filterItems(
        datas,
        event.currentTarget.searchLabel.value
      ).filter(Boolean)

      if (stationSearch.length > 0) {
        setSearchedDatas((prevSearchedDatas) => [
          ...prevSearchedDatas,
          ...stationSearch,
        ])
      }
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div>
          <CreateDataDialog open={open} handleOpen={() => setOpen(false)} />
          <DeleteDataDialog
            open={open2}
            handleOpen={() => setOpen2(false)}
            idData={deleteId}
            city={city}
            stationName={stationName}
          />
          <EditDataDialog
            open={open3}
            handleOpen={() => setOpen3(false)}
            idData={deleteId}
            city={city}
            stationName={stationName}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <div className="mt-8 mb-2 w-96 grid grid-cols-1 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  size="lg"
                  placeholder="city, station, id, ..."
                  className="border border-2 border-gray-900 !border-t-blue-gray-300  w-full bg-gray-300 rounded-lg focus:!border-t-gray-900 placeholder-gray-900"
                  name="searchLabel"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button
                type="submit"
                className="border border-2 border-gray-900  mt-6 mb-4 w-full flex items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500 hover:scale-110"
              >
                SEARCH
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </Button>
            </form>
            <Button
              className="border border-2 border-gray-900  mt-6 mb-4 w-full flex items-center justify-center rounded-lg bg-green-400 hover:bg-green-500 hover:scale-110"
              onClick={handle}
            >
              CREATE NEW ITEM
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            {!searchedDatas && searchedDatas.length() === 0 ? (
              <h1>loading</h1>
            ) : (
              datas &&
              searchedDatas.map(
                (
                  {
                    idStation,
                    stationName,
                    stationOpen,
                    stationQuantity,
                    totalBikeFree,
                    mecanicBikeFree,
                    city,
                  },
                  index
                ) => (
                  <div key={index}>
                    <Card className="border border-2 border-gray-900  mt-6 bg-gray-300 rounded-xl shadow-xl p-4 h-80">
                      <CardHeader className="flex justify-between">
                        <Typography
                          variant="h2"
                          color="blue-gray"
                          className="mb-4 font-bold text-center whitespace-nowrap"
                        >
                          {stationName} - {city}
                        </Typography>
                        <hr className="my-1 mx-8 " />
                      </CardHeader>
                      <CardBody>
                        <List>
                          <ListItem>
                            <Typography>
                              ID :{" "}
                              <span className="font-bold"> {idStation}</span>
                            </Typography>
                          </ListItem>
                          <hr className="my-1 mx-8" />
                          <ListItem>
                            <Typography>
                              Station en fonctionnement :{" "}
                              <span className="font-bold">{stationOpen}</span>
                            </Typography>
                          </ListItem>
                          <hr className="my-1 mx-8" />
                          <ListItem>
                            <Typography>
                              Capacité de la station :{" "}
                              <span className="font-bold">
                                {stationQuantity}
                              </span>
                            </Typography>
                          </ListItem>
                          <hr className="my-1 mx-8" />
                          <ListItem>
                            <Typography>
                              Nombre total vélos disponibles :{" "}
                              <span className="font-bold">{totalBikeFree}</span>
                            </Typography>
                          </ListItem>
                          <hr className="my-1 mx-8" />
                          <ListItem>
                            <Typography>
                              Vélos mécaniques disponibles :{" "}
                              <span className="font-bold">
                                {mecanicBikeFree}
                              </span>
                            </Typography>
                          </ListItem>
                          <hr className="my-1 mx-8" />
                        </List>
                      </CardBody>
                      <CardFooter className="flex justify-center mt-4 font-bold">
                        <Button
                          onClick={() => handle3(idStation, stationName, city)}
                          className="bg-orange-500 mx-2 hover:scale-110 hover:bg-orange-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mx-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Button>
                        <Button
                          onClick={() => handle2(idStation, stationName, city)}
                          className="bg-red-500 hover:scale-110 mx-2 hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mx-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
