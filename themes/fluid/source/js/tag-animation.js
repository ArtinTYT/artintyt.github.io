document.addEventListener('DOMContentLoaded', () => {
  const tagcloud = document.querySelector('.tagcloud');
  if (!tagcloud) return;

  // Emoji collection for floating elements
  const emojis = ['🌟', '✨', '💫', '⭐', '🎯', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠', '🎪', '🎨', '🎭', '🎯'];
  
  // Create floating elements
  const createFloatingElement = () => {
    const element = document.createElement('div');
    element.className = 'floating-element';
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    element.textContent = emoji;
    element.style.cssText = `
      position: absolute;
      font-size: ${12 + Math.random() * 8}px;
      pointer-events: none;
      animation: float ${5 + Math.random() * 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      transform-origin: center;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
      z-index: 0;
    `;
    tagcloud.appendChild(element);

    // Add mouse interaction
    element.addEventListener('mouseover', () => {
      element.style.animation = 'none';
      element.style.transform = 'scale(1.5) rotate(180deg)';
      element.style.transition = 'all 0.3s ease';
    });

    element.addEventListener('mouseout', () => {
      element.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
      element.style.transform = '';
    });
  };

  // Create multiple floating elements
  for (let i = 0; i < 20; i++) {
    createFloatingElement();
  }

  // Add floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }

    .floating-element {
      transition: all 0.3s ease;
    }

    .floating-element:hover {
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Add new floating elements periodically
  setInterval(() => {
    if (document.querySelectorAll('.floating-element').length < 30) {
      createFloatingElement();
    }
  }, 3000);
});