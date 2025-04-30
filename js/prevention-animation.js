// Prevention Animation JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Prevention animation controls
  const scenes = document.querySelectorAll('.animation-scene');
  const sceneButtons = document.querySelectorAll('.scene-btn');
  const prevSceneBtn = document.getElementById('prev-scene');
  const nextSceneBtn = document.getElementById('next-scene');
  const autoPlayBtn = document.getElementById('auto-play');
  
  if (scenes.length && sceneButtons.length && prevSceneBtn && nextSceneBtn && autoPlayBtn) {
    let currentSceneIndex = 0;
    let autoPlayInterval = null;
    
    // Initialize first scene
    scenes[currentSceneIndex].classList.add('active');
    sceneButtons[currentSceneIndex].classList.add('active');
    
    // Previous scene button
    prevSceneBtn.addEventListener('click', function() {
      stopAutoPlay();
      changeScene(currentSceneIndex - 1);
    });
    
    // Next scene button
    nextSceneBtn.addEventListener('click', function() {
      stopAutoPlay();
      changeScene(currentSceneIndex + 1);
    });
    
    // Scene buttons
    sceneButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        stopAutoPlay();
        changeScene(index);
      });
    });
    
    // Auto-play button
    autoPlayBtn.addEventListener('click', function() {
      if (autoPlayInterval) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
    
    // Change scene function
    function changeScene(newIndex) {
      // Validate index
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= scenes.length) {
        newIndex = scenes.length - 1;
      }
      
      // Remove active class from current scene
      scenes[currentSceneIndex].classList.remove('active');
      sceneButtons[currentSceneIndex].classList.remove('active');
      
      // Update current scene index
      currentSceneIndex = newIndex;
      
      // Add active class to new scene
      scenes[currentSceneIndex].classList.add('active');
      sceneButtons[currentSceneIndex].classList.add('active');
      
      // Update button states
      updateButtonStates();
    }
    
    // Update button states
    function updateButtonStates() {
      // Previous button
      if (currentSceneIndex === 0) {
        prevSceneBtn.disabled = true;
      } else {
        prevSceneBtn.disabled = false;
      }
      
      // Next button
      if (currentSceneIndex === scenes.length - 1) {
        nextSceneBtn.disabled = true;
      } else {
        nextSceneBtn.disabled = false;
      }
    }
    
    // Auto-play functions
    function startAutoPlay() {
      autoPlayBtn.textContent = 'Stop Auto-Play';
      autoPlayBtn.classList.add('playing');
      
      autoPlayInterval = setInterval(() => {
        const nextIndex = (currentSceneIndex + 1) % scenes.length;
        changeScene(nextIndex);
      }, 5000); // Change scene every 5 seconds
    }
    
    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        
        autoPlayBtn.textContent = 'Auto-Play';
        autoPlayBtn.classList.remove('playing');
      }
    }
    
    // Scene interactions
    const indicatorElements = document.querySelectorAll('.indicator');
    const shieldSegments = document.querySelectorAll('.shield-segment');
    const actionItems = document.querySelectorAll('.action-item');
    
    // Add hover effect for indicators
    if (indicatorElements.length) {
      indicatorElements.forEach(indicator => {
        indicator.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.2)';
        });
        
        indicator.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
        });
      });
    }
    
    // Add hover effect for shield segments
    if (shieldSegments.length) {
      shieldSegments.forEach(segment => {
        segment.addEventListener('mouseenter', function() {
          this.style.backgroundColor = 'rgba(87, 204, 153, 0.5)';
        });
        
        segment.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'rgba(87, 204, 153, 0.3)';
        });
      });
    }
    
    // Add click effect for action items
    if (actionItems.length) {
      actionItems.forEach(item => {
        item.addEventListener('click', function() {
          this.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 200);
        });
      });
    }
    
    // Initialize button states
    updateButtonStates();
  }
  
  // Prevention tips interaction
  const tipCards = document.querySelectorAll('.tip-card');
  
  if (tipCards.length) {
    tipCards.forEach(card => {
      const tipToggle = card.querySelector('.tip-toggle');
      const tipDetails = card.querySelector('.tip-details');
      
      if (tipToggle && tipDetails) {
        tipToggle.addEventListener('click', function() {
          // Close all other open tip cards
          tipCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('active')) {
              otherCard.classList.remove('active');
            }
          });
          
          // Toggle this card
          card.classList.add('active');
        });
        
        // Add close button functionality
        const closeBtn = tipDetails.querySelector('button');
        if (closeBtn) {
          closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.remove('active');
          });
        }
      }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.tip-card') && !e.target.classList.contains('tip-toggle')) {
        tipCards.forEach(card => {
          card.classList.remove('active');
        });
      }
    });
  }
  
  // Prevention tabs functionality
  const tabButtons = document.querySelectorAll('.prevention-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.prevention-tabs .tab-pane');
  
  if (tabButtons.length && tabPanes.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button and pane
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // Close all open tip cards when changing tabs
        document.querySelectorAll('.tip-card.active').forEach(card => {
          card.classList.remove('active');
        });
      });
    });
  }
});