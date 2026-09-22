/* =========================================
   shifa — Personal Portfolio
   Simple JavaScript for beginners
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Mobile Navigation ---------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close mobile menu when a navigation link is selected
        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        // Close the menu if the user taps outside it
        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }


    /* ---------- Active Navigation Highlighting ---------- */

    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.getAttribute("id");

                    navigationLinks.forEach((link) => {
                        const linkSection =
                            link.getAttribute("href").substring(1);

                        link.classList.toggle(
                            "active",
                            linkSection === currentSection
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* ---------- Scroll Reveal ---------- */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".education-card, " +
        ".interest-card, " +
        ".strength-card, " +
        ".career-content, " +
        ".contact-card"
    );

    // Add a class only when JavaScript is available.
    // The website remains fully visible if JavaScript is disabled.
    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* ---------- Back to Top ---------- */

    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.setAttribute("title", "Back to top");
    backToTop.textContent = "↑";

    document.body.appendChild(backToTop);

    window.addEventListener(
        "scroll",
        () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        },
        { passive: true }
    );

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
