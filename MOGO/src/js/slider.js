function slider(element, autoplayTimeout = 3000) {
    let Slider = function (element, autoplayTimeout) {
        this.sliderElement = element;
        this.autoplayTimeout = autoplayTimeout;

        this.currentSlideIndex = 0;
        this.slidesCount = this.sliderElement.querySelectorAll('.slide').length;
        this.timeoutId = null;
        this.playing = true;

        this.gotoSlide(0);
        this.play();

        this.sliderElement.addEventListener('click', this.dotsHandler.bind(this));

        this.sliderElement.querySelectorAll('.dot').forEach((dot) => {
            let progress = document.createElement('div');
            progress.classList.add('progress');
            progress.style.animationDuration = this.autoplayTimeout + 'ms';

            let line = document.createElement('div');
            line.classList.add('line');
            line.appendChild(progress);

            dot.appendChild(line);
        });
    };

    Slider.prototype.dotsHandler = function (event) {
        let dot = event.target.closest('.dot');
        if (!dot) {
            return;
        }

        let dotIndex = Array.prototype.indexOf.call(dot.parentElement.children, dot);

        this.stop();
        this.gotoSlide(dotIndex);
        this.play();
    };

    Slider.prototype.gotoSlide = function (index) {
        if (index > this.slidesCount - 1) {
            index = 0;
        }

        this.currentSlideIndex = index;

        let slidesElements = this.sliderElement.querySelectorAll('.slide');
        let dotsElements = this.sliderElement.querySelectorAll('.dot');
        [...Array(this.slidesCount).keys()].forEach((elIndex) => {
            if (elIndex === this.currentSlideIndex) {
                slidesElements[elIndex].classList.remove('hidden');
                dotsElements[elIndex].classList.add('active');
            }
            else {
                slidesElements[elIndex].classList.add('hidden');
                dotsElements[elIndex].classList.remove('active');
            }
        });
    };

    Slider.prototype.next = function () {
        this.gotoSlide(this.currentSlideIndex + 1);
    };

    Slider.prototype.play = function () {
        if (this.intervalId) {
            return;
        }
        this.intervalId = setInterval(this.next.bind(this), this.autoplayTimeout);
    };

    Slider.prototype.stop = function () {
        if (!this.intervalId) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
    };

    return new Slider(element, autoplayTimeout);
}
