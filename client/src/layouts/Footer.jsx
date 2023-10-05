import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="container flex-shrink-0">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              Gadget House
            </Link>
            <span className="mb-3 mb-md-0 text-body-secondary">
              &copy;{new Date().getFullYear()} Gadget House, Inc
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-body-secondary"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/rakimsth"
              >
                <FaGithub width={24} height={24} />
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-body-secondary"
                rel="noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/raktim-shrestha-63a780109"
              >
                <FaLinkedinIn width={24} height={24} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;