/* ---------------- SLIDESHOW ---------------- */

const slides = document.querySelectorAll(".slide");

const images = [
  "assets/photo1.jpg",
  "assets/photo2.jpg",
  "assets/photo3.jpg"
];

let index = 0;

/* preload – no flash ever */
images.forEach(src => {
  const img = new Image();
  img.src = src;
});

/* assign images */
slides.forEach((s, i) => {
  s.style.backgroundImage = `url(${images[i]})`;
});

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

/* ---------------- TIMER ---------------- */

const targetDate = new Date("December 28, 2025 00:00:00").getTime();

const h = document.getElementById("hours");
const m = document.getElementById("minutes");
const s = document.getElementById("seconds");

const title = document.getElementById("title");
const timer = document.getElementById("timer");
const content = document.getElementById("birthdayContent");

/* ---------------- AUDIO ---------------- */

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

song1.currentTime = 15;
song1.loop = true;

/* mobile autoplay fix */
document.body.addEventListener("touchstart", () => {
  song1.play();
}, { once: true });

const interval = setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff <= 0) {
    clearInterval(interval);
    startBirthday();
    return;
  }

  h.textContent = String(Math.floor(diff / 3600000)).padStart(2, "0");
  m.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
  s.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
}, 1000);

function startBirthday() {
  title.style.display = "none";
  timer.style.display = "none";
  content.classList.remove("hidden");

  song1.pause();
  song2.currentTime = 57;
  song2.play();

  balloons();
  crackers();

  setTimeout(() => {
    document.getElementById("line1").style.display = "none";
    document.getElementById("line2").style.display = "none";
    document.getElementById("love").classList.remove("hidden");
  }, 13000);
}

/* ---------------- BALLOONS ---------------- */

function balloons() {
  const wrap = document.getElementById("balloons");
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "vw";
    wrap.appendChild(b);
    setTimeout(() => b.remove(), 3000);
  }
}

/* ---------------- CRACKERS ---------------- */

function crackers() {
  const c = document.getElementById("crackers");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;

  let p = [];
  for (let i = 0; i < 140; i++) {
    p.push({
      x: innerWidth / 2,
      y: innerHeight / 2,
      vx: (Math.random() - 0.5) * 7,
      vy: (Math.random() - 0.5) * 7,
      life: 60
    });
  }

  const anim = setInterval(() => {
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach(e => {
      ctx.fillStyle = "gold";
      ctx.fillRect(e.x, e.y, 3, 3);
      e.x += e.vx;
      e.y += e.vy;
      e.life--;
    });
    p = p.filter(e => e.life > 0);
  }, 16);

  setTimeout(() => {
    clearInterval(anim);
    ctx.clearRect(0,0,c.width,c.height);
  }, 4000);
}