import axios from "axios"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Progress from "./components/Progress"

function App() {
  const [userUrl, setUserUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [scannedUrl, setScannedUrl] = useState("")
  const [isNotSecure, setIsNotSecure] = useState(false)
  const [screenshot, setScreenshot] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [message, setMessage] = useState("")

  const clear = () => {
    setUserUrl("")
    setLoading(false)
    setScannedUrl("")
    setIsNotSecure(false)
    setScreenshot("")
    setShortUrl("")
    setMessage("")
  }

  const shortenUrl = async () => {
    setLoading(true)
    setMessage("Shortening the URL...")
    try {
      if (!isNotSecure) {
        let data = JSON.stringify({
          input: `${userUrl}`,
        })
        let config = {
          method: "post",
          url: "https://gotiny.cc/api",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        }
        const response = await axios(config)
        if (response.data) {
          console.log(response.data)
          setMessage("URL shortened successfully.")
          setLoading(false)
          setShortUrl(response.data[0]?.code)
        }
      } else {
        setLoading(false)
        setMessage("Destination URL is not secure.")
      }
    } catch (error) {
      console.log(error)

      setLoading(false)
      setMessage(
        "Something went wrong with shortening the URL, try again later"
      )
    }
  }

  const fetchScanResult = async () => {
    setLoading(true)
    setMessage("Getting the scan results...")
    try {
      if (scannedUrl === "") {
        setLoading(false)
        setMessage("Scan result not found, try again later")
      } else {
        let config = {
          method: "get",
          url: `https://rocky-wildwood-04444.herokuapp.com/${scannedUrl}`,
        }
        const response = await axios(config)
        if (response.data) {
          console.log("result taken")
          console.log(response.data)
          setLoading(false)
          setMessage("Scan results successfully loaded.")
          setIsNotSecure(response.data?.verdicts.overall.malicious)
          setScreenshot(response.data?.task.screenshotURL)
          setTimeout(shortenUrl, 3000)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setMessage(
        "Something went wrong with getting scan result for the URL, try again later"
      )
    }
  }

  const scanUrl = async () => {
    setLoading(true)
    setMessage("Scanning the URL...")
    try {
      if (userUrl !== "") {
        if (scannedUrl === "") {
          let data = JSON.stringify({
            url: `${userUrl}`,
            visibility: "public",
          })
          let config = {
            method: "post",
            url: "https://rocky-wildwood-04444.herokuapp.com/https://urlscan.io/api/v1/scan/",
            headers: {
              "API-KEY": process.env.REACT_APP_KEY,
              "Content-Type": "application/json",
            },
            data: data,
          }
          const response = await axios(config)
          if (response.data) {
            setScannedUrl(response.data?.api)
            console.log(response.data)
            setLoading(false)
            setMessage("Scanning the URL successfully completed.")
            setTimeout(fetchScanResult, 3000)
          }
        } else {
          fetchScanResult()
        }
      } else {
        setLoading(false)
        setMessage("Invalid URL")
      }
    } catch (error) {
      console.log(error)
      setLoading(false)

      setMessage("Something went wrong with scanning the URL, try again later")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage("")
    setScreenshot("")
    setShortUrl("")
    setScannedUrl("")
    scanUrl()
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="wrapper">
        <div className="form-control">
          <h2>Enter the URL address you want to Scan and Shorten</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              placeholder="Destination URL"
            />
            <button type="submit">Start!</button>
          </form>
        </div>
        <div className="progress-control">
          <Progress
            loading={loading}
            message={message}
            screenshot={screenshot}
            shortUrl={shortUrl}
            clear={clear}
          />
        </div>
      </div>
    </>
  )
}

export default App
