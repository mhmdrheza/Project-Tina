document.addEventListener("DOMContentLoaded", () => {
    const scrollButton = document.querySelector("[data-scroll-target]");
    const dates = {
        sinceMet: new Date("2022-08-28T00:00:00"),
        afterHeart: new Date("2025-02-08T00:00:00")
    };

    if (scrollButton) {
        scrollButton.addEventListener("click", () => {
            const targetSelector = scrollButton.getAttribute("data-scroll-target");
            const target = targetSelector ? document.querySelector(targetSelector) : null;

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    const getElapsedTime = (startDate) => {
        const elapsed = Date.now() - startDate.getTime();
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        const seconds = Math.floor((elapsed / 1000) % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const updateClock = () => {
        const sinceMet = document.getElementById("sinceMet");
        const afterHeart = document.getElementById("afterHeart");

        if (sinceMet) {
            sinceMet.textContent = getElapsedTime(dates.sinceMet);
        }

        if (afterHeart) {
            afterHeart.textContent = getElapsedTime(dates.afterHeart);
        }
    };

    window.setInterval(updateClock, 1000);
    updateClock();

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".hero-background", {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-panel",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.from(".quote-container", {
            x: -30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(".hero-art", {
            y: 35,
            opacity: 0,
            duration: 1.1,
            ease: "power2.out",
            delay: 0.1
        });

        gsap.to(".title-image", {
            y: -12,
            repeat: -1,
            yoyo: true,
            duration: 2.4,
            ease: "sine.inOut"
        });

        gsap.to(".transition-clouds", {
            y: -8,
            repeat: -1,
            yoyo: true,
            duration: 3.1,
            ease: "sine.inOut"
        });

        gsap.to(".scroll-indicator", {
            y: 8,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut"
        });

        gsap.from(".story-content", {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".story-panel",
                start: "top 75%"
            }
        });

        gsap.from(".story-card", {
            y: 28,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".story-grid",
                start: "top 82%"
            }
        });
    }
});
