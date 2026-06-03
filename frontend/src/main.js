import './style.css';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import ProgramsPage from './pages/ProgramsPage.js';
import ImpactPage from './pages/ImpactPage.js';
import VolunteerPortal from './pages/VolunteerPortal.js';
import VolunteerDashboard from './pages/VolunteerDashboard.js';

const appElement = document.querySelector('#app');

const routes = {
  '#/': HomePage,
  '#/about': AboutPage,
  '#/programs': ProgramsPage,
  '#/impact': ImpactPage,
  '#/volunteer': VolunteerPortal,
  '#/volunteer/dashboard': VolunteerDashboard,
};

function router() {
  const hash = window.location.hash || '#/';
  
  let PageClass;
  let targetAnchor = null;
  
  if (hash === '#/about') {
    PageClass = AboutPage;
  } else if (hash === '#/programs') {
    PageClass = ProgramsPage;
  } else if (hash === '#/impact') {
    PageClass = ImpactPage;
  } else if (hash === '#/volunteer') {
    PageClass = VolunteerPortal;
  } else if (hash === '#/volunteer/dashboard') {
    // Route guard check
    const isLoggedIn = localStorage.getItem('amaanitvam_volunteer_logged_in') === 'true';
    if (!isLoggedIn) {
      window.location.hash = '#/volunteer';
      return;
    }
    PageClass = VolunteerDashboard;
  } else if (hash === '#/' || hash === '') {
    PageClass = HomePage;
  } else if (hash.startsWith('#') && !hash.startsWith('#/')) {
    // Standard homepage scroll anchors (like #community, #volunteer-form, etc.)
    PageClass = HomePage;
    targetAnchor = hash;
  } else {
    PageClass = HomePage;
  }
  
  const previousPage = appElement.dataset.currentPage;
  
  let newPageName = 'home';
  if (PageClass === AboutPage) newPageName = 'about';
  else if (PageClass === ProgramsPage) newPageName = 'programs';
  else if (PageClass === ImpactPage) newPageName = 'impact';
  else if (PageClass === VolunteerPortal) newPageName = 'volunteer';
  else if (PageClass === VolunteerDashboard) newPageName = 'volunteer-dashboard';
  
  if (previousPage !== newPageName) {
    window.scrollTo(0, 0);
    const pageInstance = new PageClass();
    appElement.innerHTML = pageInstance.render();
    appElement.dataset.currentPage = newPageName;
    pageInstance.init();
  }
  
  // If we have an anchor, let's scroll to it after rendering
  if (targetAnchor) {
    setTimeout(() => {
      const el = document.querySelector(targetAnchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, previousPage !== newPageName ? 300 : 50);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
