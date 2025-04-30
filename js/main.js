// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
  }
  
  // Language Selector
  const languageToggle = document.getElementById('language-toggle');
  const languageSelector = document.querySelector('.language-selector');
  const languageOptions = document.querySelectorAll('.language-dropdown li');
  const currentLanguage = document.querySelector('.current-language');
  
  if (languageToggle && languageSelector && languageOptions.length && currentLanguage) {
    languageToggle.addEventListener('click', function() {
      languageSelector.classList.toggle('active');
    });
    
    document.addEventListener('click', function(event) {
      if (!languageSelector.contains(event.target)) {
        languageSelector.classList.remove('active');
      }
    });
    
    languageOptions.forEach(option => {
      option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        currentLanguage.textContent = lang.toUpperCase();
        
        // Remove active class from all options
        languageOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        this.classList.add('active');
        
        // Close dropdown
        languageSelector.classList.remove('active');
        
        // Change language functionality would be implemented here
        changeLanguage(lang);
      });
    });
  }
  
  // Close detail views in various sections
  const closeButtons = document.querySelectorAll('.close-detail');
  
  if (closeButtons.length) {
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const parentCard = this.closest('.type-card, .tip-card');
        if (parentCard) {
          parentCard.classList.remove('active');
        }
      });
    });
  }
  
  // Tab functionality for various sections
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  if (tabButtons.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        const tabsContainer = this.closest('.tab-container, .prevention-tabs');
        
        if (tabsContainer) {
          // Deactivate all tabs and panes
          tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          
          tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          
          // Activate clicked tab and associated pane
          this.classList.add('active');
          document.getElementById(targetTab)?.classList.add('active');
        }
      });
    });
  }
  
  // Tip toggles in prevention section
  const tipToggles = document.querySelectorAll('.tip-toggle');
  
  if (tipToggles.length) {
    tipToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        const tipCard = this.closest('.tip-card');
        if (tipCard) {
          tipCard.classList.add('active');
        }
      });
    });
  }
  
  // Learn more buttons in what-is-spyware section
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  
  if (learnMoreButtons.length) {
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const typeCard = this.closest('.type-card');
        if (typeCard) {
          typeCard.classList.add('active');
        }
      });
    });
  }
});

// Language Change Functionality
function changeLanguage(lang) {
  console.log(`Language changed to: ${lang}`);
  
  // This would be implemented with a proper localization system
  // For a real implementation, you'd use a library like i18next
  // or have server-side language files
  
  // Example placeholder implementation:
  const translations = {
    'en': {
      'home': 'Home',
      'what-is-spyware': 'What is Spyware?',
      'detection': 'Detection',
      'prevention': 'Prevention',
      'news': 'News',
      'community': 'Community',
      'contact': 'Contact'
    },
    'hi': {
      'home': 'होम',
      'what-is-spyware': 'स्पाइवेयर क्या है?',
      'detection': 'पहचान',
      'prevention': 'रोकथाम',
      'news': 'समाचार',
      'community': 'समुदाय',
      'contact': 'संपर्क'
    },
    'es': {
      'home': 'Inicio',
      'what-is-spyware': '¿Qué es Spyware?',
      'detection': 'Detección',
      'prevention': 'Prevención',
      'news': 'Noticias',
      'community': 'Comunidad',
      'contact': 'Contacto'
    },
    'fr': {
      'home': 'Accueil',
      'what-is-spyware': 'Qu\'est-ce que le Spyware?',
      'detection': 'Détection',
      'prevention': 'Prévention',
      'news': 'Actualités',
      'community': 'Communauté',
      'contact': 'Contact'
    }
  };
  
  // Example of how to update navigation based on selected language
  if (translations[lang]) {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      const key = link.getAttribute('href').replace('.html', '').replace('index', 'home');
      if (translations[lang][key]) {
        link.textContent = translations[lang][key];
      }
    });
  }
}