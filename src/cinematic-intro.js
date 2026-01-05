
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const introName = document.getElementById('intro-name');
    const introRole = document.getElementById('intro-role');
    const introPhoto = document.getElementById('intro-photo');
    const introPhotoInner = document.getElementById('intro-photo-inner');
    const heroImg = document.getElementById('hero-img');

    const nameText = "Udhaya Kumar Sekar";

    if (!overlay || !introName || !introPhoto || !heroImg) return;

    // 1. Prepare Text: Split into spans
    // introName.innerHTML = nameText.split('').map(char => {
    // if (char === ' ') return '<span class="inline-block w-2 md:w-4"></span>'; // Handle space
    // return `<span class="inline-block opacity-0 transform-style-3d origin-center filter drop-shadow-lg">${char}</span>`;
    // }).join('');

    introName.innerHTML = "";

    [...nameText].forEach(char => {
        const span = document.createElement("span");

        if (char === " ") {
            span.innerHTML = "&nbsp;";
            span.style.width = "0.5rem";
        } else {
            span.textContent = char;
        }

        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(40px) scale(0.8)";
        span.style.transition = "all 0.6s ease-out";
        // span.style.filter = "drop-shadow(0 0 10px rgba(168,85,247,0.6))";
        span.style.backgroundImage =
            "linear-gradient(90deg, #60a5fa, #a855f7, #ec4899)";
        span.style.webkitBackgroundClip = "text";
        span.style.backgroundClip = "text";
        span.style.color = "transparent";
        span.style.filter = "drop-shadow(0 0 12px rgba(168,85,247,0.7))";


        introName.appendChild(span);
    });

    const letters = introName.querySelectorAll('span');

    // Hide hero image initially
    heroImg.style.opacity = '0';

    // 2. Start Animation Sequence
    /*
        // Step 1: Letter Jump In (Staggered)
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.remove('opacity-0'); // Remove initial hide to allow animation to take over
                letter.classList.add('animate-letter-jump');
                // Random slight rotation for more "motion"
                const randomRot = Math.random() * 10 - 5;
                letter.style.transform = `translateY(0) rotate(${randomRot}deg) scale(1.25)`;
            }, index * 60); // Faster stagger for longer name
        });
    */

    // const letters = introName.querySelectorAll("span");

    letters.forEach((letter, index) => {
        setTimeout(() => {
            const randomRot = Math.random() * 6 - 3;
            letter.style.opacity = "1";
            letter.style.transform = `translateY(0) rotate(${randomRot}deg) scale(1.25)`;
        }, index * 70);
    });

    // Step 2: Show Role Title (After name)
    const roleRevealTime = (nameText.length * 60) + 200;
    setTimeout(() => {
        if (introRole) {
            introRole.classList.remove('opacity-0', 'translate-y-4');
            introRole.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700', 'ease-out');
        }
    }, roleRevealTime);

    // Step 3: Show Photo Next to Name (Shortly after role or with it)
    const photoRevealTime = roleRevealTime + 400;
    setTimeout(() => {
        introPhoto.classList.remove('opacity-0', 'scale-50');
        introPhoto.classList.add('opacity-100', 'scale-100');
        introPhoto.style.transform += ' translateX(-20px)';

    }, photoRevealTime);

    // Step 4: The "FLIP" Move to Hero Position
    const moveStartTime = photoRevealTime + 2200; // Hold for ~2s to read name/role
    setTimeout(() => {
        const startRect = introPhotoInner.getBoundingClientRect();
        const endRect = heroImg.getBoundingClientRect();

        // Fade out text elements
        introName.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        introName.style.opacity = '0';
        introName.style.transform = 'translateX(-50px)';

        if (introRole) {
            introRole.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            introRole.style.opacity = '0';
            introRole.style.transform = 'translateY(20px)';
        }

        overlay.style.backgroundColor = 'transparent';
        const glow = introPhoto.querySelector('.animate-pulse-slow');
        if (glow) glow.style.opacity = '0';

        // Set Fixed Position
        introPhoto.style.position = 'fixed';
        introPhoto.style.top = `${startRect.top}px`;
        introPhoto.style.left = `${startRect.left}px`;
        introPhoto.style.width = `${startRect.width}px`;
        introPhoto.style.height = `${startRect.height}px`;
        introPhoto.style.margin = '0';
        introPhoto.style.zIndex = '1000';
        introPhoto.classList.remove('flex', 'items-center', 'justify-center');

        void introPhoto.offsetWidth; // Force reflow

        // Animate to End Position
        introPhoto.style.transition = 'all 1.2s cubic-bezier(0.5, 0, 0, 1)';
        introPhoto.style.top = `${endRect.top}px`;
        introPhoto.style.left = `${endRect.left}px`;
        introPhoto.style.width = `${endRect.width}px`;
        introPhoto.style.height = `${endRect.height}px`;

        introPhotoInner.style.transition = 'border-radius 1.2s cubic-bezier(0.5, 0, 0, 1)';
        introPhotoInner.style.borderRadius = '2.5rem';
        introPhotoInner.className = "w-full h-full overflow-hidden border-2 border-white/20 shadow-2xl relative z-10 bg-dark-800";

        // Final Swap
        setTimeout(() => {
            heroImg.style.opacity = '1';
            overlay.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
            introPhoto.remove();
        }, 1200);

    }, moveStartTime);
});
