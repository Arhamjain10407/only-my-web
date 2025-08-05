var menu = document.querySelector(".nav i");
var cross = document.querySelector(".full i");

var tl = gsap.timeline();

tl.to(".full", {
    right: 0,
    duration: 0.2
});

tl.from(".full h4", {
    x: 150,
    duration: 0.2,
    stagger: 0.2,
    opacity: 0
});

tl.from(".full i", {
    opacity: 0
});

tl.pause();

menu.addEventListener("click", function () {
    tl.play();
});

cross.addEventListener("click", function () {
    tl.reverse();
});
//-------|------///
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#..________';
        this.frame = 0;
        this.queue = [];
        this.originalText = el.textContent;
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.textContent;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 10);
            const end = start + Math.floor(Math.random() * 10);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }

        this.el.textContent = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// on hover
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scramble').forEach(el => {
        const fx = new TextScramble(el);
        const targetText = el.dataset.text || el.textContent;

        el.addEventListener('mouseenter', () => {
            fx.setText(targetText);
        });
    });
});