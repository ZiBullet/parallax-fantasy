class Parallax {
  constructor(obj) {
    this.clouds = document.querySelectorAll(obj.clouds);
    this.boat = document.querySelector(obj.boat);
    this.bg = document.querySelector(obj.bg);

    window.addEventListener("scroll", () => this.moveElements());
  }

  moveElements() {
    this.clouds.forEach((cloud) => {
      let speed = this.getSpeed(cloud);

      cloud.style.transform = this.translate(speed);
    });
    this.boat.style.transform = this.translate(0.9);
    this.bg.style.objectPosition = `0 ${window.scrollY / 10}%`;
  }
  getSpeed(item) {
    if (item.hasAttribute("data-speed")) {
      return +item.getAttribute("data-speed");
    } else return 0.4;
  }
  translate(speed) {
    return `translateX(${window.scrollY * speed}px)`;
  }
}

const parallax = new Parallax({
  clouds: ".header__cloud",
  boat: ".header__boat",
  bg: ".header__fantasy",
});

class Text {
  constructor(obj) {
    this.el = document.querySelector(obj.el);

    this.fulltext = this.el.innerHTML;
    this.el.innerHTML = "";
    this.str();
  }

  str(x = 0) {
    this.el.innerHTML += this.fulltext[x];
    x++;
    if (x <= this.fulltext.length) {
      setTimeout(() => {
        this.str(x);
      }, 200);
    } else {
      this.el.innerHTML = "";
      x = 0;
      setTimeout(() => this.str(x), 200);
    }
  }
}

const text = new Text({
  el: ".header__title",
});

class ParallaxMove {
  constructor(obj) {
    this.ballons = document.querySelectorAll(obj.ballons);
    window.addEventListener("mousemove", (e) => {
      this.move(e);
    });
  }
  move(e) {
    this.ballons.forEach((ballon) => {
      const speed = ballon.getAttribute("data-speed");
      const x = (window.innerWidth - e.pageX * speed) / 50;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      ballon.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

const parallaxMove = new ParallaxMove({
  ballons: ".parallax__ball",
});

class Timer {
  constructor(obj) {
    this.timerNums = document.querySelectorAll(obj.timerNums);
    this.timerSection = document.querySelector(obj.timerSection);
    this.state = true;
    window.addEventListener("scroll", () => this.scrollTimer());
  }
  scrollTimer() {
    if (this.state) {
      if (
        window.scrollY >=
        this.timerSection.offsetTop - this.timerSection.offsetHeight * 2
      ) {
        this.state = false;
        this.timerSet();
      }
    }
  }
  timerSet() {
    this.timerNums.forEach((num) => {
      const count = num.getAttribute("data-num");
      num.innerHTML = 0;

      function timer(k = 0) {
        num.innerHTML = k;
        k++;
        if (k <= count) {
          setTimeout(() => {
            timer(k);
          }, 5);
        }
      }
      timer();
    });
  }
}

const timer = new Timer({
  timerSection: ".timer",
  timerNums: ".timer__num",
});

class Bubble {
  constructor(obj) {
    this.bubbles = document.querySelectorAll(obj.bubbles);

    this.bubbles.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        this.bubbleShow(e, item);
      });
    });
  }

  bubbleShow(e, item) {
    const x = e.pageX - item.offsetLeft,
      y = e.pageY - item.offsetTop;

    let span = item.querySelector("span");
    span.style.left = x + "px";
    span.style.top = y + "px";
  }
}

const bubble = new Bubble({
  bubbles: ".timer__btn",
});
