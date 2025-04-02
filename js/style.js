(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('header_activ');
        } else {
            header.classList.remove('header_activ');
        }
    };
})();

(function () {
    const header = document.querySelector('.header');
    const videoGid = document.querySelector('.video__element');
    let hideTimeout;
    let isHidden = false;

    function checkVideoGidInViewport() {
        const rect = videoGid.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function hideHeader() {
        if (window.innerWidth > 800 && checkVideoGidInViewport()) {
            header.style.opacity = '0';
            header.style.pointerEvents = 'none';
            isHidden = true;
        }
    }

    function showHeader() {
        if (isHidden) {
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
            isHidden = false;
        }
    }

    window.addEventListener('scroll', () => {
        clearTimeout(hideTimeout);

        if (checkVideoGidInViewport()) {
            showHeader();
            hideTimeout = setTimeout(hideHeader, 3000); // Через 3 секунды без скролла скрываем
        } else {
            showHeader(); // Вне блока всегда показываем
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 800) {
            showHeader(); // При изменении размера окна и ширине < 800 всегда показываем header
        }
    });
})();

/*header handler*/
(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link');
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav-activ');
    });
    burgerItem.addEventListener('click',() => {
        menu.classList.add('header__nav-activ');  
    });
    if (window.innerWidth < 768){
        for (let i = 0; i < menuLinks.length; i += 1) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav-activ');
            });
        }
    }
}());
(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };
    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

document.addEventListener("DOMContentLoaded", function () {
    // Скрываем все модальные окна при загрузке
    document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
    });

    // Открытие модального окна
    document.querySelectorAll(".places__card-link").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let modalId = this.getAttribute("data-modal");
            let modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
            }
        });
    });

    // Закрытие при клике на крестик
    document.querySelectorAll(".modal__close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            let modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // Закрытие при клике вне окна
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", function (e) {
            if (!e.target.closest(".modal__content")) { 
                this.style.display = "none";
            }
        });
    });
});


