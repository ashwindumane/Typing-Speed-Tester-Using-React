import { FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} Developed By Ashwin Dumane
      </p>
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/ashwindumane/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/ashwin_kshatriya_/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}