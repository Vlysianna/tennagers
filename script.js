// =====================
// 1. NAVBAR & MOBILE MENU
// =====================

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    const body = document.body;
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const allNavLinks = document.querySelectorAll('a[href^="#"]');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const yOffset = -80;
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });

                if (mobileMenu.classList.contains('translate-x-0')) {
                    closeMenu();
                }
            }
        });
    });

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');

        mobileBackdrop.classList.add('opacity-100');

        hamburgerLines[0].classList.add('rotate-45', 'translate-y-2');
        hamburgerLines[1].classList.add('opacity-0');
        hamburgerLines[2].classList.add('-rotate-45', '-translate-y-2');

        mobileMenuItems.forEach(item => {
            item.classList.remove('-translate-x-8', 'opacity-0');
            item.classList.add('translate-x-0', 'opacity-100');
        });

        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');

        mobileBackdrop.classList.remove('opacity-100');

        hamburgerLines[0].classList.remove('rotate-45', 'translate-y-2');
        hamburgerLines[1].classList.remove('opacity-0');
        hamburgerLines[2].classList.remove('-rotate-45', '-translate-y-2');

        mobileMenuItems.forEach(item => {
            item.classList.add('-translate-x-8', 'opacity-0');
            item.classList.remove('translate-x-0', 'opacity-100');
        });

        body.style.overflow = '';
    }

    function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-0');

        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMenu);
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
    }

    mobileBackdrop.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('translate-x-0') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuButton.contains(e.target)) {
            closeMenu();
        }
    });

    document.querySelectorAll('#mobile-menu li a').forEach(link => {
        link.addEventListener('mouseenter', function () {
            const line = this.querySelector('span');
            line.classList.add('scale-x-100');
        });

        link.addEventListener('mouseleave', function () {
            const line = this.querySelector('span');
            line.classList.remove('scale-x-100');
        });
    });

    // =====================
    // GALLERY SHOWCASE
    // =====================

    function initializeGallery() {
        const galleryItems = document.querySelectorAll('#gallery-showcase .group');

        galleryItems.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 30,
                delay: index * 0.1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            item.addEventListener('mouseenter', () => {
                const img = item.querySelector('img');
                if (img) {
                    gsap.to(img, {
                        scale: 1.1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }

                const overlay = item.querySelector('div');
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                const img = item.querySelector('img');
                if (img) {
                    gsap.to(img, {
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }

                const overlay = item.querySelector('div');
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3
                    });
                }
            });
        });

        const quoteElement = document.querySelector("#gallery-showcase h2");
        if (quoteElement) {
            const lines = quoteElement.innerHTML.split('<br>');
            quoteElement.innerHTML = '';

            lines.forEach((line, i) => {
                const lineDiv = document.createElement('div');
                lineDiv.innerHTML = line;
                lineDiv.style.overflow = 'hidden';
                quoteElement.appendChild(lineDiv);

                const textContent = lineDiv.firstChild;

                gsap.from(textContent, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2 + (i * 0.3),
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: quoteElement,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    }

    function initGalleryVideo() {
        const video = document.querySelector('.item-6 .my-video');
        const unmuteBtn = document.querySelector('.unmute-btn');
        
        if (!video || !unmuteBtn) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Autoplay error:', e));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        unmuteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            unmuteBtn.textContent = video.muted ? '🔇' : '🔊';
            
            if (!video.paused) {
                video.play().catch(e => console.log('Play after unmute error:', e));
            }
        });
    }

    if (document.querySelector('#gallery-showcase')) {
        initializeGallery();
        initGalleryVideo();
    }
});

// =====================
// 2. HERO SECTION (Swiper, Animasi, Thumbnail)
// =====================

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
        init: function () {
            updateSlideInfo(this.realIndex);
            updateThumbnailActive(this.realIndex);
            adjustSlideInfoPosition();
        },
        slideChange: function () {
            updateSlideInfo(this.realIndex);
            updateThumbnailActive(this.realIndex);
        }
    }
});

function updateSlideInfo(index) {
    const slideInfo = document.querySelector('.slide-info');
    const slideTitle = slideInfo.querySelector('.slide-title');
    const slideDescription = slideInfo.querySelector('.slide-description');

    slideInfo.style.transform = 'translateY(100%)';
    slideInfo.style.opacity = '0';

    slideTitle.textContent = heroSlideInfo[index].title;
    slideDescription.textContent = heroSlideInfo[index].description;

    setTimeout(() => {
        slideInfo.style.transform = 'translateY(0)';
        slideInfo.style.opacity = '1';
    }, 100);
}

function adjustSlideInfoPosition() {
    const slideInfoContainer = document.querySelector('.slide-info').parentElement;

    function updatePosition() {
        if (window.innerWidth < 768) {
            slideInfoContainer.style.bottom = '90px';
        } else {
            slideInfoContainer.style.bottom = '50px';
        }
    }
    updatePosition();

    window.addEventListener('resize', updatePosition);
}

function updateThumbnailActive(index) {
    const thumbnails = document.querySelectorAll('.thumbnail-container');
    thumbnails.forEach((thumb, i) => {
        const border = thumb.querySelector('.border-2');
        const overlay = thumb.querySelector('.bg-black\\/20');

        if (!border || !overlay) return;

        if (i === index) {
            border.classList.remove('border-transparent');
            border.classList.add('border-white');
            overlay.classList.add('bg-black/0');
            overlay.classList.remove('bg-black/20');

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

            gsap.to(thumb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

document.querySelectorAll('.thumbnail-container').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        heroSwiper.slideTo(index);
    });

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


// =====================
// 3. STORY / DESCRIPTION SECTION
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-ready');
        scrollObserver.observe(el);
    });

    const thumbnailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const thumbnails = entry.target.querySelectorAll('.thumbnail-list img');
            if (thumbnails.length === 0) return;
            thumbnails.forEach((thumb, index) => {
                if (entry.isIntersecting) {
                    thumb.style.transition = `opacity 0.5s ease ${index * 0.1}s, border 0.3s ease`;
                    thumb.style.opacity = '1';
                    if (index === 0) {
                        thumb.style.border = '2px solid #303030';
                    }
                } else {
                    thumb.style.opacity = '0';
                    thumb.style.border = '2px solid transparent';
                    thumb.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                }
            });
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.thumbnail-container').forEach(container => {
        thumbnailObserver.observe(container);
    });

    const weeklyCards = document.querySelectorAll('.weekly-card');
    const mainCard = document.querySelector('.main-card');
    const secondaryCards = document.querySelectorAll('.secondary-card');

    const mainCardRect = mainCard.getBoundingClientRect();
    const mainCardWidth = mainCardRect.width;
    const secondaryCardRect = secondaryCards[0].getBoundingClientRect();
    const secondaryCardWidth = secondaryCardRect.width;

    const targetHeight = 500;
    weeklyCards.forEach(card => {
        const imageContainer = card.querySelector('.relative.overflow-hidden');
        card.style.height = `${targetHeight}px`;
        imageContainer.style.height = `${targetHeight * 0.7}px`;

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300';
        imageContainer.appendChild(overlay);

        const shine = document.createElement('div');
        shine.className = 'absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full';
        imageContainer.appendChild(shine);
    });

    weeklyCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        card.dataset.originalWidth = rect.width;
        card.dataset.index = index;
        card.style.position = 'relative';

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

    function handleCardHover(hoveredCard, isHovering) {
        const hoveredIndex = parseInt(hoveredCard.dataset.index);
        const moveDistance = mainCardWidth - secondaryCardWidth + 40;

        weeklyCards.forEach(card => {
            const imageContainer = card.querySelector('.relative.overflow-hidden');
            const overlay = imageContainer.querySelector('.absolute');
            const shine = imageContainer.querySelectorAll('.absolute')[1];
            const textContainer = card.querySelector('.py-6');
            const title = textContainer.querySelector('h3');
            const category = textContainer.querySelector('.text-sm');

            const isMainCard = card.classList.contains('main-card');
            const cardIndex = parseInt(card.dataset.index);

            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            imageContainer.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            if (isHovering) {
                if (isMainCard) {
                    card.style.width = `${secondaryCardWidth}px`;
                    imageContainer.style.aspectRatio = '2/3';
                    card.style.transform = 'none';
                    card.style.zIndex = '1';
                    overlay.style.opacity = '0';
                } else if (card === hoveredCard) {
                    card.style.width = `${mainCardWidth}px`;
                    imageContainer.style.aspectRatio = '3/2';

                    if (cardIndex === 1) {
                        card.style.transform = `translateX(-${moveDistance}px) scale(1.02)`;
                    } else {
                        card.style.transform = `translateX(-${moveDistance}px) scale(1.02)`;
                    }

                    card.style.zIndex = '10';
                    overlay.style.opacity = '1';

                    title.style.transform = 'translateY(-5px)';
                    title.style.color = '#000';
                    category.style.transform = 'translateX(5px)';

                    shine.style.transition = 'transform 0.8s ease';
                    shine.style.transform = 'translateX(100%)';
                } else {
                    card.style.width = `${secondaryCardWidth}px`;
                    imageContainer.style.aspectRatio = '2/3';

                    if (cardIndex === 2 && hoveredIndex === 1) {
                        const card2Width = mainCardWidth - secondaryCardWidth;
                        card.style.transform = `translateX(-${moveDistance - card2Width / 2}px)`;
                    } else {
                        card.style.transform = `translateX(-${moveDistance}px)`;
                    }

                    card.style.zIndex = '1';
                    overlay.style.opacity = '0';
                }
            } else {
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

                title.style.transform = 'none';
                title.style.color = '';
                category.style.transform = 'none';

                shine.style.transform = '-translateX(-100%)';
            }
        });
    }

    weeklyCards.forEach(card => {
        card.addEventListener('mouseenter', () => handleCardHover(card, true));
        card.addEventListener('mouseleave', () => handleCardHover(card, false));

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

        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('img');
            image.style.transform = 'none';
        });
    });
});

// =====================
// 4. VISION SECTION
// =====================

document.addEventListener('DOMContentLoaded', function () {
    const visionSlides = document.querySelectorAll('.vision-slide');
    const visionQuotes = document.querySelectorAll('.vision-quote');
    const visionDots = document.querySelectorAll('.vision-dot');
    const prevButton = document.querySelector('.vision-prev');
    const nextButton = document.querySelector('.vision-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
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

    showSlide(currentSlide);

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    startSlideInterval();

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

    const visionStats = document.querySelectorAll('.vision-stat');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        visionStats.forEach(stat => {
            const numberElement = stat.querySelector('.text-4xl');
            const targetNumber = parseInt(numberElement.textContent);
            let currentNumber = 0;
            const duration = 2000;
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

// =====================
// 5. WEEKLY PICKS SECTION (New Interactive Version)
// =====================

document.addEventListener('DOMContentLoaded', function () {
    const weeklyPicksContainer = document.querySelector('.weekly-picks-container');
    if (!weeklyPicksContainer) return;

    const weeklyTrack = document.querySelector('.weekly-picks-track');
    const weeklyCards = document.querySelectorAll('.weekly-card');
    const weeklyDots = document.querySelectorAll('.weekly-dot');
    const prevBtn = document.querySelector('.weekly-nav-btn.prev');
    const nextBtn = document.querySelector('.weekly-nav-btn.next');
    const filterBtns = document.querySelectorAll('.weekly-filter-btn');

    let currentIndex = 0;
    let cardWidth = 0;
    let slideInterval;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function initializeWeeklyPicks() {
        updateCardWidth();

        showCard(currentIndex);

        if (window.innerWidth >= 1024) {
            startAutoplay();
        }

        setupEventListeners();

        initializeFilters();
    }

    function updateCardWidth() {
        if (window.innerWidth >= 1024) {
            cardWidth = weeklyPicksContainer.offsetWidth;
        } else if (window.innerWidth >= 768) {
            cardWidth = weeklyPicksContainer.offsetWidth * 0.8;
        } else {
            cardWidth = weeklyPicksContainer.offsetWidth;
        }
    }

    function showCard(index, animate = true) {
        if (isAnimating) return;

        currentIndex = index;

        const position = -index * cardWidth;

        if (animate) {
            isAnimating = true;
            weeklyTrack.style.transition = 'transform 500ms ease-out';
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            weeklyTrack.style.transition = 'none';
        }

        weeklyTrack.style.transform = `translateX(${position}px)`;

        updateDots();
    }

    function updateDots() {
        weeklyDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('bg-primary');
                dot.classList.remove('bg-gray-200');
                dot.style.width = '32px';
            } else {
                dot.classList.remove('bg-primary');
                dot.classList.add('bg-gray-200');
                dot.style.width = '8px';
            }
        });
    }

    function nextSlide() {
        if (isAnimating) return;

        const nextIndex = (currentIndex + 1) % weeklyCards.length;
        showCard(nextIndex);
    }

    function prevSlide() {
        if (isAnimating) return;

        const prevIndex = (currentIndex - 1 + weeklyCards.length) % weeklyCards.length;
        showCard(prevIndex);
    }

    function startAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
    }

    function handleTouchMove(e) {
        if (!touchStartX) return;

        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        const offset = -currentIndex * cardWidth - diff;

        weeklyTrack.style.transition = 'none';
        weeklyTrack.style.transform = `translateX(${offset}px)`;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;

        const diff = touchStartX - touchEndX;
        const threshold = cardWidth * 0.2;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            showCard(currentIndex);
        }

        touchStartX = 0;
        touchEndX = 0;

        if (window.innerWidth >= 1024) {
            startAutoplay();
        }
    }

    function setupEventListeners() {
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
        });

        weeklyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showCard(index);
                stopAutoplay();
            });
        });

        weeklyPicksContainer.addEventListener('touchstart', handleTouchStart);
        weeklyPicksContainer.addEventListener('touchmove', handleTouchMove);
        weeklyPicksContainer.addEventListener('touchend', handleTouchEnd);

        weeklyPicksContainer.addEventListener('mouseenter', () => {
            stopAutoplay();
        });

        weeklyPicksContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                startAutoplay();
            }
        });

        window.addEventListener('resize', () => {
            updateCardWidth();
            showCard(currentIndex, false);
        });
    }

    function initializeFilters() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(button => {
                    if (button.querySelector('span:first-child')) {
                        button.querySelector('span:first-child').classList.remove('scale-x-100');
                        button.querySelector('span:first-child').classList.add('scale-x-0');
                        button.querySelector('span:last-child').classList.remove('text-primary');
                        button.querySelector('span:last-child').classList.add('text-gray-500');
                    }

                    if (button.classList.contains('snap-start')) {
                        button.classList.remove('bg-primary', 'text-white');
                        button.classList.add('bg-gray-100', 'text-secondary');
                    }

                    button.classList.remove('active');
                });

                btn.classList.add('active');

                if (btn.querySelector('span:first-child')) {
                    btn.querySelector('span:first-child').classList.add('scale-x-100');
                    btn.querySelector('span:first-child').classList.remove('scale-x-0');
                    btn.querySelector('span:last-child').classList.add('text-primary');
                    btn.querySelector('span:last-child').classList.remove('text-gray-500');
                }

                if (btn.classList.contains('snap-start')) {
                    btn.classList.add('bg-primary', 'text-white');
                    btn.classList.remove('bg-gray-100', 'text-secondary');
                }

                const category = btn.dataset.category;
                filterCards(category);
            });
        });
    }

    function filterCards(category) {
        currentIndex = 0;

        let visibleCount = 0;
        let visibleCards = [];

        if (category === 'all') {
            weeklyCards.forEach(card => {
                card.style.display = '';
                visibleCount++;
                visibleCards.push(card);
            });
        } else {
            weeklyCards.forEach(card => {
                if (card.dataset.category === category) {
                    card.style.display = '';
                    visibleCount++;
                    visibleCards.push(card);
                } else {
                    card.style.display = 'none';
                }
            });
        }

        const dotsContainer = document.querySelector('.weekly-picks-container .flex.justify-center');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';

            visibleCards.forEach((card, index) => {
                const dot = document.createElement('button');
                dot.className = `weekly-dot w-8 h-1 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-200'} transition-all duration-300`;
                dot.dataset.index = index;

                dot.addEventListener('click', () => {
                    showCard(index);
                    stopAutoplay();
                });

                dotsContainer.appendChild(dot);
            });
        }

        showCard(0, true);

        updateFilterButtonsForCategory(category);
    }

    function updateFilterButtonsForCategory(category) {
        const desktopButtons = document.querySelectorAll('.weekly-filter-btn:not(.snap-start)');
        desktopButtons.forEach(btn => {
            const btnCategory = btn.dataset.category;
            const lineElement = btn.querySelector('span:first-child');
            const textElement = btn.querySelector('span:last-child');

            if (btnCategory === category) {
                btn.classList.add('active');
                if (lineElement) {
                    lineElement.classList.add('scale-x-100');
                    lineElement.classList.remove('scale-x-0');
                }
                if (textElement) {
                    textElement.classList.add('text-primary');
                    textElement.classList.remove('text-gray-500');
                }
            } else {
                btn.classList.remove('active');
                if (lineElement) {
                    lineElement.classList.remove('scale-x-100');
                    lineElement.classList.add('scale-x-0');
                }
                if (textElement) {
                    textElement.classList.remove('text-primary');
                    textElement.classList.add('text-gray-500');
                }
            }
        });


        const mobileButtons = document.querySelectorAll('.weekly-filter-btn.snap-start');
        mobileButtons.forEach(btn => {
            const btnCategory = btn.dataset.category;

            if (btnCategory === category) {
                btn.classList.add('bg-primary', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-secondary');
            } else {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-100', 'text-secondary');
            }
        });
    }

    function showCardWithCategory(category) {

        let targetIndex = 0;
        weeklyCards.forEach((card, index) => {
            if (card.dataset.category === category) {
                targetIndex = index;
                return;
            }
        });


        updateFilterButtonsForCategory(category);


        showCard(targetIndex);
    }


    function updateCategoryOnSlide(index) {
        const currentCard = weeklyCards[index];
        if (!currentCard) return;

        const category = currentCard.dataset.category;
        if (category) {

            updateFilterButtonsForCategory(category);
        }
    }


    const originalShowCard = showCard;
    showCard = function (index, animate = true) {
        originalShowCard(index, animate);
        updateCategoryOnSlide(index);
    };


    initializeWeeklyPicks();
});

// =====================
// 6. COLLECTION SECTION (Slider)
// =====================

document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    const slideTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!sliderContainer || !slideTrack || slides.length === 0) return;


    const slideSpeed = 1; 
    const pauseDuration = 1000; 
    const transitionSpeed = 0.3; 
    

    let animationId;
    let isPaused = false;
    let currentPosition = 0;
    let targetPosition = 0;
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight || 0);
    let isTransitioning = false;
    let pauseTimeout;
    let isAnimating = true;
    const slidesToClone = 1; 
    
    for (let i = 0; i < slidesToClone; i++) {
        const firstClone = slides[i].cloneNode(true);
        const lastClone = slides[slides.length - 1 - i].cloneNode(true);
        slideTrack.appendChild(firstClone);
        slideTrack.insertBefore(lastClone, slides[0]);
    }
    
    currentPosition = slidesToClone * slideWidth;
    slideTrack.style.transform = `translateX(-${currentPosition}px)`;
    
    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'bg-primary');
            dot.classList.add('bg-gray-300');
            
            if (i === index) {
                dot.classList.add('active', 'bg-primary');
                dot.classList.remove('bg-gray-300');
            }
        });
    }
    
    
    function animateSlide() {
        if (!isAnimating) {
            cancelAnimationFrame(animationId);
            return;
        }
        
        if (isPaused) {
            animationId = requestAnimationFrame(animateSlide);
            return;
        }
        
        if (isTransitioning) {
            animationId = requestAnimationFrame(animateSlide);
            return;
        }
        
        if (Math.abs(currentPosition - targetPosition) < 1) {
            isTransitioning = true;
            
            clearTimeout(pauseTimeout);
            pauseTimeout = setTimeout(() => {
                targetPosition = currentPosition + slideWidth;
                currentIndex = (currentIndex + 1) % slides.length;
                
                updateActiveDot(currentIndex);
                
                if (currentIndex === 0) {
                    const totalWidth = slides.length * slideWidth;
                    slideTrack.style.transition = `transform ${transitionSpeed}s ease`;
                    slideTrack.style.transform = `translateX(-${currentPosition + slideWidth}px)`;
                    
                    setTimeout(() => {
                        slideTrack.style.transition = 'none';
                        currentPosition = slidesToClone * slideWidth;
                        targetPosition = currentPosition;
                        slideTrack.style.transform = `translateX(-${currentPosition}px)`;
                        isTransitioning = false;
                    }, transitionSpeed * 1000);
                } else {
                    isTransitioning = false;
                }
            }, pauseDuration);
        } else {
            currentPosition += slideSpeed;
            slideTrack.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        if (isAnimating) {
            animationId = requestAnimationFrame(animateSlide);
        }
    }
    
    function slideToIndex(index, animate = true) {
        cancelAnimationFrame(animationId);
        clearTimeout(pauseTimeout);
        
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        updateActiveDot(currentIndex);
        
        const newPosition = (slidesToClone + currentIndex) * slideWidth;
        
        if (animate) {
            slideTrack.style.transition = `transform ${transitionSpeed}s ease`;
            slideTrack.style.transform = `translateX(-${newPosition}px)`;
            
            setTimeout(() => {
                slideTrack.style.transition = 'none';
                currentPosition = newPosition;
                targetPosition = newPosition;
                isPaused = false;
                isTransitioning = false;
                isAnimating = true;
                animateSlide();
            }, transitionSpeed * 1000);
        } else {
            slideTrack.style.transition = 'none';
            slideTrack.style.transform = `translateX(-${newPosition}px)`;
            currentPosition = newPosition;
            targetPosition = newPosition;
            
            isPaused = false;
            isTransitioning = false;
            isAnimating = true;
            animateSlide();
        }
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideToIndex(index);
        });
    });
    
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slideToIndex(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slideToIndex(currentIndex + 1);
        });
    }
    
    sliderContainer.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isAnimating = false;
            cancelAnimationFrame(animationId);
        } else {
            isAnimating = true;
            animateSlide();
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        cancelAnimationFrame(animationId);
        
        resizeTimer = setTimeout(() => {
            slideWidth = slides[0].offsetWidth + parseInt(window.getComputedStyle(slides[0]).marginRight || 0);
            slideToIndex(currentIndex, false);
        }, 250);
    });
    
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating) {
                    isAnimating = true;
                    animateSlide();
                }
            } else {
                isAnimating = false;
                cancelAnimationFrame(animationId);
            }
        });
    }, { threshold: 0.1 });
    
    sliderObserver.observe(sliderContainer);
    
    updateActiveDot(0);
    animateSlide();
});

// =====================
// 7. MODAL PRODUK
// =====================

// Product Quick View Modal
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('product-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');

    quickViewBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    if (modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// =====================
// 8. GLOBAL (Cursor, Smooth Scroll, AOS, dsb)
// =====================

// Cursor Effect, Smooth Scroll, AOS, dsb

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

if (typeof rotationInterval !== 'undefined') {
    clearInterval(rotationInterval);
}

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const yOffset = -80;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    });
});

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

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        gsap.to('.parallax', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out"
        });
    }
});

// =====================
// 9. FIND YOUR STYLE QUIZ SECTION
// =====================

// STYLE QUIZ FUNCTIONALITY

document.addEventListener('DOMContentLoaded', function () {
    const quizModal = document.getElementById('style-quiz-modal');
    const quizContent = document.getElementById('style-quiz-content');
    const quizBackdrop = document.getElementById('style-quiz-backdrop');
    const openQuizBtn = document.getElementById('open-style-quiz');
    const closeQuizBtn = document.getElementById('close-style-quiz');
    const tryAgainBtns = document.querySelectorAll('#try-again-btn, #try-again-btn-2');
    const progressBar = document.getElementById('quiz-progress');

    let currentStep = 1;
    let answers = {
        step1: '',
        step2: '',
        step3: ''
    };

    function openQuiz() {
        quizModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            quizBackdrop.classList.add('opacity-100');
        }, 50);

        setTimeout(() => {
            quizContent.classList.remove('scale-95', 'opacity-0');
            quizContent.classList.add('scale-100', 'opacity-100');
        }, 150);
    }

    function closeQuiz() {
        quizContent.classList.add('scale-95', 'opacity-0');
        quizContent.classList.remove('scale-100', 'opacity-100');

        quizBackdrop.classList.remove('opacity-100');

        setTimeout(() => {
            quizModal.classList.add('hidden');
            document.body.style.overflow = '';
            resetQuiz();
        }, 300);
    }

    function resetQuiz() {
        currentStep = 1;
        answers = {
            step1: '',
            step2: '',
            step3: ''
        };

        document.querySelectorAll('#quiz-step-1, #quiz-step-2, #quiz-step-3, #quiz-result').forEach(step => {
            step.classList.add('hidden');
        });
        document.getElementById('quiz-step-1').classList.remove('hidden');

        progressBar.style.width = '33.33%';

        document.querySelectorAll('#result-clean, #result-bold').forEach(result => {
            result.classList.add('hidden');
        });
    }

    function handleAnswer(step, value) {
        answers[`step${step}`] = value;

        if (step < 3) {
            document.getElementById(`quiz-step-${step}`).classList.add('hidden');
            document.getElementById(`quiz-step-${step + 1}`).classList.remove('hidden');

            progressBar.style.width = `${(step + 1) * 33.33}%`;

            currentStep++;
        } else {
            showQuizResult();
        }
    }

    function showQuizResult() {
        document.getElementById('quiz-step-3').classList.add('hidden');

        const resultContainer = document.getElementById('quiz-result');
        resultContainer.classList.remove('hidden');

        const cleanAnswers = ['A', 'A', 'A']; 
        const userAnswers = [answers.step1, answers.step2, answers.step3];

        const matchingAnswers = userAnswers.filter((answer, index) => answer === cleanAnswers[index]).length;

        if (matchingAnswers >= 2) {
            document.getElementById('result-clean').classList.remove('hidden');
        } else {
            document.getElementById('result-bold').classList.remove('hidden');
        }

        gsap.from('#quiz-result .group', {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    if (openQuizBtn) {
        openQuizBtn.addEventListener('click', openQuiz);
    }

    if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', closeQuiz);
    }

    quizBackdrop.addEventListener('click', closeQuiz);

    tryAgainBtns.forEach(btn => {
        btn.addEventListener('click', resetQuiz);
    });

    document.querySelectorAll('.quiz-answer').forEach(button => {
        button.addEventListener('click', function () {
            const step = parseInt(this.dataset.step);
            const value = this.dataset.value;
            handleAnswer(step, value);
        });
    });
});

// =====================
// CONTACT FORM
// =====================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        // Buat elemen pop-up
        const popupOverlay = document.createElement('div');
        popupOverlay.classList.add('popup-overlay');
        popupOverlay.style.display = 'none';
        
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        
        const popupMessage = document.createElement('div');
        popupMessage.classList.add('popup-message');
        
        const popupCloseBtn = document.createElement('button');
        popupCloseBtn.classList.add('popup-close-btn');
        popupCloseBtn.innerHTML = '&times;';
        
        popupContent.appendChild(popupCloseBtn);
        popupContent.appendChild(popupMessage);
        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);
        function showPopup(message, isSuccess = true) {
            popupMessage.innerHTML = message;
            popupContent.className = 'popup-content';
            popupContent.classList.add(isSuccess ? 'success' : 'error');
            popupOverlay.style.display = 'flex';
            gsap.fromTo(popupContent, 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
            );

            if (isSuccess) {
                setTimeout(() => {
                    closePopup();
                }, 5000);
            }
        }
        
        function closePopup() {
            gsap.to(popupContent, {
                scale: 0.8,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    popupOverlay.style.display = 'none';
                }
            });
        }
        
        popupCloseBtn.addEventListener('click', closePopup);
        
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            if (!nameInput.value.trim()) {
                showPopup('Mohon masukkan nama Anda', false);
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim()) {
                showPopup('Mohon masukkan email Anda', false);
                emailInput.focus();
                return;
            }
            
            if (!validateEmail(emailInput.value.trim())) {
                showPopup('Mohon masukkan email yang valid', false);
                emailInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                showPopup('Mohon masukkan pesan Anda', false);
                messageInput.focus();
                return;
            }

            setTimeout(() => {
                showPopup('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', true);
                contactForm.reset();
            }, 1000);
        });
        
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
});

// =====================
// END OF FILE
// =====================