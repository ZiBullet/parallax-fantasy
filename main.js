class Parallax {
    constructor(obj) {
        this.clouds = document.querySelectorAll(obj.clouds);
        this.boat = document.querySelector(obj.boat);
        this.bg = document.querySelector(obj.bg);
        
        window.addEventListener('scroll', () => this.moveElements());
    }
    
    moveElements() {
        this.clouds.forEach(cloud => {
            let speed = this.getSpeed(cloud);
            
            cloud.style.transform = this.translate(speed);
        })
        this.boat.style.transform = this.translate(0.9);
        this.bg.style.objectPosition = `0 ${window.scrollY / 10}%`
    }
    getSpeed(item) {
        if (item.hasAttribute('data-speed')) {
            return +item.getAttribute('data-speed')
        } else return 0.4
    }
    translate(speed) {
        return `translateX(${window.scrollY * speed}px)`
    }
}

const parallax = new Parallax({
    clouds: '.header__cloud',
    boat: '.header__boat',
    bg: '.header__fantasy'
})


class Text {
    constructor(obj) {
        this.el = document.querySelector(obj.el);
        
        this.fulltext = this.el.innerHTML;
        this.el.innerHTML = '';
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
            this.el.innerHTML = '';
            x = 0;
            setTimeout(() => this.str(x), 200);
        }
    }
}

const text = new Text({
    el: '.header__title'
})