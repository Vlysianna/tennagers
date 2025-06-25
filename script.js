// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.from(".hero-content h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
});

gsap.from(".hero-content p", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power4.out"
});

gsap.from(".hero-content .flex", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: "power4.out"
});

// Hero Gallery Configuration
const heroSlideInfo = [
    {
        title: "Modern Casual Style",
        description: "Koleksi casual yang nyaman dan stylish untuk aktivitas sehari-hari"
    },
    {
        title: "Street Fashion",
        description: "Tampil berani dengan gaya street fashion yang unik"
    },
    {
        title: "Urban Minimalist",
        description: "Desain minimalis yang cocok untuk gaya urban modern"
    }
];

// Initialize Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    on: {
        init: function() {
            updateSlideInfo(this.realIndex);
            updateThumbnailActive(this.realIndex);
        },
        slideChange: function() {
            updateSlideInfo(this.realIndex);
            updateThumbnailActive(this.realIndex);
        }
    }
});

// Update Slide Information
function updateSlideInfo(index) {
    const slideInfo = document.querySelector('.slide-info');
    const slideTitle = slideInfo.querySelector('.slide-title');
    const slideDescription = slideInfo.querySelector('.slide-description');

    // Reset animation
    slideInfo.style.transform = 'translateY(100%)';
    slideInfo.style.opacity = '0';

    // Update content
    slideTitle.textContent = heroSlideInfo[index].title;
    slideDescription.textContent = heroSlideInfo[index].description;

    // Trigger animation
    setTimeout(() => {
        slideInfo.style.transform = 'translateY(0)';
        slideInfo.style.opacity = '1';
    }, 100);
}

// Update Thumbnail Active State
function updateThumbnailActive(index) {
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    thumbnails.forEach((thumb, i) => {
        const border = thumb.querySelector('.border-2');
        const overlay = thumb.querySelector('.bg-black\\/20');
        if (i === index) {
            border.classList.remove('border-transparent');
            border.classList.add('border-white');
            overlay.classList.add('bg-black/0');
            overlay.classList.remove('bg-black/20');
            
            // Scale effect
            gsap.to(thumb, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            border.classList.add('border-transparent');
            border.classList.remove('border-white');
            overlay.classList.remove('bg-black/0');
            overlay.classList.add('bg-black/20');
            
            // Reset scale
            gsap.to(thumb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// Thumbnail Click Handler
document.querySelectorAll('.thumbnail-container').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        heroSwiper.slideTo(index);
    });
    
    // Hover effect
    thumb.addEventListener('mouseenter', () => {
        if (index !== heroSwiper.realIndex) {
            gsap.to(thumb, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    thumb.addEventListener('mouseleave', () => {
        if (index !== heroSwiper.realIndex) {
            gsap.to(thumb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
});

// Parallax effect for hero images
document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = slide.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        const image = slide.querySelector('img');
        gsap.to(image, {
            x: x * 20,
            y: y * 20,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    slide.addEventListener('mouseleave', () => {
        const image = slide.querySelector('img');
        gsap.to(image, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        
        if (!isOpen) {
            // Opening animation
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            gsap.from('#mobile-menu .mt-12 li', {
                x: 50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        } else {
            // Closing animation
            gsap.to('#mobile-menu', {
                x: '100%',
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    mobileMenu.classList.remove('translate-x-0');
                    mobileMenu.classList.add('translate-x-full');
                }
            });
        }
        
        body.style.overflow = isOpen ? '' : 'hidden';
    }

    mobileMenuButton?.addEventListener('click', toggleMenu);
    closeMenuButton?.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('translate-x-0') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuButton.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Cursor Effect with GSAP
const cursor = document.createElement('div');
const cursorOutline = document.createElement('div');
cursor.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursor);
document.body.appendChild(cursorOutline);

gsap.set([cursor, cursorOutline], { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" }),
    yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

let xToOutline = gsap.quickTo(cursorOutline, "x", { duration: 0.5, ease: "power3" }),
    yToOutline = gsap.quickTo(cursorOutline, "y", { duration: 0.5, ease: "power3" });

window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
    xToOutline(e.clientX);
    yToOutline(e.clientY);
});

// Hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .interactive');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    gsap.to('.parallax', {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
    });
});

// Hero Image Gallery Functionality
function changeHeroImage(newImageSrc, clickedThumbnail) {
    // Change main image
    document.getElementById('main-hero-image').src = newImageSrc;

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach(thumb => {
        thumb.style.border = 'none';
        thumb.style.opacity = '0.8';
    });

    if (clickedThumbnail) {
        clickedThumbnail.style.border = '2px solid #303030';
        clickedThumbnail.style.opacity = '1';
    }

    // Reset auto-rotation
    clearInterval(rotationInterval);
    currentImageIndex = imageSources.findIndex(src => src === newImageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    rotationInterval = setInterval(rotateHeroImages, 5000);
}

// Auto-rotate images
let currentImageIndex = 0;
const imageSources = [
    'img/GAMBAR1.png',
    'img/GAMBAR2.png',
    'img/GAMBAR3.png'
];
let rotationInterval = setInterval(rotateHeroImages, 5000);

function rotateHeroImages() {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    document.getElementById('main-hero-image').src = imageSources[currentImageIndex];

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.style.border = '2px solid #303030';
            thumb.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            thumb.style.opacity = '1';
        } else {
            thumb.style.border = 'none';
            thumb.style.opacity = '0.8';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Scroll Animation Functionality
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in'); // Reset saat keluar viewport
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe semua elemen dengan class animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        // Set initial state
        el.classList.add('animate-ready');
        scrollObserver.observe(el);
    });

    // Thumbnail Animation on Scroll
    const thumbnailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const thumbnails = entry.target.querySelectorAll('.thumbnail-list img');
            thumbnails.forEach((thumb, index) => {
                if (entry.isIntersecting) {
                    // Animasikan dengan delay bertahap
                    thumb.style.transition = `opacity 0.5s ease ${index * 0.1}s, border 0.3s ease`;
                    thumb.style.opacity = '1';

                    // Highlight thumbnail pertama
                    if (index === 0) {
                        thumb.style.border = '2px solid #303030';
                    }
                } else {
                    // Reset saat keluar viewport
                    thumb.style.opacity = '0';
                    thumb.style.border = '2px solid transparent';
                    thumb.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                }
            });
        });
    }, { threshold: 0.1 });

    // Observe thumbnail containers
    document.querySelectorAll('.thumbnail-container').forEach(container => {
        thumbnailObserver.observe(container);
    });

    // Weekly Picks Card Animation
    const weeklyCards = document.querySelectorAll('.weekly-card');
    const mainCard = document.querySelector('.main-card');
    const secondaryCards = document.querySelectorAll('.secondary-card');
    
    // Get initial dimensions
    const mainCardRect = mainCard.getBoundingClientRect();
    const mainCardWidth = mainCardRect.width;
    const secondaryCardRect = secondaryCards[0].getBoundingClientRect();
    const secondaryCardWidth = secondaryCardRect.width;
    
    // Set same height for all cards initially
    const targetHeight = 500; // Set fixed height for all cards
    weeklyCards.forEach(card => {
        const imageContainer = card.querySelector('.relative.overflow-hidden');
        card.style.height = `${targetHeight}px`;
        imageContainer.style.height = `${targetHeight * 0.7}px`; // Image takes 70% of card height
        
        // Tambahkan overlay gradient untuk efek hover
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300';
        imageContainer.appendChild(overlay);
        
        // Tambahkan efek shine
        const shine = document.createElement('div');
        shine.className = 'absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full';
        imageContainer.appendChild(shine);
    });
    
    weeklyCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        card.dataset.originalWidth = rect.width;
        card.dataset.index = index;
        card.style.position = 'relative';
        
        // Tambahkan efek hover untuk teks
        const textContainer = card.querySelector('.py-6');
        const title = textContainer.querySelector('h3');
        const category = textContainer.querySelector('.text-sm');
        
        title.style.transition = 'transform 0.3s ease, color 0.3s ease';
        category.style.transition = 'transform 0.3s ease, color 0.3s ease';
        
        if (card.classList.contains('main-card')) {
            card.dataset.isExpanded = 'true';
        } else {
            card.dataset.isExpanded = 'false';
        }
    });

    // Function to handle card hover
    function handleCardHover(hoveredCard, isHovering) {
        const hoveredIndex = parseInt(hoveredCard.dataset.index);
        const moveDistance = mainCardWidth - secondaryCardWidth + 40; // Tambah gap

        weeklyCards.forEach(card => {
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            const overlay = imageContainer.querySelector('.absolute');
            const shine = imageContainer.querySelectorAll('.absolute')[1];
            const textContainer = card.querySelector('.py-6');
            const title = textContainer.querySelector('h3');
            const category = textContainer.querySelector('.text-sm');
            
            const isMainCard = card.classList.contains('main-card');
            const cardIndex = parseInt(card.dataset.index);
            
            // Reset semua transisi untuk smooth animation
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            imageContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (isHovering) {
                if (isMainCard) {
                    // Card 1 mengecil
                    card.style.width = `${secondaryCardWidth}px`;
                    imageContainer.style.aspectRatio = '2/3';
                    card.style.transform = 'none';
                    card.style.zIndex = '1';
                    overlay.style.opacity = '0';
                } else if (card === hoveredCard) {
                    // Card yang di-hover membesar dan bergerak ke posisi card 1
                    card.style.width = `${mainCardWidth}px`;
                    imageContainer.style.aspectRatio = '3/2';
                    
                    // Jika card 2 yang di-hover, geser ke kiri dengan offset khusus
                    if (cardIndex === 1) {
                        card.style.transform = `translateX(-${moveDistance}px) scale(1.02)`;
                    } else {
                        card.style.transform = `translateX(-${moveDistance}px) scale(1.02)`;
                    }
                    
                    card.style.zIndex = '10';
                    overlay.style.opacity = '1';
                    
                    // Animate text
                    title.style.transform = 'translateY(-5px)';
                    title.style.color = '#000';
                    category.style.transform = 'translateX(5px)';
                    
                    // Animate shine effect
                    shine.style.transition = 'transform 0.8s ease';
                    shine.style.transform = 'translateX(100%)';
                } else {
                    // Card lain mengecil dan bergerak
                    card.style.width = `${secondaryCardWidth}px`;
                    imageContainer.style.aspectRatio = '2/3';
                    
                    // Jika ini card 3 dan card 2 yang di-hover
                    if (cardIndex === 2 && hoveredIndex === 1) {
                        // Bergerak lebih jauh ke kanan untuk menghindari overlap
                        const card2Width = mainCardWidth - secondaryCardWidth;
                        card.style.transform = `translateX(-${moveDistance - card2Width/2}px)`;
                    } else {
                        card.style.transform = `translateX(-${moveDistance}px)`;
                    }
                    
                    card.style.zIndex = '1';
                    overlay.style.opacity = '0';
                }
            } else {
                // Kembalikan ke posisi awal
                if (isMainCard) {
                    card.style.width = `${mainCardWidth}px`;
                    imageContainer.style.aspectRatio = '3/2';
                } else {
                    card.style.width = `${secondaryCardWidth}px`;
                    imageContainer.style.aspectRatio = '2/3';
                }
                card.style.transform = 'none';
                card.style.zIndex = isMainCard ? '2' : '1';
                overlay.style.opacity = '0';
                
                // Reset text animation
                title.style.transform = 'none';
                title.style.color = '';
                category.style.transform = 'none';
                
                // Reset shine
                shine.style.transform = '-translateX(-100%)';
            }
        });
    }

    // Add hover event listeners and mouse move effect
    weeklyCards.forEach(card => {
        card.addEventListener('mouseenter', () => handleCardHover(card, true));
        card.addEventListener('mouseleave', () => handleCardHover(card, false));
        
        // Tambahkan efek mouse move untuk parallax
        card.addEventListener('mousemove', (e) => {
            if (card.dataset.isExpanded === 'true' || card === e.currentTarget) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = (x / rect.width - 0.5) * 5;
                const yPercent = (y / rect.height - 0.5) * 5;
                
                const image = card.querySelector('img');
                image.style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.05)`;
            }
        });
        
        // Reset parallax on mouse leave
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('img');
            image.style.transform = 'none';
        });
    });

    // Cursor effect
    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursor.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        outlineX += (cursorX - outlineX) * 0.1;
        outlineY += (cursorY - outlineY) * 0.1;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    });

    // Story Section Animations
    document.addEventListener('DOMContentLoaded', function() {
        // Parallax effect for story images
        const storyImages = document.querySelectorAll('#description .aspect-\\[4\\/5\\]');
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateParallax() {
            storyImages.forEach((img, index) => {
                const speed = 0.1;
                const yPos = -(window.scrollY * speed);
                img.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Stats counter animation
        const stats = document.querySelectorAll('.stat-item .text-3xl');
        const statsSection = document.querySelector('#description');
        let hasAnimated = false;

        function animateStats() {
            if (hasAnimated) return;
            
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50; // Adjust speed here
                const duration = 1500; // Animation duration in milliseconds
                const stepTime = duration / 50;
                
                function updateCount() {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.round(current) + '+';
                        setTimeout(updateCount, stepTime);
                    } else {
                        stat.textContent = target + '+';
                    }
                }
                
                updateCount();
            });
            
            hasAnimated = true;
        }

        // Intersection Observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });

        statsSection && statsObserver.observe(statsSection);

        // Image hover effect
        const storyContainers = document.querySelectorAll('#description .aspect-\\[4\\/5\\]');
        
        storyContainers.forEach(container => {
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = (x / rect.width - 0.5) * 20;
                const yPercent = (y / rect.height - 0.5) * 20;
                
                const image = container.querySelector('img');
                image.style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.1)`;
            });
            
            container.addEventListener('mouseleave', (e) => {
                const image = container.querySelector('img');
                image.style.transform = 'none';
            });
        });

        // Smooth scroll for "Pelajari Lebih Lanjut" link
        const learnMoreLink = document.querySelector('#description a[href="#"]');
        learnMoreLink?.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#our-collection');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Weekly Picks Mobile Interaction
    const weeklyPicksSection = document.querySelector('#weekly-picks');
    if (weeklyPicksSection) {
        const filterButtons = weeklyPicksSection.querySelectorAll('.filter-btn');
        const cards = weeklyPicksSection.querySelectorAll('.weekly-card');
        const navigationDots = weeklyPicksSection.querySelectorAll('.flex.justify-center button');
        let currentCardIndex = 0;

        // Filter Button Interaction
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-secondary');
                });
                
                // Add active class to clicked button
                button.classList.remove('bg-gray-100', 'text-secondary');
                button.classList.add('bg-primary', 'text-white');
            });
        });

        // Mobile Card Navigation
        function updateCardVisibility() {
            if (window.innerWidth < 1024) { // Mobile & tablet only
                cards.forEach((card, index) => {
                    card.style.display = index === currentCardIndex ? 'block' : 'none';
                    
                    // Update navigation dots
                    navigationDots[index].classList.toggle('bg-primary', index === currentCardIndex);
                    navigationDots[index].classList.toggle('bg-gray-200', index !== currentCardIndex);
                });
            } else {
                // Reset all cards to visible for desktop
                cards.forEach(card => {
                    card.style.display = '';
                });
            }
        }

        // Initialize card visibility
        updateCardVisibility();

        // Handle navigation dot clicksm
        navigationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentCardIndex = index;
                updateCardVisibility();
            });
        });

        // Add touch swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;

        weeklyPicksSection.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        weeklyPicksSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold && window.innerWidth < 1024) {
                if (swipeDistance > 0 && currentCardIndex > 0) {
                    // Swipe right
                    currentCardIndex--;
                } else if (swipeDistance < 0 && currentCardIndex < cards.length - 1) {
                    // Swipe left
                    currentCardIndex++;
                }
                updateCardVisibility();
            }
        }

        // Handle window resize
        window.addEventListener('resize', updateCardVisibility);
    }
});

// Vision Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const visionSlides = document.querySelectorAll('.vision-slide');
    const visionQuotes = document.querySelectorAll('.vision-quote');
    const visionDots = document.querySelectorAll('.vision-dot');
    const prevButton = document.querySelector('.vision-prev');
    const nextButton = document.querySelector('.vision-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides and quotes
        visionSlides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });
        visionQuotes.forEach(quote => {
            quote.classList.add('hidden');
        });
        visionDots.forEach(dot => {
            dot.classList.remove('bg-white', 'w-6');
            dot.classList.add('bg-white/50', 'w-2');
        });

        // Show current slide and quote
        visionSlides[index].style.opacity = '1';
        visionSlides[index].style.zIndex = '1';
        visionQuotes[index].classList.remove('hidden');
        visionDots[index].classList.remove('bg-white/50', 'w-2');
        visionDots[index].classList.add('bg-white', 'w-6');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % visionSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + visionSlides.length) % visionSlides.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    showSlide(currentSlide);

    // Start auto-rotation
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    startSlideInterval();

    // Event listeners
    prevButton?.addEventListener('click', () => {
        prevSlide();
        stopSlideInterval();
        startSlideInterval();
    });

    nextButton?.addEventListener('click', () => {
        nextSlide();
        stopSlideInterval();
        startSlideInterval();
    });

    visionDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideInterval();
            startSlideInterval();
        });
    });

    // Vision Stats Animation
    const visionStats = document.querySelectorAll('.vision-stat');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        visionStats.forEach(stat => {
            const numberElement = stat.querySelector('.text-4xl');
            const targetNumber = parseInt(numberElement.textContent);
            let currentNumber = 0;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetNumber / steps;
            const stepDuration = duration / steps;

            const animation = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    numberElement.textContent = targetNumber + '%';
                    clearInterval(animation);
                } else {
                    numberElement.textContent = Math.round(currentNumber) + '%';
                }
            }, stepDuration);
        });

        hasAnimated = true;
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    visionStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Vision Values Animation
    const visionValues = document.querySelectorAll('.vision-value');
    
    visionValues.forEach((value, index) => {
        value.style.opacity = '0';
        value.style.transform = 'translateX(-20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        value.style.opacity = '1';
                        value.style.transform = 'translateX(0)';
                    }, index * 200);
                    observer.unobserve(value);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(value);
    });

    // Parallax effect for vision gallery
    const visionGallery = document.querySelector('.vision-gallery');
    
    if (visionGallery) {
        window.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = visionGallery.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            visionGallery.style.transform = `
                perspective(1000px)
                rotateY(${x * 5}deg)
                rotateX(${-y * 5}deg)
            `;
        });
        
        visionGallery.addEventListener('mouseleave', () => {
            visionGallery.style.transform = 'none';
        });
    }
});

// Collection Slider Variables
let sliderInterval;
let isSliderPaused = false;
let currentSlideIndex = 0;

function moveSlider(direction) {
    const slideTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slideTrack || slides.length === 0) return;
    
    // Stop the automatic animation
    slideTrack.style.animationPlayState = 'paused';
    slideTrack.classList.remove('animate-slide');
    
    // Get current active slide
    let activeIndex = 0;
    dots.forEach((dot, index) => {
        if (dot.classList.contains('active')) {
            activeIndex = parseInt(dot.dataset.index) - 1;
        }
    });
    
    // Calculate next index
    if (direction === 'next') {
        currentSlideIndex = (activeIndex + 1) % slides.length;
    } else {
        currentSlideIndex = (activeIndex - 1 + slides.length) % slides.length;
    }
    
    // Update active dot
    dots.forEach(dot => {
        dot.classList.remove('active', 'bg-primary');
        dot.classList.add('bg-gray-300');
        
        if (parseInt(dot.dataset.index) - 1 === currentSlideIndex) {
            dot.classList.add('active', 'bg-primary');
            dot.classList.remove('bg-gray-300');
        }
    });
    
    // Scroll to the selected slide
    const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
    const scrollPosition = currentSlideIndex * slideWidth;
    
    slideTrack.style.transition = 'transform 0.5s ease-in-out';
    slideTrack.style.transform = `translateX(-${scrollPosition}px)`;
}

function startSliderAutoplay() {
    if (sliderInterval) clearInterval(sliderInterval);
    
    sliderInterval = setInterval(() => {
        if (!isSliderPaused) {
            moveSlider('next');
        }
    }, 5000); // Change slide every 5 seconds
}

function pauseSlider() {
    isSliderPaused = true;
}

function resumeSlider() {
    isSliderPaused = false;
}

// Initialize slider dots and autoplay
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slideTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    if (sliderContainer && slides.length > 0) {
        // Clone slides for infinite loop effect if needed
        const slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight || 0);
        
        // Remove animation initially
        if (slideTrack.classList.contains('animate-slide')) {
            slideTrack.classList.remove('animate-slide');
        }
        
        // Set up initial position and styles
        slideTrack.style.display = 'flex';
        slideTrack.style.transition = 'transform 0.5s ease-in-out';
        
        // Make first dot active
        if (dots.length > 0) {
            dots[0].classList.add('active', 'bg-primary');
            dots[0].classList.remove('bg-gray-300');
        }
        
        // Set up click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlideIndex = index;
                
                // Update active dot
                dots.forEach(d => {
                    d.classList.remove('active', 'bg-primary');
                    d.classList.add('bg-gray-300');
                });
                this.classList.add('active', 'bg-primary');
                this.classList.remove('bg-gray-300');
                
                // Scroll to the selected slide
                const scrollPosition = currentSlideIndex * slideWidth;
                
                slideTrack.style.transform = `translateX(-${scrollPosition}px)`;
                
                // Temporarily pause autoplay when manually changing slides
                pauseSlider();
                setTimeout(resumeSlider, 3000);
            });
        });
        
        // Set up click handlers for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                moveSlider('prev');
                pauseSlider();
                setTimeout(resumeSlider, 3000);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                moveSlider('next');
                pauseSlider();
                setTimeout(resumeSlider, 3000);
            });
        }
        
        // Start autoplay
        startSliderAutoplay();
        
        // Pause autoplay on hover
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', resumeSlider);
        
        // Pause autoplay on touch
        sliderContainer.addEventListener('touchstart', pauseSlider);
        sliderContainer.addEventListener('touchend', () => {
            // Resume after a short delay to allow for touch navigation
            setTimeout(resumeSlider, 1000);
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            pauseSlider();
            
            resizeTimer = setTimeout(function() {
                // Recalculate slide width
                const newSlideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight || 0);
                const scrollPosition = currentSlideIndex * newSlideWidth;
                
                // Update position without animation
                slideTrack.style.transition = 'none';
                slideTrack.style.transform = `translateX(-${scrollPosition}px)`;
                
                // Re-enable animation after a short delay
                setTimeout(() => {
                    slideTrack.style.transition = 'transform 0.5s ease-in-out';
                    resumeSlider();
                }, 50);
            }, 250);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('product-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    // Modal elements
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductCategory = document.getElementById('modal-product-category');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    
    // Product descriptions - would normally come from a database
    const productDescriptions = {
        1: "Oversized T-Shirt dengan potongan longgar yang nyaman dipakai sehari-hari. Terbuat dari 100% katun premium yang lembut di kulit dan breathable.",
        2: "Cargo Pants dengan desain modern dan fungsional. Dilengkapi dengan kantong serbaguna dan material yang tahan lama namun tetap nyaman dipakai.",
        3: "Denim Jacket oversized dengan potongan yang sempurna. Terbuat dari denim premium yang akan semakin nyaman seiring waktu pemakaian.",
        4: "Basic Hoodie dengan desain minimalis yang timeless. Terbuat dari french terry yang lembut dan hangat, cocok untuk daily outfit."
    };
    
    // Open modal function
    function openModal(productData) {
        // Set product data
        modalProductImage.src = productData.image;
        modalProductName.textContent = productData.name;
        modalProductCategory.textContent = productData.category;
        modalProductPrice.textContent = productData.price;
        modalProductDescription.textContent = productDescriptions[productData.id] || "Tampil minimalis dengan desain yang simpel namun tetap stylish. Dibuat dengan material premium yang nyaman dipakai sepanjang hari.";
        
        // Show modal with animation
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalBackdrop.classList.add('opacity-100');
            modalContent.classList.add('opacity-100', 'scale-100');
            modalContent.classList.remove('scale-95');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        modalBackdrop.classList.remove('opacity-100');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            // Re-enable body scroll
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Add click event to quick view buttons
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productData = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: this.dataset.productPrice,
                image: this.dataset.productImage,
                category: this.dataset.productCategory
            };
            
            openModal(productData);
        });
    });
    
    // Close modal events
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // Prevent closing when clicking inside modal content
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Product image dots navigation
    const productImageDots = document.querySelectorAll('.product-image-dot');
    productImageDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Here you would normally switch the product image
            // For this demo we'll just update the active dot
            productImageDots.forEach(d => d.classList.remove('active', 'bg-white'));
            productImageDots.forEach(d => d.classList.add('bg-white/50'));
            this.classList.add('active', 'bg-white');
            this.classList.remove('bg-white/50');
        });
    });
});