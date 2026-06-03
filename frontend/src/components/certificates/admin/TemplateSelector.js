import { templates } from '../../../mocks/templates.js';

export default class TemplateSelector {
  render() {
    const templateCards = templates.map(temp => {
      // Determine background styles
      let visualStyle = 'border-stone-200 bg-stone-50';
      if (temp.style === 'Warm') visualStyle = 'border-amber-250 bg-amber-50/20';
      else if (temp.style === 'Corporate') visualStyle = 'border-blue-200 bg-blue-50/10';
      else if (temp.style === 'Event') visualStyle = 'border-pink-200 bg-pink-50/10';

      return `
        <div class="border rounded-lg p-5 cursor-pointer hover:shadow-md hover:border-pink-ruby transition-all duration-300 select-template-card flex flex-col justify-between min-h-[140px] ${visualStyle}" data-template-id="${temp.id}" data-template-style="${temp.style}" data-template-name="${temp.name}">
          <div>
            <span class="block font-interface font-semibold text-[9px] uppercase tracking-widest text-text-light mb-1">Template Style: ${temp.style}</span>
            <h4 class="font-display font-semibold text-[18px] text-text-dark">${temp.name}</h4>
          </div>
          <span class="inline-flex items-center gap-1 font-interface font-semibold text-[9px] uppercase tracking-widest text-pink-ruby mt-4 select-indicator">
            <span>Select Style</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </span>
        </div>
      `;
    }).join('');

    return `
      <div class="bg-white border border-stone-200/60 rounded p-6 shadow-sm mb-6">
        <h3 class="font-display font-semibold text-[20px] text-text-dark mb-4">
          1. Select Design Template Layout
        </h3>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="templates-selector-container">
          ${templateCards}
        </div>
      </div>
    `;
  }

  static init(onSelectCallback) {
    const cards = document.querySelectorAll('.select-template-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Clear active styles from all cards
        cards.forEach(c => {
          c.classList.remove('border-pink-ruby', 'ring-2', 'ring-pink-ruby/20');
          const indicator = c.querySelector('.select-indicator span');
          if (indicator) indicator.textContent = 'Select Style';
        });

        // Add active styles to clicked card
        const currentCard = e.currentTarget;
        currentCard.classList.add('border-pink-ruby', 'ring-2', 'ring-pink-ruby/20');
        const indicator = currentCard.querySelector('.select-indicator span');
        if (indicator) indicator.textContent = 'Selected';

        const id = currentCard.getAttribute('data-template-id');
        const style = currentCard.getAttribute('data-template-style');
        const name = currentCard.getAttribute('data-template-name');

        if (onSelectCallback) {
          onSelectCallback({ id, style, name });
        }
      });
    });

    // Auto-select the first template on load
    if (cards.length > 0) {
      cards[0].click();
    }
  }
}
