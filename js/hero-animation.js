// Hero Animation JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Animation Controls
  const animationControls = document.querySelectorAll(".animation-control");
  const indicators = document.querySelectorAll(".indicator");
  const securityShield = document.querySelector(".security-shield");

  if (animationControls.length && indicators.length && securityShield) {
    animationControls.forEach((control) => {
      control.addEventListener("click", function () {
        const step = parseInt(this.getAttribute("data-step"));

        // Remove active class from all controls
        animationControls.forEach((ctrl) => {
          ctrl.classList.remove("active");
        });

        // Add active class to clicked control
        this.classList.add("active");

        // Reset all animation elements
        resetAnimationElements();

        // Show appropriate animation based on step
        switch (step) {
          case 1: // Compromise
            showCompromiseAnimation();
            break;
          case 2: // Detection
            showDetectionAnimation();
            break;
          case 3: // Protection
            showProtectionAnimation();
            break;
        }
      });
    });

    // Set default animation (compromise) on page load
    setTimeout(() => {
      showCompromiseAnimation();
      animationControls[0].classList.add("active");
    }, 1000);

    // Auto cycle through animations
    let currentAnimationStep = 1;
    setInterval(() => {
      currentAnimationStep = (currentAnimationStep % 3) + 1;

      // Reset all animation elements
      resetAnimationElements();

      // Remove active class from all controls
      animationControls.forEach((ctrl) => {
        ctrl.classList.remove("active");
      });

      // Add active class to current control
      animationControls[currentAnimationStep - 1].classList.add("active");

      // Show appropriate animation
      switch (currentAnimationStep) {
        case 1:
          showCompromiseAnimation();
          break;
        case 2:
          showDetectionAnimation();
          break;
        case 3:
          showProtectionAnimation();
          break;
      }
    }, 6000); // Cycle every 6 seconds
  }

  function resetAnimationElements() {
    // Reset indicators
    indicators.forEach((indicator) => {
      indicator.style.opacity = "0";
      indicator.style.transform = "scale(0)";
    });

    // Reset security shield
    securityShield.style.opacity = "0";
    securityShield.style.transform = "translate(-50%, -50%) scale(0)";
  }

  function showCompromiseAnimation() {
    setTimeout(() => {
      indicators[0].style.opacity = "1";
      indicators[0].style.transform = "scale(1)";
    }, 300);

    setTimeout(() => {
      indicators[1].style.opacity = "1";
      indicators[1].style.transform = "scale(1)";
    }, 900);

    setTimeout(() => {
      indicators[2].style.opacity = "1";
      indicators[2].style.transform = "scale(1)";
    }, 1500);
  }

  function showDetectionAnimation() {
    setTimeout(() => {
      indicators[0].style.opacity = "1";
      indicators[0].style.transform = "scale(1)";
    }, 300);

    setTimeout(() => {
      indicators[1].style.opacity = "1";
      indicators[1].style.transform = "scale(1)";
    }, 600);

    setTimeout(() => {
      indicators[2].style.opacity = "1";
      indicators[2].style.transform = "scale(1)";
    }, 900);

    // Pulse effect on indicators
    setTimeout(() => {
      indicators.forEach((indicator) => {
        indicator.style.boxShadow = "0 0 0 5px rgba(230, 57, 70, 0.3)";
      });
    }, 1500);

    setTimeout(() => {
      indicators.forEach((indicator) => {
        indicator.style.boxShadow = "none";
      });
    }, 2000);
  }

  function showProtectionAnimation() {
    // Show and fade out indicators first
    setTimeout(() => {
      indicators[0].style.opacity = "1";
      indicators[0].style.transform = "scale(1)";
    }, 300);

    setTimeout(() => {
      indicators[1].style.opacity = "1";
      indicators[1].style.transform = "scale(1)";
    }, 600);

    setTimeout(() => {
      indicators[2].style.opacity = "1";
      indicators[2].style.transform = "scale(1)";
    }, 900);

    // Show security shield
    setTimeout(() => {
      securityShield.style.opacity = "1";
      securityShield.style.transform = "translate(-50%, -50%) scale(1)";
    }, 1500);

    // Fade out indicators
    setTimeout(() => {
      indicators.forEach((indicator) => {
        indicator.style.opacity = "0";
        indicator.style.transform = "scale(0)";
      });
    }, 2000);
  }
});

function sendMessage() {
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");
  const userMessage = userInput.value.trim();

  if (userMessage === "") return;

  // Display user message
  const userMessageElement = document.createElement("div");
  userMessageElement.style.margin = "10px 0";
  userMessageElement.innerHTML = `<strong>You:</strong> ${userMessage}`;
  chatMessages.appendChild(userMessageElement);

  // Get bot reply
  const botMessage = getBotResponse(userMessage);

  // Display bot reply
  const botMessageElement = document.createElement("div");
  botMessageElement.style.margin = "10px 0";
  botMessageElement.innerHTML = `<strong>Bot:</strong> ${botMessage}`;
  chatMessages.appendChild(botMessageElement);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Clear input
  userInput.value = "";
}

const inputBox = document.getElementById("user-input");

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevents form submission if inside form
    sendMessage(); // call the same function as clicking the send button
  }
});

function getBotResponse(message) {
  message = message.toLowerCase();

  if (message.includes("what is spyware")) {
    return "Spyware is malicious software that secretly gathers your information without your consent.";
  } else if (
    message.includes("protect") ||
    message.includes("how to stay safe")
  ) {
    return "Use trusted antivirus software, avoid downloading unknown apps, and regularly update your device for security.";
  } else if (message.includes("signs") || message.includes("infection")) {
    return "Common signs of infection include fast battery drain, random pop-ups, overheating, or unknown apps appearing.";
  } else if (
    message.includes("remove") ||
    message.includes("how to remove spyware")
  ) {
    return "Run a full scan with a trusted anti-malware tool like Malwarebytes, Avast, or Bitdefender to remove spyware.";
  } else if (
    message.includes("best anti-spyware") ||
    message.includes("top tools")
  ) {
    return "Some of the best anti-spyware tools are Malwarebytes, Bitdefender, Norton Mobile Security, and Kaspersky.";
  } else if (message.includes("tips") || message.includes("stay safe")) {
    return "Download apps only from trusted stores, check app permissions carefully, and avoid suspicious websites.";
  } else if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    return "Hello! 👋 I'm your Spyware Awareness Assistant. How can I help you today?";
  }
  // 🌸 Emotional support
  else if (
    message.includes("scared") ||
    message.includes("anxious") ||
    message.includes("victim") ||
    message.includes("help") ||
    message.includes("support")
  ) {
    return "You're not alone ❤️. We are here to listen and support you. 👉 <a href='contact.html' target='_blank'>Click here to get emotional support</a>";
  } else if (message.includes("reach")) {
    return "We are here to listen and support you. 👉 <a href='contact.html' target='_blank'>Click here to for support</a>";
  }
  // 🌟 NEW extra user-friendly options
  else if (
    message.includes("report spyware") ||
    message.includes("report app")
  ) {
    return "You can report malicious apps directly to Google Play Protect or your device manufacturer for investigation.";
  } else if (
    message.includes("safe browsers") ||
    message.includes("private browsing")
  ) {
    return "For safer browsing, use browsers like Brave, Firefox Focus, or DuckDuckGo Privacy Browser.";
  } else if (
    message.includes("free tools") ||
    message.includes("free anti-spyware")
  ) {
    return "Some free anti-spyware tools include Malwarebytes Free Edition, Avast Mobile Security, and Sophos Intercept X.";
  } else if (
    message.includes("family protection") ||
    message.includes("kids safety")
  ) {
    return "For family safety, use parental control apps and teach children about avoiding unknown links and suspicious downloads.";
  } else if (
    message.includes("phone slowing down") ||
    message.includes("device slow")
  ) {
    return "A slow device could be due to spyware or bloatware. Run a security scan and uninstall unnecessary apps.";
  } else if (message.includes("identity theft") || message.includes("hacked")) {
    return "If you think your identity has been compromised, reset passwords immediately, enable two-factor authentication, and monitor your accounts.";
  } else {
    return "Sorry, I didn't understand that. Try asking about spyware, protection tips, emotional support, or how to stay safe! 🙏";
  }
}
