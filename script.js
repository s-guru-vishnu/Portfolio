document.addEventListener('DOMContentLoaded', function () {

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

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;

        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.5s ease';
            heroTitle.style.opacity = '1';
        }, 100);
    }

    console.log('%c> Developer Portfolio', 'color: #569cd6; font-family: JetBrains Mono, monospace; font-size: 16px; font-weight: bold;');
    console.log('%cconst skills = ["MongoDB", "Express.js", "React.js", "Node.js"];', 'color: #9cdcfe; font-family: JetBrains Mono, monospace;');
    console.log('%cconsole.log("Thanks for checking out my portfolio!");', 'color: #dcdcaa; font-family: JetBrains Mono, monospace;');

    const modal = document.getElementById("achievement-modal");
    const closeBtn = document.querySelector(".close-button");
    const modalTitle = document.getElementById("modal-title");
    const modalCompany = document.getElementById("modal-company");
    const modalBody = document.getElementById("modal-body");

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




    const galleryModal = document.getElementById("gallery-modal");
    const galleryCloseBtn = document.querySelector(".gallery-close");
    const galleryTitle = document.getElementById("gallery-title");
    const galleryImage = document.getElementById("gallery-image");
    const galleryIndicator = document.getElementById("gallery-indicator");

    const prevBtn = document.querySelector(".gallery-nav.prev-btn");
    const nextBtn = document.querySelector(".gallery-nav.next-btn");

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

    function updateGalleryImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;

        const images = galleryImages[currentGalleryKey];
        galleryImage.style.opacity = '0';

        setTimeout(() => {
            galleryImage.src = images[currentImageIndex];
            galleryIndicator.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
            galleryImage.style.opacity = '1';
        }, 200);
    }

    function showNextImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;
        const images = galleryImages[currentGalleryKey];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
        resetSlideshow();
    }

    function showPrevImage() {
        if (!currentGalleryKey || !galleryImages[currentGalleryKey]) return;
        const images = galleryImages[currentGalleryKey];
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
        resetSlideshow();
    }

    document.querySelectorAll(".view-gallery-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const key = this.getAttribute("data-gallery");

            if (key && galleryImages[key]) {
                currentGalleryKey = key;
                currentImageIndex = 0;

                updateGalleryImage();
                const itemTitle = this.closest(".experience-item").querySelector(".job-title").textContent;
                galleryTitle.textContent = itemTitle + " Gallery";

                galleryModal.style.display = "block";

                document.body.classList.add("no-scroll");

                startSlideshow();
            }
        });
    });

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

    if (prevBtn) prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showPrevImage();
    });

    if (nextBtn) nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showNextImage();
    });

    window.addEventListener("click", function (e) {
        if (e.target == galleryModal) {
            closeGallery();
        }
    });

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

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

});
