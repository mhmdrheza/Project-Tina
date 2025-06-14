gsap.to('.background', {
    scrollTrigger: {
        scrub: 1
    },
    y: -200
});

gsap.from('.title', {
    scrollTrigger: {
        scrub: 1
    },
    y: 100,
    opacity: 0
});

gsap.from('.character', {
    scrollTrigger: {
        scrub: 1
    },
    y: 50
});

gsap.to('.title-image', {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut"
});

document.addEventListener("DOMContentLoaded", function () {
    const text = `Hang Tight! \n This Website is still <br> Under Development\n <br> Your beloved boyfriend`;

    let index = 0;
    const speed = 150; // Typing speed in milliseconds
    const descriptionElement = document.querySelector(".description");

    function typeText() {
        if (index < text.length) {
            descriptionElement.innerHTML = text.substring(0, index) + '<span class="blinking-cursor"></span>';
            index++;
            setTimeout(typeText, speed);
        } else {
            descriptionElement.innerHTML = text + '<span class="blinking-cursor"></span>';
        }
    }

    typeText(); // Start typing effect
});

document.addEventListener("DOMContentLoaded", function () {
    const dates = {
        sinceMet: new Date("August 28, 2022 00:00:00"),
        afterHeart: new Date("February 8, 2025 00:00:00")
    };

    function updateClock() {
        const now = new Date();

        function getElapsedTime(startDate) {
            const elapsed = now - startDate;
            const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
            const seconds = Math.floor((elapsed / 1000) % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        document.getElementById("sinceMet").innerText = getElapsedTime(dates.sinceMet);
        document.getElementById("afterHeart").innerText = getElapsedTime(dates.afterHeart);
    }

    setInterval(updateClock, 1000); // Update every second
    updateClock(); // Initial call
});
