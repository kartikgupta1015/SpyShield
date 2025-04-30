// Detection Tools JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Self-Diagnosis Quiz
  const quiz = {
    currentQuestion: 1,
    totalQuestions: 10, // We only defined 2 in the HTML, but this variable controls the progress bar
    answers: {},
    
    init: function() {
      // Initialize quiz elements
      document.getElementById('total-questions').textContent = this.totalQuestions;
      
      // Setup event listeners
      const nextBtn = document.getElementById('next-question');
      const prevBtn = document.getElementById('prev-question');
      const retakeBtn = document.getElementById('retake-quiz');
      
      if (nextBtn && prevBtn && retakeBtn) {
        nextBtn.addEventListener('click', () => this.nextQuestion());
        prevBtn.addEventListener('click', () => this.prevQuestion());
        retakeBtn.addEventListener('click', () => this.retakeQuiz());
      }
      
      // Initialize progress bar
      this.updateProgressBar();
    },
    
    nextQuestion: function() {
      // Save current question's answer
      const currentQuestionEl = document.querySelector(`.quiz-question[data-question="${this.currentQuestion}"]`);
      const selectedOption = currentQuestionEl.querySelector('input[type="radio"]:checked');
      
      if (selectedOption) {
        this.answers[this.currentQuestion] = selectedOption.value;
      }
      
      // If last question, show results
      if (this.currentQuestion >= this.totalQuestions) {
        this.showResults();
        return;
      }
      
      // Hide current question
      currentQuestionEl.classList.remove('active');
      
      // Show next question
      this.currentQuestion++;
      document.querySelector(`.quiz-question[data-question="${this.currentQuestion}"]`).classList.add('active');
      document.getElementById('current-question').textContent = this.currentQuestion;
      
      // Update button states
      document.getElementById('prev-question').disabled = false;
      
      if (this.currentQuestion === this.totalQuestions) {
        document.getElementById('next-question').textContent = 'See Results';
      }
      
      // Update progress bar
      this.updateProgressBar();
    },
    
    prevQuestion: function() {
      // Hide current question
      document.querySelector(`.quiz-question[data-question="${this.currentQuestion}"]`).classList.remove('active');
      
      // Show previous question
      this.currentQuestion--;
      document.querySelector(`.quiz-question[data-question="${this.currentQuestion}"]`).classList.add('active');
      document.getElementById('current-question').textContent = this.currentQuestion;
      
      // Update button states
      if (this.currentQuestion === 1) {
        document.getElementById('prev-question').disabled = true;
      }
      
      document.getElementById('next-question').textContent = 'Next';
      
      // Update progress bar
      this.updateProgressBar();
    },
    
    updateProgressBar: function() {
      const progressPercent = (this.currentQuestion / this.totalQuestions) * 100;
      document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
    },
    
    showResults: function() {
      // Hide questions
      document.querySelector(`.quiz-question[data-question="${this.currentQuestion}"]`).classList.remove('active');
      
      // Show results
      document.querySelector('.quiz-results').classList.add('active');
      
      // Hide navigation
      document.querySelector('.quiz-navigation').style.display = 'none';
      
      // Calculate risk score (simple demonstration)
      let riskScore = 0;
      let totalAnswers = 0;
      
      for (let question in this.answers) {
        if (this.answers[question] === 'yes') {
          riskScore += 3;
        } else if (this.answers[question] === 'somewhat') {
          riskScore += 1;
        }
        totalAnswers++;
      }
      
      // Normalize score to 0-100
      const normalizedScore = totalAnswers > 0 ? (riskScore / (totalAnswers * 3)) * 100 : 0;
      
      // Set risk meter position
      const riskLevel = document.getElementById('risk-level');
      riskLevel.style.left = `${normalizedScore}%`;
      
      // Generate results content
      const resultsContent = document.getElementById('results-content');
      let resultText = '';
      
      if (normalizedScore < 33) {
        resultText = `
          <h4>Low Risk (${Math.round(normalizedScore)}%)</h4>
          <p>Your device appears to be at low risk for spyware infection. However, it's always good practice to maintain security habits:</p>
          <ul>
            <li>Keep your software and operating system updated</li>
            <li>Use reputable security software</li>
            <li>Be cautious about downloads and email attachments</li>
          </ul>
        `;
      } else if (normalizedScore < 66) {
        resultText = `
          <h4>Medium Risk (${Math.round(normalizedScore)}%)</h4>
          <p>There are some concerning signs that your device might have spyware. We recommend taking these actions:</p>
          <ul>
            <li>Run a full system scan with reputable antivirus software</li>
            <li>Check for and remove unfamiliar applications</li>
            <li>Update all software to patch security vulnerabilities</li>
            <li>Monitor your device for continued unusual behavior</li>
          </ul>
        `;
      } else {
        resultText = `
          <h4>High Risk (${Math.round(normalizedScore)}%)</h4>
          <p>Your device shows strong indicators of spyware infection. Take immediate action:</p>
          <ul>
            <li>Disconnect from the internet to prevent data transmission</li>
            <li>Run a full system scan with reputable security software</li>
            <li>Consider a factory reset if problems persist</li>
            <li>Change passwords for important accounts from a different device</li>
            <li>Consider seeking professional help for thorough removal</li>
          </ul>
        `;
      }
      
      resultsContent.innerHTML = resultText;
    },
    
    retakeQuiz: function() {
      // Reset answers
      this.answers = {};
      
      // Reset to first question
      this.currentQuestion = 1;
      
      // Hide results
      document.querySelector('.quiz-results').classList.remove('active');
      
      // Show first question
      document.querySelector('.quiz-question[data-question="1"]').classList.add('active');
      document.getElementById('current-question').textContent = 1;
      
      // Reset navigation
      document.querySelector('.quiz-navigation').style.display = 'flex';
      document.getElementById('prev-question').disabled = true;
      document.getElementById('next-question').textContent = 'Next';
      
      // Clear radio selections
      const radioInputs = document.querySelectorAll('.quiz-option input[type="radio"]');
      radioInputs.forEach(input => {
        input.checked = false;
      });
      
      // Update progress bar
      this.updateProgressBar();
    }
  };
  
  // Initialize the quiz if it exists on the page
  if (document.querySelector('.quiz-container')) {
    quiz.init();
  }
  
  // Spyware Simulator
  const simulator = {
    isRunning: false,
    isPaused: false,
    currentScenario: null,
    accessedData: [],
    
    init: function() {
      // Initialize simulator elements
      const startBtn = document.getElementById('start-simulation');
      const pauseBtn = document.getElementById('pause-simulation');
      const resetBtn = document.getElementById('reset-simulation');
      const appIcons = document.querySelectorAll('.sim-app');
      
      if (startBtn && pauseBtn && resetBtn) {
        startBtn.addEventListener('click', () => this.startSimulation());
        pauseBtn.addEventListener('click', () => this.pauseSimulation());
        resetBtn.addEventListener('click', () => this.resetSimulation());
      }
      
      if (appIcons.length) {
        appIcons.forEach(app => {
          app.addEventListener('click', () => this.activateApp(app));
        });
      }
    },
    
    startSimulation: function() {
      if (this.isRunning && this.isPaused) {
        // Resume paused simulation
        this.isPaused = false;
        document.getElementById('sim-status').textContent = 'Running';
        document.getElementById('pause-simulation').textContent = 'Pause';
        return;
      }
      
      if (this.isRunning) {
        return;
      }
      
      this.isRunning = true;
      document.getElementById('sim-status').textContent = 'Running';
      document.getElementById('start-simulation').disabled = true;
      document.getElementById('pause-simulation').disabled = false;
      document.getElementById('reset-simulation').disabled = false;
      
      // Show introduction message
      document.querySelector('.data-placeholder').style.display = 'none';
      this.updateDataPanel('Simulation started. Spyware is being installed on the device...');
      
      // Start animation sequence
      this.runSimulation();
    },
    
    pauseSimulation: function() {
      if (!this.isRunning) {
        return;
      }
      
      if (this.isPaused) {
        // Resume
        this.isPaused = false;
        document.getElementById('sim-status').textContent = 'Running';
        document.getElementById('pause-simulation').textContent = 'Pause';
      } else {
        // Pause
        this.isPaused = true;
        document.getElementById('sim-status').textContent = 'Paused';
        document.getElementById('pause-simulation').textContent = 'Resume';
      }
    },
    
    resetSimulation: function() {
      this.isRunning = false;
      this.isPaused = false;
      this.accessedData = [];
      
      document.getElementById('sim-status').textContent = 'Ready';
      document.getElementById('start-simulation').disabled = false;
      document.getElementById('pause-simulation').disabled = true;
      document.getElementById('reset-simulation').disabled = true;
      
      // Clear data panel
      document.getElementById('accessed-data').innerHTML = '<p class="data-placeholder">Start the simulation to see what data spyware can access.</p>';
      
      // Reset visual elements
      document.querySelector('.data-stream').style.opacity = '0';
      document.querySelector('.sim-app-view').innerHTML = '';
    },
    
    runSimulation: function() {
      // Initial animation - show data stream
      setTimeout(() => {
        if (!this.isRunning) return;
        document.querySelector('.data-stream').style.opacity = '0.5';
        this.updateDataPanel('Spyware is scanning the device for accessible data...');
      }, 1500);
      
      // Show first data access
      setTimeout(() => {
        if (!this.isRunning) return;
        this.updateDataPanel('Spyware has gained access to device information:');
        this.addAccessedData('Device model, operating system, and unique identifiers');
      }, 3000);
      
      // Show permission access
      setTimeout(() => {
        if (!this.isRunning) return;
        this.updateDataPanel('Spyware is escalating privileges by exploiting a vulnerability...');
        this.addAccessedData('Obtained elevated permissions');
      }, 5000);
      
      // Show app info message
      setTimeout(() => {
        if (!this.isRunning) return;
        this.updateDataPanel('Spyware is analyzing installed applications...');
        this.addAccessedData('List of all installed applications');
      }, 7000);
      
      // Prompt user to interact
      setTimeout(() => {
        if (!this.isRunning) return;
        this.updateDataPanel('Spyware is now monitoring your activities. Try clicking on different apps to see what information can be accessed.');
        document.querySelector('.sim-app-grid').style.pointerEvents = 'auto';
      }, 9000);
    },
    
    activateApp: function(app) {
      if (!this.isRunning) {
        return;
      }
      
      const appType = app.getAttribute('data-app');
      const appView = document.querySelector('.sim-app-view');
      
      // Show app content
      appView.innerHTML = `<p>Viewing ${appType} app...</p>`;
      
      // Simulate data access
      switch (appType) {
        case 'messages':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Text message content and history');
            this.addAccessedData('Message recipients and contacts');
            this.addAccessedData('Message timestamps and patterns');
          }, 500);
          break;
          
        case 'photos':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Photo library and image metadata');
            this.addAccessedData('Location data from photos');
            this.addAccessedData('Face recognition data');
          }, 500);
          break;
          
        case 'banking':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Banking app usage patterns');
            this.addAccessedData('Account numbers (if viewed)');
            this.addAccessedData('Transaction history');
          }, 500);
          break;
          
        case 'email':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Email content and attachments');
            this.addAccessedData('Contact list and email addresses');
            this.addAccessedData('Account recovery information');
          }, 500);
          break;
          
        case 'social':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Social media credentials');
            this.addAccessedData('Private messages and posts');
            this.addAccessedData('Friend/follower lists');
          }, 500);
          break;
          
        case 'browser':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Browsing history and bookmarks');
            this.addAccessedData('Saved passwords and form data');
            this.addAccessedData('Cookies and login sessions');
          }, 500);
          break;
          
        case 'contacts':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Complete contact list');
            this.addAccessedData('Phone numbers and email addresses');
            this.addAccessedData('Contact relationship data');
          }, 500);
          break;
          
        case 'calendar':
          this.updateDataPanel(`Accessing ${appType} data...`);
          setTimeout(() => {
            this.addAccessedData('Calendar events and appointments');
            this.addAccessedData('Meeting locations and participants');
            this.addAccessedData('Personal schedule patterns');
          }, 500);
          break;
      }
      
      // Simulate data exfiltration
      setTimeout(() => {
        document.querySelector('.data-stream').style.opacity = '0.8';
      }, 800);
      
      setTimeout(() => {
        document.querySelector('.data-stream').style.opacity = '0.5';
      }, 1500);
    },
    
    updateDataPanel: function(message) {
      const dataPanel = document.getElementById('accessed-data');
      
      // Clear placeholder if it exists
      const placeholder = dataPanel.querySelector('.data-placeholder');
      if (placeholder) {
        dataPanel.innerHTML = '';
      }
      
      // Add message
      const messageElement = document.createElement('p');
      messageElement.className = 'data-message';
      messageElement.textContent = message;
      dataPanel.appendChild(messageElement);
      
      // Scroll to bottom
      dataPanel.scrollTop = dataPanel.scrollHeight;
    },
    
    addAccessedData: function(data) {
      if (this.accessedData.includes(data)) {
        return; // Don't add duplicates
      }
      
      this.accessedData.push(data);
      
      const dataPanel = document.getElementById('accessed-data');
      const dataElement = document.createElement('div');
      dataElement.className = 'data-item';
      dataElement.innerHTML = `<span class="data-bullet">•</span> ${data}`;
      dataPanel.appendChild(dataElement);
      
      // Scroll to bottom
      dataPanel.scrollTop = dataPanel.scrollHeight;
    }
  };
  
  // Initialize the simulator if it exists on the page
  if (document.querySelector('.simulator-container')) {
    simulator.init();
  }
  
  // Tab functionality for checklist section
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        const tabContainer = this.closest('.tab-container');
        
        if (!tabContainer) return;
        
        // Remove active class from all buttons and panes
        tabContainer.querySelectorAll('.tab-btn').forEach(button => {
          button.classList.remove('active');
        });
        
        tabContainer.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Add active class to current button and pane
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
      });
    });
  }
});