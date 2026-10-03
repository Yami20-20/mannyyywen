/* =====================================================
   PAGE ELEMENTS
===================================================== */

const hero = document.getElementById("hero");
const letter = document.getElementById("letter");
const messagePage = document.getElementById("messagePage");
const final = document.getElementById("final");

const openBtn = document.getElementById("openBtn");
const moreBtn = document.getElementById("moreBtn");
const finalBtn = document.getElementById("finalBtn");
const againBtn = document.getElementById("againBtn");

const hearts = document.getElementById("hearts");

const music = document.getElementById("loveMusic");
const love3DMusic = document.getElementById("love3DMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;

let memoryExplosionInterval = null;
let musicWasPlayingBeforeVideo = false;


/* =====================================================
   IMPORTANT:
   CHECK KUNG LOVE3D PAGE
===================================================== */

const isLove3DPage =
  !!document.getElementById("love3DPage");


/* =====================================================
   MUSIC - MAIN PAGE
===================================================== */

function playMusic() {

  if (!music) return;

  music.volume = 0;

  const promise = music.play();

  if (promise !== undefined) {

    promise.then(() => {

      musicStarted = true;

      if (musicBtn) {
        musicBtn.classList.add("playing");
      }

      fadeMusicIn();

    }).catch(() => {});

  }

}


function fadeMusicIn() {

  let volume = 0;

  const fade = setInterval(() => {

    volume += 0.025;

    if (volume >= 0.28) {

      volume = 0.28;

      clearInterval(fade);

    }

    if (music) {
      music.volume = volume;
    }

  }, 80);

}


function pauseMusic() {

  if (!music) return;

  music.pause();

  musicStarted = false;

  if (musicBtn) {
    musicBtn.classList.remove("playing");
  }

}


function pauseMusicForVideo() {

  if (!music) return;

  musicWasPlayingBeforeVideo =
    !music.paused && !music.ended;

  if (musicWasPlayingBeforeVideo) {
    music.pause();
  }

  if (musicBtn) {
    musicBtn.classList.remove("playing");
  }

}


function resumeMusicAfterVideo() {

  if (!music) return;

  if (!musicWasPlayingBeforeVideo) return;

  const promise = music.play();

  if (promise !== undefined) {

    promise.then(() => {

      musicStarted = true;

      if (musicBtn) {
        musicBtn.classList.add("playing");
      }

      music.volume = 0.28;

    }).catch(() => {

      console.log(
        "Music resume blocked by browser."
      );

    });

  }

  musicWasPlayingBeforeVideo = false;

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

if (musicBtn && music) {

  musicBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      if (music.paused) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );

}


/* =====================================================
   MAIN PAGE MUSIC START
===================================================== */

if (!isLove3DPage) {

  document.addEventListener(
    "click",
    () => {

      if (!musicStarted) {
        playMusic();
      }

    },
    { once: true }
  );


  document.addEventListener(
    "touchstart",
    () => {

      if (!musicStarted) {
        playMusic();
      }

    },
    {
      once: true,
      passive: true
    }
  );

}


/* =====================================================
   PAGE TRANSITION
===================================================== */

function transitionTo(hide, show) {

  if (!hide || !show) return;

  hide.classList.add("hidden");

  show.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function makeHeart(burst = false) {

  const el =
    document.createElement("div");

  el.className = "float-heart";

  const symbols = [
    "♥",
    "♡",
    "❤",
    "💗",
    "💖"
  ];

  const colors = [
    "#ffffff",
    "#ffe0ea",
    "#ff7da4",
    "#ff477d"
  ];

  el.textContent =
    symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];

  el.style.setProperty(
    "--x",
    Math.random() * 100 + "vw"
  );

  el.style.setProperty(
    "--s",
    14 + Math.random() * 22 + "px"
  );

  el.style.setProperty(
    "--d",
    (
      burst
        ? 3 + Math.random() * 2
        : 6 + Math.random() * 4
    ) + "s"
  );

  el.style.setProperty(
    "--drift",
    -70 + Math.random() * 140 + "px"
  );

  el.style.setProperty(
    "--c",
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ]
  );

  if (hearts) {

    hearts.appendChild(el);

  }

  setTimeout(() => {

    el.remove();

  }, 9000);

}


/* =====================================================
   MANNY + WENDY
===================================================== */

function makeLoveName(burst = false) {

  const card =
    document.createElement("div");

  card.className =
    "love-memory-float";

  const names = [

    "Manny ♥ Wendy",
    "Wendy ♥ Manny",
    "Manny ♡ Wendy",
    "Wendy ♡ Manny",
    "Manny & Wendy",
    "Manny + Wendy",
    "Baby/Wifey",
    "My Wifeyy"

  ];

  const message =
    names[
      Math.floor(
        Math.random() * names.length
      )
    ];


  const name =
    document.createElement("span");

  name.className =
    "love-memory-name";

  name.textContent =
    message;


  const heart1 =
    document.createElement("span");

  heart1.className =
    "love-mini-heart heart-one";

  heart1.textContent = "♥";


  const heart2 =
    document.createElement("span");

  heart2.className =
    "love-mini-heart heart-two";

  heart2.textContent = "♡";


  const heart3 =
    document.createElement("span");

  heart3.className =
    "love-mini-heart heart-three";

  heart3.textContent = "♥";


  const heart4 =
    document.createElement("span");

  heart4.className =
    "love-mini-heart heart-four";

  heart4.textContent = "♡";


  const glow1 =
    document.createElement("span");

  glow1.className =
    "love-glow-dot dot-one";


  const glow2 =
    document.createElement("span");

  glow2.className =
    "love-glow-dot dot-two";


  const glow3 =
    document.createElement("span");

  glow3.className =
    "love-glow-dot dot-three";


  card.appendChild(heart1);
  card.appendChild(heart2);
  card.appendChild(heart3);
  card.appendChild(heart4);

  card.appendChild(glow1);
  card.appendChild(glow2);
  card.appendChild(glow3);

  card.appendChild(name);


  card.style.setProperty(
    "--love-x",
    (5 + Math.random() * 82) + "vw"
  );


  card.style.setProperty(
    "--love-scale",
    0.75 + Math.random() * 0.45
  );


  card.style.setProperty(
    "--love-rotate",
    (-10 + Math.random() * 20) + "deg"
  );


  card.style.setProperty(
    "--love-drift",
    (-100 + Math.random() * 200) + "px"
  );


  card.style.setProperty(
    "--love-rise",
    (90 + Math.random() * 30) + "vh"
  );


  const duration = burst
    ? 5 + Math.random() * 2
    : 7 + Math.random() * 4;


  card.style.setProperty(
    "--love-time",
    duration + "s"
  );


  card.style.setProperty(
    "--love-delay",
    Math.random() * 0.4 + "s"
  );


  if (hearts) {

    hearts.appendChild(card);

  } else {

    document.body.appendChild(card);

  }


  setTimeout(() => {

    card.remove();

  }, (duration + 1) * 1000);

}


function loveNameRain(amount = 3) {

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      makeLoveName(true);

    }, i * 1200);

  }

}


/* =====================================================
   HEART RAIN
===================================================== */

function heartRain(amount = 20) {

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      makeHeart(true);

    }, i * 65);

  }

}


/* =====================================================
   SPARKLES
===================================================== */

function sparkleBurst(amount = 22) {

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {

      const spark =
        document.createElement("div");

      spark.className = "spark";

      spark.style.setProperty(
        "--x",
        Math.random() * 100 + "vw"
      );

      spark.style.setProperty(
        "--y",
        15 + Math.random() * 70 + "vh"
      );

      document.body.appendChild(spark);

      setTimeout(() => {

        spark.remove();

      }, 1000);

    }, i * 40);

  }

}


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

if (openBtn) {

  openBtn.addEventListener(
    "click",
    () => {

      transitionTo(
        hero,
        letter
      );

      heartRain(32);

      loveNameRain(2);

      sparkleBurst(25);

      playMusic();

    }
  );

}


/* =====================================================
   PAGE 2 → PAGE 3
===================================================== */

if (moreBtn) {

  moreBtn.addEventListener(
    "click",
    () => {

      transitionTo(
        letter,
        messagePage
      );

      heartRain(35);

      loveNameRain(2);

      sparkleBurst(25);

    }
  );

}


/* =====================================================
   PAGE 3 → FINAL PAGE
===================================================== */

if (finalBtn) {

  finalBtn.addEventListener(
    "click",
    () => {

      transitionTo(
        messagePage,
        final
      );

      heartRain(35);

      loveNameRain(2);

      sparkleBurst(25);


      setTimeout(() => {

        memoryPhotoExplosion();

      }, 450);

    }
  );

}


/* =====================================================
   AGAIN BUTTON
===================================================== */

if (againBtn) {

  againBtn.addEventListener(
    "click",
    () => {

      transitionTo(
        final,
        hero
      );

      heartRain(22);

      loveNameRain(1);

      sparkleBurst(18);


      if (memoryExplosionInterval) {

        clearInterval(
          memoryExplosionInterval
        );

        memoryExplosionInterval = null;

      }

    }
  );

}


/* =====================================================
   NORMAL AMBIENT HEARTS
   MAIN PAGE ONLY
===================================================== */

if (!isLove3DPage) {

  setInterval(() => {

    makeHeart(false);

  }, 1250);

}


/* =====================================================
   MANNY + WENDY
   MAIN PAGE ONLY
===================================================== */

if (!isLove3DPage) {

  setInterval(() => {

    if (Math.random() > 0.75) {

      makeLoveName(false);

    }

  }, 3000);

}


/* =====================================================
   CLICK SPARK
   MAIN PAGE ONLY
===================================================== */

if (!isLove3DPage) {

  document.addEventListener(
    "click",
    (event) => {

      const spark =
        document.createElement("div");

      spark.className = "spark";

      spark.style.setProperty(
        "--x",
        event.clientX + "px"
      );

      spark.style.setProperty(
        "--y",
        event.clientY + "px"
      );

      document.body.appendChild(spark);

      setTimeout(() => {

        spark.remove();

      }, 1000);

    }
  );

}


/* =====================================================
   MEMORY PHOTOS
   MAIN PAGE ONLY
===================================================== */

const memoryPhotos = [

  "photos/pic1.jpg",
  "photos/pic2.jpg",
  "photos/pic3.jpg",
  "photos/pic4.jpg",
  "photos/pic5.jpg",
  "photos/pic6.jpg",
  "photos/pic7.jpg",
  "photos/pic8.jpg",
  "photos/pic9.jpg",
  "photos/pic10.jpg",
  "photos/pic11.jpg",
  "photos/pic12.jpg",
  "photos/pic13.jpg",
  "photos/pic14.jpg",
  "photos/pic15.jpg",
  "photos/pic16.jpg",
  "photos/pic17.jpg",
  "photos/pic18.jpg",
  "photos/pic19.jpg",
  "photos/pic20.jpg",
  "photos/pic22.jpg",
  "photos/pic21.jpg"

];


/* =====================================================
   CREATE PHOTO
===================================================== */

function createMemoryPhoto() {

  if (isLove3DPage) return;

  const photo =
    document.createElement("div");

  photo.className =
    "floating-photo";


  const img =
    document.createElement("img");


  const randomPhoto =
    memoryPhotos[
      Math.floor(
        Math.random() *
        memoryPhotos.length
      )
    ];


  img.src =
    randomPhoto;

  img.alt =
    "Our memory";


  photo.appendChild(img);


  photo.style.setProperty(
    "--photo-x",
    (4 + Math.random() * 88) + "vw"
  );


  photo.style.setProperty(
    "--photo-rotate",
    (-12 + Math.random() * 24) + "deg"
  );


  const duration =
    6 + Math.random() * 2;


  photo.style.setProperty(
    "--photo-time",
    duration + "s"
  );


  photo.style.setProperty(
    "--drift1",
    (-70 + Math.random() * 140) + "px"
  );


  photo.style.setProperty(
    "--drift2",
    (-120 + Math.random() * 240) + "px"
  );


  photo.style.setProperty(
    "--drift3",
    (-100 + Math.random() * 200) + "px"
  );


  photo.style.setProperty(
    "--drift4",
    (-160 + Math.random() * 320) + "px"
  );


  if (hearts) {

    hearts.appendChild(photo);

  } else {

    document.body.appendChild(photo);

  }


  setTimeout(() => {

    photo.remove();

  }, (duration + 1) * 1000);

}


/* =====================================================
   NORMAL PHOTOS
   MAIN PAGE ONLY
===================================================== */

if (!isLove3DPage) {

  for (let i = 0; i < 5; i++) {

    setTimeout(() => {

      createMemoryPhoto();

    }, i * 250);

  }


  setInterval(() => {

    createMemoryPhoto();

  }, 850);

}


/* =====================================================
   FINAL PAGE
   BIG PASABOG
===================================================== */

function memoryPhotoExplosion() {

  if (isLove3DPage) return;


  setTimeout(() => {

    for (let i = 0; i < 25; i++) {

      setTimeout(() => {

        createMemoryPhoto();

      }, i * 45);

    }

    heartRain(90);

    sparkleBurst(65);

  }, 100);


  setTimeout(() => {

    for (let i = 0; i < 25; i++) {

      setTimeout(() => {

        createMemoryPhoto();

      }, i * 45);

    }

    heartRain(70);

    sparkleBurst(50);

  }, 1700);


  setTimeout(() => {

    loveNameRain(4);

  }, 4000);


  if (memoryExplosionInterval) {
    return;
  }


  memoryExplosionInterval =
    setInterval(() => {

      if (
        final &&
        !final.classList.contains("hidden")
      ) {

        photoExplosion();

      }

    }, 15000);

}


/* =====================================================
   REPEATING FINAL EXPLOSION
===================================================== */

function photoExplosion() {

  if (isLove3DPage) return;


  for (let i = 0; i < 30; i++) {

    setTimeout(() => {

      createMemoryPhoto();

    }, i * 45);

  }

  heartRain(90);

  sparkleBurst(65);


  setTimeout(() => {

    for (let i = 0; i < 30; i++) {

      setTimeout(() => {

        createMemoryPhoto();

      }, i * 45);

    }

    heartRain(70);

    sparkleBurst(50);

  }, 6000);


  setTimeout(() => {

    loveNameRain(3);

  }, 2200);

}


/* =====================================================
   LAST SURPRISE VIDEO
===================================================== */

const videoBtn =
  document.getElementById(
    "videoBtn"
  );


const videoModal =
  document.getElementById(
    "videoModal"
  );


const videoClose =
  document.getElementById(
    "videoClose"
  );


const videoModalBackdrop =
  document.getElementById(
    "videoModalBackdrop"
  );


const surpriseVideo =
  document.getElementById(
    "surpriseVideo"
  );


function openVideoSurprise() {

  if (!videoModal) {

    console.log(
      "Video modal not found."
    );

    return;

  }


  pauseMusicForVideo();


  videoModal.classList.remove(
    "hidden"
  );


  videoModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  if (surpriseVideo) {

    surpriseVideo.pause();

    surpriseVideo.currentTime = 0;

    surpriseVideo.load();


    const playPromise =
      surpriseVideo.play();


    if (
      playPromise !== undefined
    ) {

      playPromise.catch(() => {

        console.log(
          "Video autoplay blocked. Press play."
        );

      });

    }

  }

}


function closeVideoSurprise() {

  if (!videoModal) {
    return;
  }


  videoModal.classList.add(
    "hidden"
  );


  videoModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";


  if (surpriseVideo) {

    surpriseVideo.pause();

    surpriseVideo.currentTime = 0;

  }


  resumeMusicAfterVideo();

}


/* =====================================================
   VIDEO BUTTON
===================================================== */

if (videoBtn) {

  videoBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();


      heartRain(30);

      loveNameRain(2);

      sparkleBurst(25);


      openVideoSurprise();

    }
  );

}


/* =====================================================
   CLOSE VIDEO
===================================================== */

if (videoClose) {

  videoClose.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();


      closeVideoSurprise();

    }
  );

}


/* =====================================================
   VIDEO BACKDROP
===================================================== */

if (videoModalBackdrop) {

  videoModalBackdrop.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      closeVideoSurprise();

    }
  );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      videoModal &&
      !videoModal.classList.contains(
        "hidden"
      )
    ) {

      closeVideoSurprise();

    }

  }
);


/* =====================================================
   VIDEO ENDED
===================================================== */

if (surpriseVideo) {

  surpriseVideo.addEventListener(
    "ended",
    () => {

      heartRain(25);

      loveNameRain(2);

      sparkleBurst(20);

      resumeMusicAfterVideo();

    }
  );

}


/* =====================================================
   VIDEO ERROR
===================================================== */

if (surpriseVideo) {

  surpriseVideo.addEventListener(
    "error",
    () => {

      console.log(
        "Hindi ma-load ang video: video/sayaw.mp4"
      );

    }
  );

}


/* =====================================================
   TAP LOVE CARD
===================================================== */

const tapLoveCard =
  document.getElementById(
    "tapLoveCard"
  );


const tapLoveIntro =
  document.querySelector(
    ".tap-love-intro"
  );


const tapLoveText =
  document.querySelector(
    ".tap-love-text"
  );


const tapLoveFinal =
  document.getElementById(
    "tapLoveFinal"
  );


const tapLoveCursor =
  document.getElementById(
    "tapLoveCursor"
  );


if (
  tapLoveCard &&
  tapLoveIntro &&
  tapLoveText &&
  tapLoveFinal
) {

  const introText =
    "ILOVEYOUUUSOMUCHHHH BABYYY🥺❤️";


  const mainText =
    "If I could keep one thing from all the memories we've made...\n\n" +
    "I'd keep you.\n" +
    "You. ❤️\n\n" +
    "Thank you for being one of the most beautiful parts of my life. " +
    "Thank you sa lahat ng memories, sa happiness, sa pagmamahal, " +
    "at kahit sa mga araw na hindi na hindi tayo okay haha\n\n" +
    "Kahit saan pa tayo dalhin ng mga susunod na araw, " +
    "isa lang yung gusto kong maalala mo...";


  let started = false;


  function typeText(
    element,
    text,
    speed,
    callback
  ) {

    element.innerHTML = "";

    let index = 0;


    function type() {

      if (index < text.length) {

        const char =
          text[index];


        if (char === "\n") {

          element.innerHTML +=
            "<br>";

        } else {

          element.innerHTML +=
            char;

        }


        index++;


        setTimeout(
          type,
          speed
        );

      } else {

        if (callback) {
          callback();
        }

      }

    }


    type();

  }


  function startTapLoveAnimation() {

    if (started) return;

    started = true;


    tapLoveCard.classList.add(
      "show"
    );


    if (tapLoveCursor) {

      tapLoveCursor.style.opacity =
        "1";

    }


    /* INTRO */

    typeText(
      tapLoveIntro,
      introText,
      55,
      () => {

        /* MAIN MESSAGE */

        typeText(
          tapLoveText,
          mainText,
          28,
          () => {

            if (tapLoveCursor) {

              tapLoveCursor.style.opacity =
                "0";

            }


            /* FINAL MESSAGE */

            setTimeout(() => {

              tapLoveFinal.classList.add(
                "glowing"
              );

              tapLoveCard.classList.add(
                "finished"
              );

            }, 500);

          }
        );

      }
    );

  }


  const tapLoveObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting &&
              !started
            ) {

              startTapLoveAnimation();

            }

          }
        );

      },
      {
        threshold: 0.25
      }
    );


  tapLoveObserver.observe(
    tapLoveCard
  );

}


/* =====================================================
   LOVE 3D MUSIC
   LOVE3D PAGE ONLY
===================================================== */

if (isLove3DPage && love3DMusic) {

  love3DMusic.volume = 0.28;

  love3DMusic.loop = true;


  /*
     Try agad.
     Kung blocked ng browser,
     first tap/click ang mag-start.
  */

  love3DMusic
    .play()
    .catch(() => {

      console.log(
        "Love3D music autoplay blocked."
      );

    });


  const startLove3DMusic =
    () => {

      if (
        love3DMusic &&
        love3DMusic.paused
      ) {

        love3DMusic.volume = 0.28;

        love3DMusic
          .play()
          .catch(() => {});

      }

    };


  document.addEventListener(
    "click",
    startLove3DMusic,
    {
      once: true
    }
  );


  document.addEventListener(
    "touchstart",
    startLove3DMusic,
    {
      once: true,
      passive: true
    }
  );

}


/* =====================================================
   LOVE 3D NEXT BUTTON
   MAIN PAGE ONLY
===================================================== */

const love3DNextBtn =
  document.getElementById(
    "love3DNextBtn"
  );


if (love3DNextBtn) {

  love3DNextBtn.addEventListener(
    "click",
    () => {

      if (love3DMusic) {

        love3DMusic.volume = 0.28;

        love3DMusic
          .play()
          .catch(() => {});

      }

    }
  );

}