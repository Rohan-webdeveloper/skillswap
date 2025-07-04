import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>

      <p className="footer-text">
        © {new Date().getFullYear()} SkillSwap | #SkillExchange #Collaborate #GrowTogether
      </p>
    </footer>
  );
}
