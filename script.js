(() => {
  "use strict";

  const cover = document.querySelector("#cover");
  const openButton = document.querySelector("#openInvite");
  const main = document.querySelector("#mainContent");
  const audio = document.querySelector("#bgMusic");
  const musicToggle = document.querySelector("#musicToggle");
  const musicLabel = musicToggle.querySelector(".music-label");
  const balloon = document.querySelector("#balloonPooh");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let inviteOpened = false;

  const setMusicState = (playing) => {
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    musicLabel.textContent = playing ? "Music" : "Play";
  };

  const tryPlayMusic = async () => {
    audio.volume = 0.42;
    try {
      await audio.play();
      setMusicState(true);
    } catch (_) {
      setMusicState(false);
    }
  };

  const revealInvite = () => {
    if (inviteOpened) return;
    inviteOpened = true;
    cover.classList.add("opening");
    document.body.classList.add("invite-open");
    main.removeAttribute("inert");
    main.setAttribute("aria-hidden", "false");
    tryPlayMusic();

    const delay = reducedMotion.matches ? 60 : 1320;
    window.setTimeout(() => {
      cover.classList.add("is-gone");
      document.body.classList.remove("cover-lock");
      document.querySelector("#welcome").focus?.({ preventScroll: true });
    }, delay);
  };

  openButton.addEventListener("click", revealInvite);

  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      await tryPlayMusic();
    } else {
      audio.pause();
      setMusicState(false);
    }
  });

  audio.addEventListener("pause", () => setMusicState(false));
  audio.addEventListener("play", () => setMusicState(true));

  const revealItems = [...document.querySelectorAll(".reveal")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const animatedSections = [...document.querySelectorAll("main > section")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    animatedSections.forEach((section) => section.classList.add("section-in-view"));
  } else {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("section-in-view");
      });
    }, { rootMargin: "-9% 0px -13%", threshold: 0.08 });
    animatedSections.forEach((section) => sectionObserver.observe(section));
  }

  const countdownTarget = new Date("2026-08-29T16:30:00+01:00").getTime();
  const eventEnd = new Date("2026-08-29T21:00:00+01:00").getTime();
  const timeEls = {
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    minutes: document.querySelector("#minutes"),
    seconds: document.querySelector("#seconds")
  };
  const countdownMessage = document.querySelector("#countdownMessage");

  const setTime = (key, value) => {
    const formatted = String(value).padStart(2, "0");
    if (timeEls[key].textContent === formatted) return;
    timeEls[key].textContent = formatted;
    timeEls[key].classList.remove("tick");
    void timeEls[key].offsetWidth;
    timeEls[key].classList.add("tick");
  };

  const updateCountdown = () => {
    const now = Date.now();
    let distance = Math.max(0, countdownTarget - now);
    const days = Math.floor(distance / 86400000);
    distance %= 86400000;
    const hours = Math.floor(distance / 3600000);
    distance %= 3600000;
    const minutes = Math.floor(distance / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);
    setTime("days", days);
    setTime("hours", hours);
    setTime("minutes", minutes);
    setTime("seconds", seconds);

    if (now >= countdownTarget && now <= eventEnd) {
      countdownMessage.textContent = "Today's the day!";
    } else if (now > eventEnd) {
      countdownMessage.textContent = "Thank you for celebrating with us.";
    } else {
      countdownMessage.textContent = "";
    }
  };
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  if (!reducedMotion.matches) {
    let y = 0;
    let velocity = 0;
    let pointerX = 0;
    let currentX = 0;
    let previousTime = performance.now();

    const movePointer = (event) => {
      const x = event.touches?.[0]?.clientX ?? event.clientX;
      pointerX = ((x / window.innerWidth) - 0.5) * 13;
    };
    window.addEventListener("pointermove", movePointer, { passive: true });
    window.addEventListener("touchmove", movePointer, { passive: true });

    const animateBalloon = (time) => {
      const dt = Math.min((time - previousTime) / 1000, 0.034);
      previousTime = time;
      const targetY = Math.sin(time / 1180) * 9 + Math.sin(time / 2730) * 4;
      const acceleration = (targetY - y) * 13 - velocity * 5.4;
      velocity += acceleration * dt;
      y += velocity * dt;
      currentX += (pointerX - currentX) * Math.min(1, dt * 2.2);
      balloon.style.setProperty("--spring-x", `${currentX.toFixed(2)}px`);
      balloon.style.setProperty("--spring-y", `${y.toFixed(2)}px`);
      balloon.style.setProperty("--spring-r", `${(currentX * 0.22 + velocity * 0.18).toFixed(2)}deg`);
      requestAnimationFrame(animateBalloon);
    };
    requestAnimationFrame(animateBalloon);

    const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
    let ticking = false;
    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0);
        const rect = item.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        item.style.translate = `0 ${Math.max(-22, Math.min(22, -offset)).toFixed(1)}px`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }
})();
