import spinner from "../assets/spinner.gif"
import { IoCopy } from "react-icons/io5"
import { toast } from "react-toastify"

const Progress = ({ loading, message, shortUrl, screenshot, clear }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(`https://gotiny.cc/${shortUrl}`)
    toast.success("Short link copied to clipboard!")
  }

  const handleClear = () => {
    clear()
  }

  return (
    <div className="progress">
      {shortUrl ? (
        <button className="clear-btn" onClick={() => handleClear()}>
          Clear All
        </button>
      ) : (
        ""
      )}
      <div className="info">
        {loading ? <img src={spinner} alt="loading" /> : ""}
        {message ? <p>{message}</p> : ""}
      </div>
      <div className="result">
        {screenshot ? <img src={screenshot} alt="screen" /> : ""}
        {shortUrl ? (
          <p>Your URL is safe and here is the short version of it</p>
        ) : (
          ""
        )}
        {shortUrl ? (
          <div className="short-url">
            {shortUrl ? (
              <a
                href={`https://gotiny.cc/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                gotiny.cc/{shortUrl}
              </a>
            ) : (
              ""
            )}
            <IoCopy onClick={() => handleClick()} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
export default Progress
