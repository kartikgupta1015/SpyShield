// Stats Carousel JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Stats Carousel
  const statCards = document.querySelectorAll('.stat-card');
  const prevStat = document.querySelector('.prev-stat');
  const nextStat = document.querySelector('.next-stat');
  const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
  
  if (statCards.length && prevStat && nextStat && carouselIndicators.length) {
    let currentStatIndex = 0;
    
    // Animate numbers on load for the active stat
    animateNumbers(statCards[currentStatIndex]);
    
    // Next button
    nextStat.addEventListener('click', function() {
      statCards[currentStatIndex].classList.remove('active');
      carouselIndicators[currentStatIndex].classList.remove('active');
      
      currentStatIndex = (currentStatIndex + 1) % statCards.length;
      
      statCards[currentStatIndex].classList.add('active');
      carouselIndicators[currentStatIndex].classList.add('active');
      
      animateNumbers(statCards[currentStatIndex]);
    });
    
    // Previous button
    prevStat.addEventListener('click', function() {
      statCards[currentStatIndex].classList.remove('active');
      carouselIndicators[currentStatIndex].classList.remove('active');
      
      currentStatIndex = (currentStatIndex - 1 + statCards.length) % statCards.length;
      
      statCards[currentStatIndex].classList.add('active');
      carouselIndicators[currentStatIndex].classList.add('active');
      
      animateNumbers(statCards[currentStatIndex]);
    });
    
    // Carousel indicators
    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        if (index !== currentStatIndex) {
          statCards[currentStatIndex].classList.remove('active');
          carouselIndicators[currentStatIndex].classList.remove('active');
          
          currentStatIndex = index;
          
          statCards[currentStatIndex].classList.add('active');
          carouselIndicators[currentStatIndex].classList.add('active');
          
          animateNumbers(statCards[currentStatIndex]);
        }
      });
    });
    
    // Auto-advance carousel
    setInterval(() => {
      statCards[currentStatIndex].classList.remove('active');
      carouselIndicators[currentStatIndex].classList.remove('active');
      
      currentStatIndex = (currentStatIndex + 1) % statCards.length;
      
      statCards[currentStatIndex].classList.add('active');
      carouselIndicators[currentStatIndex].classList.add('active');
      
      animateNumbers(statCards[currentStatIndex]);
    }, 5000); // Change slide every 5 seconds
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicators .indicator');
    
    if (testimonials.length && prevTestimonial && nextTestimonial && testimonialIndicators.length) {
      let currentTestimonialIndex = 0;
      
      // Next button
      nextTestimonial.addEventListener('click', function() {
        testimonials[currentTestimonialIndex].classList.remove('active');
        testimonialIndicators[currentTestimonialIndex].classList.remove('active');
        
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        
        testimonials[currentTestimonialIndex].classList.add('active');
        testimonialIndicators[currentTestimonialIndex].classList.add('active');
      });
      
      // Previous button
      prevTestimonial.addEventListener('click', function() {
        testimonials[currentTestimonialIndex].classList.remove('active');
        testimonialIndicators[currentTestimonialIndex].classList.remove('active');
        
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonialIndex].classList.add('active');
        testimonialIndicators[currentTestimonialIndex].classList.add('active');
      });
      
      // Testimonial indicators
      testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
          if (index !== currentTestimonialIndex) {
            testimonials[currentTestimonialIndex].classList.remove('active');
            testimonialIndicators[currentTestimonialIndex].classList.remove('active');
            
            currentTestimonialIndex = index;
            
            testimonials[currentTestimonialIndex].classList.add('active');
            testimonialIndicators[currentTestimonialIndex].classList.add('active');
          }
        });
      });
      
      // Auto-advance testimonials
      setInterval(() => {
        testimonials[currentTestimonialIndex].classList.remove('active');
        testimonialIndicators[currentTestimonialIndex].classList.remove('active');
        
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        
        testimonials[currentTestimonialIndex].classList.add('active');
        testimonialIndicators[currentTestimonialIndex].classList.add('active');
      }, 7000); // Change testimonial every 7 seconds
    }
  }
  
  // Number animation function
  function animateNumbers(statCard) {
    const statNumber = statCard.querySelector('.stat-number');
    
    if (statNumber) {
      const targetValue = parseInt(statNumber.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;
      
      const updateNumber = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
          const easedProgress = easeOutQuart(elapsedTime / duration);
          const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));
          statNumber.textContent = currentValue;
          requestAnimationFrame(updateNumber);
        } else {
          statNumber.textContent = targetValue;
        }
      };
      
      updateNumber();
    }
  }
  
  // Easing function for smoother animation
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
});