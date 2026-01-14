// ========================================
// CODE EDITOR INSPIRED PORTFOLIO
// Smooth Interactions & Navigation
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('.section');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.borderBottomColor = 'transparent';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.borderBottomColor = '#569cd6';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Add typing cursor effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Store original text
        const originalText = heroTitle.textContent;

        // Add subtle fade-in on load
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.5s ease';
            heroTitle.style.opacity = '1';
        }, 100);
    }

    // Console easter egg for recruiters
    console.log('%c> Developer Portfolio', 'color: #569cd6; font-family: JetBrains Mono, monospace; font-size: 16px; font-weight: bold;');
    console.log('%cconst skills = ["MongoDB", "Express.js", "React.js", "Node.js"];', 'color: #9cdcfe; font-family: JetBrains Mono, monospace;');
    console.log('%cconsole.log("Thanks for checking out my portfolio!");', 'color: #dcdcaa; font-family: JetBrains Mono, monospace;');

    // Modal Logic
    const modal = document.getElementById("achievement-modal");
    const closeBtn = document.querySelector(".close-button");
    const modalTitle = document.getElementById("modal-title");
    const modalCompany = document.getElementById("modal-company");
    const modalBody = document.getElementById("modal-body");

    // Open Modal
    document.querySelectorAll(".view-details-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const item = this.closest(".experience-item");
            const title = item.querySelector(".job-title").textContent;
            const company = item.querySelector(".company-name").textContent;
            const details = item.querySelector(".responsibilities-list").innerHTML;

            modalTitle.textContent = title;
            modalCompany.textContent = company;
            modalBody.innerHTML = `<ul>${details}</ul>`;

            modal.style.display = "block";
        });
    });

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });




    // Gallery Modal Logic
    const galleryModal = document.getElementById("gallery-modal");
    const galleryCloseBtn = document.querySelector(".gallery-close");
    const galleryTitle = document.getElementById("gallery-title");
    const galleryImage = document.getElementById("gallery-image");
    const galleryIndicator = document.getElementById("gallery-indicator");

    // Navigation Buttons
    const prevBtn = document.querySelector(".gallery-nav.prev-btn");
    const nextBtn = document.querySelector(".gallery-nav.next-btn");

    // Achievement Images Data (Real Images)
    const galleryImages = {
        "hackathon1": [
            "Images/1st Place - IntraCoIIege Project Hackathon (1).jpg",
            "Images/1st Place - IntraCoIIege Project Hackathon (2).jpg"
        ],
        "codewar": [
            "Images/1st Place - Codewar 2.0 (1).jpg",
            "Images/1st Place - Codewar 2.0 (2).jpg"
        ],
        "hackathon2": [
            "Images/2nd Place - IntraCollege Coding Hackathon (1).jpg",
            "Images/2nd Place - IntraCollege Coding Hackathon (2).jpg"
        ],
        "fiascode": [
            "Images/3rd Place - FIASCOde 2.0 (1).jpg",
            "Images/3rd Place - FIASCOde 2.0 (2).jpg"
        ]
    };

    let currentGalleryKey = "";
    let currentImageIndex = 0;
    let slideInterval;

    // Function to update gallery image
    function updateGalleryImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;

        const images = galleryImages[currentGalleryKey];
        galleryImage.style.opacity = '0';

        setTimeout(() => {
            galleryImage.src = images[currentImageIndex];
            galleryIndicator.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
            galleryImage.style.opacity = '1';
        }, 200); // Short fade effect
    }

    // Function to show next image (Modified to not loop reset)
    function showNextImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;
        const images = galleryImages[currentGalleryKey];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
        resetSlideshow();
    }

    // Function to show previous image
    function showPrevImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;
        const images = galleryImages[currentGalleryKey];
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
        resetSlideshow();
    }

    // Open Gallery
    document.querySelectorAll(".view-gallery-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const key = this.getAttribute("data-gallery");

            if (key && galleryImages[key]) {
                currentGalleryKey = key;
                currentImageIndex = 0;

                // Set initial image
                updateGalleryImage();

                // Update title
                const itemTitle = this.closest(".experience-item").querySelector(".job-title").textContent;
                galleryTitle.textContent = itemTitle + " Gallery";

                galleryModal.style.display = "block";

                // Disable background scroll
                document.body.classList.add("no-scroll");

                // Start generic slideshow
                startSlideshow();
            }
        });
    });

    // Start Slideshow
    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (!currentGalleryKey) return;
            const images = galleryImages[currentGalleryKey];
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateGalleryImage();
        }, 8000);
    }

    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Close Gallery
    function closeGallery() {
        galleryModal.style.display = "none";
        document.body.classList.remove("no-scroll");
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener("click", closeGallery);
    }

    // Navigation Button Listeners
    if (prevBtn) prevBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing modal
        showPrevImage();
    });

    if (nextBtn) nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing modal
        showNextImage();
    });

    // Close on click outside
    window.addEventListener("click", function (e) {
        if (e.target == galleryModal) {
            closeGallery();
        }
    });

    // Keyboard Navigation
    document.addEventListener("keydown", function (e) {
        if (galleryModal.style.display === "block") {
            if (e.key === "Escape") {
                closeGallery();
            } else if (e.key === "ArrowRight") {
                showNextImage();
            } else if (e.key === "ArrowLeft") {
                showPrevImage();
            }
        }
    });

});
