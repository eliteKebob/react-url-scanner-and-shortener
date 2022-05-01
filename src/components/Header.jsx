import { FaGithub } from "react-icons/fa"

const Header = () => {
  return (
    <div className="header">
      <h1>URL Scan & Shortener</h1>
      <a
        href="https://github.com/eliteKebob"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
    </div>
  )
}
export default Header
