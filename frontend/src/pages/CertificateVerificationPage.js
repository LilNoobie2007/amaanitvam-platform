import Navbar from '../components/Navbar.js';
import PublicVerificationHero from '../components/certificates/PublicVerificationHero.js';
import VerificationForm from '../components/certificates/VerificationForm.js';
import VerificationResult from '../components/certificates/VerificationResult.js';
import Footer from '../components/Footer.js';
import { certificates } from '../mocks/certificates.js';

export default class CertificateVerificationPage {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new PublicVerificationHero();
    this.form = new VerificationForm();
    this.result = new VerificationResult();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        <!-- Header -->
        ${this.navbar.render()}

        <main class="flex-grow pt-20 md:pt-24">
          <!-- Hero Section -->
          ${this.hero.render()}

          <!-- Verification Search Fields -->
          ${this.form.render()}

          <!-- Verification Status Results -->
          ${this.result.render()}
        </main>

        <!-- Footer -->
        ${this.footer.render()}
      </div>
    `;
  }

  init() {
    Navbar.init();
    VerificationForm.init();
    Footer.init();

    // Listen for custom search event and query mock database
    document.addEventListener('amaanitvam-verify-search', (e) => {
      const { number, code } = e.detail;

      if (!number && !code) {
        alert("Please provide either a Certificate Number or a Verification Code to search.");
        return;
      }

      const match = certificates.find(c => {
        const matchNum = number && c.certificateNumber.toLowerCase().trim() === number.toLowerCase().trim();
        const matchCode = code && c.verificationCode.toLowerCase().trim() === code.toLowerCase().trim();
        return matchNum || matchCode;
      });

      // Trigger visual result card render
      VerificationResult.renderResult(match, true);

      // Scroll view to status result block
      const resMount = document.getElementById('verify-result-mount');
      if (resMount) {
        resMount.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });
    reveals.forEach(el => revealObserver.observe(el));
  }
}
