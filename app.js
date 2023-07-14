var loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    loader.style.display = 'none';
    document.body.classList.remove('hide-overflow')
});

// *********************************************************************************

const navBarBtn = document.querySelector('.hamburger');

navBarBtn.addEventListener('click', () => {
    const navBar = document.querySelector('.nav');
    navBar.classList.toggle('nav-scroll-mobile');
    const mbNav = document.querySelector('.mobile-navbar');
    mbNav.classList.toggle('active');
    navBarBtn.classList.toggle('active');
});

window.addEventListener('resize', () => {
    const mbNav = document.querySelector('.mobile-navbar');
    if (window.innerWidth > 700) {
        mbNav.classList.remove('active');
        navBarBtn.classList.remove('active');
        navBar.classList.remove('nav-scroll-mobile');
    }
});

// *********************************************************************************

const dropBtn1 = document.querySelector('.show-dd1');

dropBtn1.addEventListener("click", () => {
    let icon = document.querySelector('.i1');
    icon.classList.toggle('rotate');

    let dropMenu = document.querySelector('.dd1');
    dropMenu.classList.toggle('show');
});

const dropBtn2 = document.querySelector('.show-dd2');

dropBtn2.addEventListener("click", () => {
    let icon = document.querySelector('.i2');
    icon.classList.toggle('rotate');

    let dropMenu = document.querySelector('.dd2');
    dropMenu.classList.toggle('show');
});

const dropBtn3 = document.querySelector('.show-dd3');

dropBtn3.addEventListener("click", () => {
    let icon = document.querySelector('.i3');
    icon.classList.toggle('rotate');

    let dropMenu = document.querySelector('.dd3');
    dropMenu.classList.toggle('show');
});

const dropBtn4 = document.querySelector('.show-dd4');

dropBtn4.addEventListener("click", () => {
    let icon = document.querySelector('.i4');
    icon.classList.toggle('rotate');

    let dropMenu = document.querySelector('.dd4');
    dropMenu.classList.toggle('show');
});

// *********************************************************************************

const navBar = document.querySelector('.nav');

let prevScrollPos1 = window.pageYOffset || document.documentElement.scrollTop;
let currentScrollPos1;

function handleScroll1() {
    currentScrollPos1 = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPos1 > 100) {
        navBar.classList.add('nav-scroll');
    } else {
        navBar.classList.remove('nav-scroll');
    }

    prevScrollPos1 = currentScrollPos1;
}

window.addEventListener('scroll', handleScroll1);

// *********************************************************************************


const toTopBtn = document.querySelector('.go-to-top');

let prevScrollPos2 = window.pageYOffset || document.documentElement.scrollTop;
let currentScrollPos2;

function handleScroll2() {
    currentScrollPos2 = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPos2 > 300) {
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }

    prevScrollPos2 = currentScrollPos2;
}

window.addEventListener('scroll', handleScroll2);


// *********************************************************************************

const carousel = document.querySelector('.carousel');
const firstImg = document.querySelectorAll('.carousel img')[0];
let firstImgWidth = firstImg.clientWidth + 14;
const arrowIcons = document.querySelectorAll('.wrapper i');
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
let positionDiff;
let isDragging = false;

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
        showHideIcons();
    });
});

let prevPageX, prevScrollLeft;
let isDragStart = false;

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);


function dragStart(e) {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
    if (!isDragStart)
        return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

function dragStop() {
    isDragStart = false;
    carousel.classList.remove('dragging');
    if (!isDragging)
        return;
    isDragging = false;
    autoSlide();
}

function showHideIcons() {
    arrowIcons[0].style.backgroundColor = carousel.scrollLeft === 0 ? 'gray' : 'var(--primary-color)';
    arrowIcons[1].style.backgroundColor = carousel.scrollLeft === scrollWidth ? 'gray' : 'var(--primary-color)';
}

function autoSlide() {
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))
        return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

// *********************************************************************************

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// *********************************************************************************
const notWorking = document.querySelectorAll('.not-working');
const warningC = document.querySelector('.warning-container');
let warningState = 'hidden';

notWorking.forEach((item) => {
    item.addEventListener('click', () => {
        let barWidth = 0;
        document.querySelector('.warning .load-bar').style.width = 0 + 'px';

        let warningID = setInterval(() => {
            document.querySelector('.warning .load-bar').style.width = barWidth + '%';
            barWidth++;

            if (barWidth > 100 || warningState === 'hidden') {
                warningState = 'hidden';
                clearInterval(warningID);
                document.querySelector('.warning .load-bar').style.width = 0 + 'px';
                warningC.classList.remove('show-error');
            }
        }, 30);

        if (warningC.classList.contains('show-error') || warningState === 'shown') {
            document.querySelector('.warning .load-bar').style.width = 0 + 'px';
            clearInterval(warningID);
        } else {
            warningC.classList.add('show-error');
            warningState = 'shown';
        }
    })
});

const removeWarning = document.querySelector('.ok-warning-btn');
removeWarning.addEventListener('click', () => {
    warningC.classList.remove('show-error');
    warningState = 'hidden';
})

const removeWarning2 = document.querySelector('.warning-bg');
removeWarning2.addEventListener('click', () => {
    warningC.classList.remove('show-error');
    warningState = 'hidden';
})

// *********************************************************************************

const formBtn = document.querySelector('.section7 .getstarted-btn');

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
});