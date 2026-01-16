// PingLater Landing Page - Interactive Animations

document.addEventListener('DOMContentLoaded', () => {
  initTabsChaosAnimation();
  initScrollAnimations();
  initFaqAccordion();
});

// ==========================================
// TABS CHAOS ANIMATION - SCATTER EFFECT
// ==========================================

function initTabsChaosAnimation() {
  const tabsChaos = document.getElementById('tabs-chaos');
  const heroContent = document.querySelector('.hero-content');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const floatingTabs = document.querySelectorAll('.floating-tab');
  
  let animationTriggered = false;
  
  // Calculate scatter directions for each tab based on position
  floatingTabs.forEach((tab) => {
    const rect = tab.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tabCenterX = rect.left + rect.width / 2;
    const tabCenterY = rect.top + rect.height / 2;
    
    // Direction away from center
    const dirX = tabCenterX < centerX ? -1 : 1;
    const dirY = tabCenterY < centerY ? -1 : 1;
    
    // Random scatter distance
    const scatterX = dirX * (300 + Math.random() * 400);
    const scatterY = dirY * (200 + Math.random() * 300);
    const scatterRotate = (Math.random() - 0.5) * 180;
    
    tab.dataset.scatterX = scatterX;
    tab.dataset.scatterY = scatterY;
    tab.dataset.scatterRotate = scatterRotate;
  });
  
  // Initially hide hero content, then fade in
  setTimeout(() => {
    heroContent.classList.add('visible');
    scrollIndicator.classList.add('visible');
  }, 800);
  
  // Scroll-triggered animation
  function handleScroll() {
    const scrollY = window.scrollY;
    const triggerPoint = 80;
    
    if (scrollY > triggerPoint && !animationTriggered) {
      animationTriggered = true;
      scatterTabs();
    }
  }
  
  // Scatter tabs animation - fly away!
  function scatterTabs() {
    floatingTabs.forEach((tab, index) => {
      const scatterX = parseFloat(tab.dataset.scatterX);
      const scatterY = parseFloat(tab.dataset.scatterY);
      const scatterRotate = parseFloat(tab.dataset.scatterRotate);
      
      setTimeout(() => {
        tab.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease';
        tab.style.transform = `translate(${scatterX}px, ${scatterY}px) rotate(${scatterRotate}deg) scale(0.5)`;
        tab.style.opacity = '0';
      }, index * 40);
    });
    
    // Hide the chaos container after animation
    setTimeout(() => {
      tabsChaos.style.display = 'none';
    }, 1000);
    
    // Hide scroll indicator
    scrollIndicator.classList.remove('visible');
  }
  
  // Listen to scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Also allow clicking anywhere on hero to trigger
  document.querySelector('.hero').addEventListener('click', (e) => {
    if (!animationTriggered && !e.target.closest('.cta-button') && !e.target.closest('a')) {
      animationTriggered = true;
      scatterTabs();
      // Smooth scroll to features
      setTimeout(() => {
        document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  });
}


// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.feature-card, .step, .section-header, .cta-card'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.classList.add('animate-prepare');
    observer.observe(el);
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-prepare {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .feature-card.animate-prepare {
      transition-delay: calc(var(--index, 0) * 0.1s);
    }
    
    @media (min-width: 901px) {
      .step.animate-prepare {
        transform: translateX(-30px);
      }
      
      .step:nth-child(even).animate-prepare {
        transform: translateX(30px);
      }
      
      .step.animate-in {
        transform: translateX(0);
      }
    }
    
    @media (max-width: 900px) {
      .step.animate-prepare {
        transform: translateY(30px);
      }
      
      .step.animate-in {
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add index for staggered animation
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.setProperty('--index', index);
  });
}

// ==========================================
// FAQ ACCORDION
// ==========================================

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });
      
      // Toggle current item
      item.classList.toggle('open');
    });
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
