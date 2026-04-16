document.addEventListener("DOMContentLoaded", () => {
    const scrollButtons = document.querySelectorAll("[data-scroll-target]");
    const dates = {
        sinceMet: new Date("2022-08-28T00:00:00"),
        afterHeart: new Date("2025-02-08T00:00:00")
    };

    if (scrollButtons.length) {
        scrollButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetSelector = button.getAttribute("data-scroll-target");
                const target = targetSelector ? document.querySelector(targetSelector) : null;

                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
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

    const gameCard = document.querySelector(".game-card");

    if (gameCard) {
        const requiredGood = Number(gameCard.getAttribute("data-required-good") || "9");
        const chips = Array.from(gameCard.querySelectorAll(".game-chip"));
        const progress = gameCard.querySelector(".game-progress");
        const feedback = gameCard.querySelector(".game-feedback");
        const continueButton = gameCard.querySelector(".game-continue");
        const wrongMessages = ["Whoops", "Nope", "Not that one", "Try again"];
        let feedbackTimeoutId = 0;

        const updateGameState = () => {
            const selectedCount = chips.filter((chip) => chip.dataset.good === "true" && chip.classList.contains("is-selected")).length;

            if (progress) {
                progress.textContent = `${selectedCount} / ${requiredGood}`;
            }

            const isComplete = selectedCount >= requiredGood;
            gameCard.classList.toggle("is-complete", isComplete);

            if (continueButton) {
                continueButton.disabled = !isComplete;
            }
        };

        const showFeedback = (message) => {
            if (!feedback) {
                return;
            }

            window.clearTimeout(feedbackTimeoutId);
            feedback.textContent = message;
            feedbackTimeoutId = window.setTimeout(() => {
                feedback.textContent = "";
            }, 900);
        };

        chips.forEach((chip) => {
            chip.addEventListener("click", () => {
                const isGood = chip.dataset.good === "true";

                if (!isGood) {
                    chip.classList.add("is-vanishing");
                    showFeedback(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
                    window.setTimeout(() => {
                        chip.classList.remove("is-vanishing");
                    }, 380);
                    return;
                }

                const isSelected = chip.classList.toggle("is-selected");
                chip.setAttribute("aria-pressed", String(isSelected));
                showFeedback(isSelected ? "Yes, exactly" : "");
                updateGameState();
            });
        });

        updateGameState();
    }

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

        gsap.utils.toArray(".story-content").forEach((panel) => {
            gsap.from(panel, {
                y: 55,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 78%"
                }
            });
        });

        gsap.utils.toArray(".story-grid, .spotify-highlights, .timeline-list, .promise-grid").forEach((group) => {
            const items = group.querySelectorAll(".story-card, .timeline-item");

            if (!items.length) {
                return;
            }

            gsap.from(items, {
                y: 28,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: group,
                    start: "top 82%"
                }
            });
        });

        gsap.from(".gallery-shell", {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".gallery-panel",
                start: "top 78%"
            }
        });
    }
});
