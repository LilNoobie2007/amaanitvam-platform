import Navbar from '../components/Navbar.js';
import VolunteerHero from '../components/volunteer/VolunteerHero.js';
import WhyAmaanitvam from '../components/volunteer/WhyAmaanitvam.js';
import WhyVolunteersMatter from '../components/volunteer/WhyVolunteersMatter.js';
import VolunteerOpportunities from '../components/volunteer/VolunteerOpportunities.js';
import VolunteerJourney from '../components/volunteer/VolunteerJourney.js';
import VolunteerBenefits from '../components/volunteer/VolunteerBenefits.js';
import VolunteerCTA from '../components/volunteer/VolunteerCTA.js';
import Footer from '../components/Footer.js';

export default class VolunteerPortal {
  constructor() {
    this.navbar = new Navbar();
    this.hero = new VolunteerHero();
    this.whyAmaanitvam = new WhyAmaanitvam();
    this.whyVolunteersMatter = new WhyVolunteersMatter();
    this.opportunities = new VolunteerOpportunities();
    this.journey = new VolunteerJourney();
    this.benefits = new VolunteerBenefits();
    this.cta = new VolunteerCTA();
    this.footer = new Footer();
  }

  render() {
    const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';

    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        <!-- Header -->
        ${this.navbar.render()}

        <main class="flex-grow">
          <!-- Hero Section -->
          ${this.hero.render()}

          <!-- Why Amaanitvam Section -->
          ${this.whyAmaanitvam.render()}

          <!-- Why Volunteers Matter Section -->
          ${this.whyVolunteersMatter.render()}

          <!-- Opportunities Section -->
          ${this.opportunities.render()}

          <!-- Volunteer Journey Section -->
          ${this.journey.render()}

          <!-- Benefits Section -->
          ${this.benefits.render()}

          <!-- CTA Application Form -->
          ${this.cta.render()}
        </main>

        <!-- Footer -->
        ${this.footer.render()}

        <!-- Floating Mock Authentication Controller for Reviewers -->
        <div class="fixed bottom-6 right-6 z-50 bg-white border border-stone-200/80 shadow-2xl rounded p-4 flex flex-col gap-2 max-w-[250px] scroll-reveal revealed">
          <span class="font-interface font-bold text-[9px] uppercase tracking-widest text-text-light">
            Prototype Auth Switcher
          </span>
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2.5 h-2.5 rounded-full ${isLoggedIn ? 'bg-emerald-500' : 'bg-rose-500'}"></div>
            <span class="font-sans text-[13px] font-medium text-text-dark">
              ${isLoggedIn ? 'Arjun Mehta (Logged In)' : 'Public View (Logged Out)'}
            </span>
          </div>
          <button id="btn-toggle-auth-portal" class="w-full font-interface font-semibold text-[10px] uppercase tracking-widest py-2 rounded bg-text-dark text-white hover:bg-text-dark/90 transition-all duration-300">
            ${isLoggedIn ? 'Log Out' : 'Simulate Login (Arjun)'}
          </button>
        </div>
      </div>
    `;
  }

  init() {
    Navbar.init();
    VolunteerOpportunities.init();
    VolunteerCTA.init();
    Footer.init();

    // Floating Auth toggle handler
    const authBtn = document.getElementById('btn-toggle-auth-portal');
    if (authBtn) {
      authBtn.addEventListener('click', () => {
        const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';
        if (isLoggedIn) {
          localStorage.setItem('amaanitvam_volunteer_logged_in', 'false');
          window.location.reload();
        } else {
          localStorage.setItem('amaanitvam_volunteer_logged_in', 'true');
          window.location.hash = '#/volunteer/dashboard';
        }
      });
    }

    // Scroll Reveal Observers
    const reveals = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -45px 0px'
    });
    reveals.forEach(el => revealObserver.observe(el));

    // Stagger observers
    const staggerLoaders = document.querySelectorAll('.stagger-load');
    const staggerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });
    staggerLoaders.forEach(el => staggerObserver.observe(el));
  }
}
