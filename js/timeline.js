// Timeline JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Make timeline items appear with scroll
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length) {
    const animateTimelineItems = () => {
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
          item.classList.add('visible');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial styles
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(50px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateTimelineItems);
    
    // Initial check
    animateTimelineItems();
  }
  
  // Type cards interaction
  const typeCards = document.querySelectorAll('.type-card');
  
  if (typeCards.length) {
    typeCards.forEach(card => {
      const learnMoreBtn = card.querySelector('.learn-more-btn');
      const closeBtn = card.querySelector('.close-detail');
      
      if (learnMoreBtn && closeBtn) {
        learnMoreBtn.addEventListener('click', function() {
          // Close all other open cards
          typeCards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.remove('active');
            }
          });
          
          // Open this card
          card.classList.add('active');
        });
        
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          card.classList.remove('active');
        });
      }
    });
    
    // Close active card when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.type-card') && !e.target.classList.contains('learn-more-btn')) {
        typeCards.forEach(card => {
          card.classList.remove('active');
        });
      }
    });
  }
  
  // Case studies animation
  const caseStudies = document.querySelectorAll('.case-study');
  
  if (caseStudies.length) {
    const animateCaseStudies = () => {
      caseStudies.forEach((study, index) => {
        const studyTop = study.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (studyTop < windowHeight * 0.85) {
          setTimeout(() => {
            study.style.opacity = '1';
            study.style.transform = 'translateY(0)';
          }, index * 200); // Stagger the animations
        }
      });
    };
    
    // Set initial styles
    caseStudies.forEach(study => {
      study.style.opacity = '0';
      study.style.transform = 'translateY(30px)';
      study.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateCaseStudies);
    
    // Initial check
    animateCaseStudies();
  }
});