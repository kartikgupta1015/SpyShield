// News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // News Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');
  
  if (filterButtons.length && newsCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Show/hide news cards based on filter
        newsCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            
            // Animate cards into view
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
          }
        });
      });
    });
  }
  
  // Load More Button
  const loadMoreBtn = document.querySelector('.load-more .btn');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // This would typically fetch more articles from a server
      // For demo purposes, we'll just disable the button
      this.disabled = true;
      this.textContent = 'Loading...';
      
      setTimeout(() => {
        this.textContent = 'No More Articles';
      }, 1500);
    });
  }
  
  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      if (emailInput && submitBtn) {
        // Disable form elements
        emailInput.disabled = true;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message
          const formNote = document.querySelector('.form-note');
          if (formNote) {
            formNote.textContent = 'Thank you for subscribing!';
            formNote.style.color = 'var(--success)';
          }
          
          // Reset form
          emailInput.value = '';
          submitBtn.textContent = 'Subscribed';
        }, 1500);
      }
    });
  }
  
  // Animate news cards on scroll
  const animateNewsCards = () => {
    newsCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight * 0.85) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial styles for animation
  newsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', animateNewsCards);
  
  // Initial check for visible cards
  animateNewsCards();
});