import Navbar from '../components/Navbar.js';
import ImpactHero from '../components/impact/ImpactHero.js';
import FeaturedStory from '../components/impact/FeaturedStory.js';
import ImpactSnapshot from '../components/impact/ImpactSnapshot.js';
import LatestFieldUpdates from '../components/impact/LatestFieldUpdates.js';
import JourneyGallery from '../components/impact/JourneyGallery.js';
import MomentsOfImpact from '../components/impact/MomentsOfImpact.js';
import CommunityVoices from '../components/impact/CommunityVoices.js';
import Transparency from '../components/impact/Transparency.js';
import GrowingImpactAcrossCommunities from '../components/impact/GrowingImpactAcrossCommunities.js';
import GetInvolved from '../components/impact/GetInvolved.js';
import Footer from '../components/Footer.js';

export default class ImpactPage {
  constructor() {
    this.navbar = new Navbar();
    this.impactHero = new ImpactHero();
    this.featuredStory = new FeaturedStory();
    this.impactSnapshot = new ImpactSnapshot();
    this.latestFieldUpdates = new LatestFieldUpdates();
    this.journeyGallery = new JourneyGallery();
    this.momentsOfImpact = new MomentsOfImpact();
    this.communityVoices = new CommunityVoices();
    this.transparency = new Transparency();
    this.growingImpactAcrossCommunities = new GrowingImpactAcrossCommunities();
    this.getInvolved = new GetInvolved();
    this.footer = new Footer();
  }

  render() {
    return `
      <div class="flex flex-col min-h-screen bg-stone-50 select-none">
        
        <!-- Shared Header Navigation -->
        ${this.navbar.render()}
        
        <main class="flex-grow">
          
          <!-- Typography-Focused Full-Width Hero -->
          ${this.impactHero.render()}
          
          <!-- Featured Story Narrative -->
          ${this.featuredStory.render()}
          
          <!-- Verified Stats Snapshot -->
          ${this.impactSnapshot.render()}
          
          <!-- 3-Column Stories Updates -->
          ${this.latestFieldUpdates.render()}
          
          <!-- Visual Masonry Journey Gallery -->
          ${this.journeyGallery.render()}
          
          <!-- Moments of Impact horizontal timeline -->
          ${this.momentsOfImpact.render()}
          
          <!-- Testimonial Placeholders -->
          ${this.communityVoices.render()}
          
          <!-- Transparency & Commitment Details -->
          ${this.transparency.render()}
          
          <!-- taglined emotional transition -->
          ${this.growingImpactAcrossCommunities.render()}
          
          <!-- Unified Join CTA -->
          ${this.getInvolved.render()}
          
        </main>
        
        <!-- Shared Mehrauli Footer with Volunteer Form -->
        ${this.footer.render()}
        
      </div>
    `;
  }

  init() {
    // Initialize scrolling header, hamburger toggle and scroll highlights
    Navbar.init();

    // Trigger category click bindings for gallery
    JourneyGallery.init();

    // Initialize volunteer form submission handling in Footer
    Footer.init();

    // --- INTERSECTION OBSERVER FOR NARRATIVE SCROLL REVEALS ---
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
      rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(el => revealObserver.observe(el));

    // --- STAGGER GRID LOADING CONTROLLERS ---
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-load');
      const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, idx) => {
              setTimeout(() => {
                item.classList.add('revealed');
              }, idx * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      });
      staggerObserver.observe(container);
    });
  }
}
