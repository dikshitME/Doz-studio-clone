import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Lenis from 'lenis'

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 807,
};

const images = [];
let imagesLoaded = 0;

function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `assets/Images/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };

    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index < frames.maxIndex) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;

    const newWidth = img.width * scaleX;
    const newHeight = img.height * scaleY;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });

  function updateFrame(index) {
    return {
      currentIndex: index,
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }
  tl
  .to(frames, updateFrame(70),"first") 
  .to(".animate1", { opacity: 0, ease: "linear" },"first")

  .to(frames, updateFrame(180),"second") 
  .to(".animate2", { opacity: 1, ease: "linear" },"second")


  .to(frames, updateFrame(250),"third") 
  .to(".animate3", { opacity: 1, ease: "linear" },"third")

  .to(frames, updateFrame(330),"fourth") 
  .to(".animate4", { opacity: 1, ease: "linear" },"fourth")

  .to(frames, updateFrame(420),"fifth") 
  .to(".panel", { x:"0%",ease:"expo "},"fifth")

  .to(frames, updateFrame(500),"sixth") 
  .to(".panel", { opacity:0,ease:"linear "},"sixth")

  .to(frames, updateFrame(600),"seventh") 
  .to("canvas", {scale:.3,ease:"linear "},"seventh")

  .to(frames, updateFrame(807),"eighth") 
  .to("canvas", {scale:1,ease:"linear "},"eighth")

}

preloadImages();

window.addEventListener("resize", () => {
  loadImage(Math.floor(frames.currentIndex)); // Ensure the canvas is resized correctly
});


const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



function loaderAnimation() {
  var loader = document.querySelector("#loader")
  setTimeout(function () {
      loader.style.top = "-100%"
  }, 5000)
}
loaderAnimation()




function textAnimation() {
  document.querySelectorAll('.headings h3').forEach(function (h3) {
    h3.addEventListener('mouseenter', function () {
        const videoSrc = h3.getAttribute('data-video');
        const hoverVideoContainer = document.getElementById('hover-video-container');
        const hoverVideo = document.getElementById('hover-video');

        hoverVideo.src = videoSrc;
        hoverVideoContainer.classList.remove('hidden'); 
    });

    h3.addEventListener('mouseleave', function () {
        const hoverVideoContainer = document.getElementById('hover-video-container');
        hoverVideoContainer.classList.add('hidden'); 
        hoverVideo.src = ''; 
    });
});
}

textAnimation();
