document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded!");

    // Scroll animation for sections
    window.addEventListener("scroll", function () {
        let elements = document.querySelectorAll(".fade-in");
        let screenHeight = window.innerHeight;
        elements.forEach((el) => {
            let position = el.getBoundingClientRect().top;
            if (position < screenHeight - 100) {
                el.classList.add("visible");
            }
        });

        // Highlight active section in navigation
        highlightActiveSection();

        // Логика для добавления/удаления класса "scrolled" у header
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    // Smooth scrolling
    document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let target = document.getElementById(targetId);
            window.scrollTo({ top: target.offsetTop - 50, behavior: "smooth" });
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        let lastScrollTop = 0;
        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY;
            if (scrollTop > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
            backToTopButton.style.opacity = (scrollTop > lastScrollTop) ? "1" : "0.7";
            lastScrollTop = scrollTop;
        });
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    } else {
        console.error("Кнопка 'Наверх' не найдена на странице.");
    }

    // Hover animation for buttons
    document.querySelectorAll("button").forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.05)";
            button.style.transition = "transform 0.2s ease";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });

    // Dynamic page title on scroll
    let originalTitle = document.title;
    window.addEventListener("scroll", () => {
        document.title = window.scrollY > 200 ? "Вернитесь на сайт! 😊" : originalTitle;
    });

    // Highlight active section in navigation
    function highlightActiveSection() {
        let sections = document.querySelectorAll("section");
        let navLinks = document.querySelectorAll("nav a");
        sections.forEach((section) => {
            let top = section.offsetTop - 100;
            let bottom = top + section.offsetHeight;
            let id = section.getAttribute("id");
            if (window.scrollY >= top && window.scrollY < bottom) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');  // Переключаем класс активности кнопки гамбургер
            mobileNav.classList.toggle('active');  // Переключаем видимость мобильного меню
        });
    } else {
        console.error("Элементы 'menu-toggle' или 'mobile-nav' не найдены на странице.");
    }

    // Открытие модального окна для фотографий
    const photoCards = document.querySelectorAll('.photo-grid a');
    const modalPhoto = document.getElementById('modalPhoto');
    const photoModalEl = document.getElementById('photoModal');
    let photoModal; // Переменная для инстанса модального окна

    if (photoModalEl && modalPhoto) {
        photoModal = new bootstrap.Modal(photoModalEl);

        photoCards.forEach((card) => {
            card.addEventListener('click', function (e) {
                e.preventDefault(); // Отменяем переход по ссылке
                const imageSrc = this.getAttribute('href');
                modalPhoto.src = imageSrc;
                photoModal.show();
            });
        });

        // Сброс изображения при закрытии модального окна (опционально)
        photoModalEl.addEventListener('hidden.bs.modal', function () {
            modalPhoto.src = "";
        });
    } else {
        console.error("Элементы для модального окна фотографий не найдены на странице.");
    }

    // Существующий код для работы с каруселью в модальном окне галереи
    const galleryModal = document.getElementById('galleryModal');
    const carouselGallery = document.getElementById('galleryCarousel');
    let carouselInstance;

    if (galleryModal && carouselGallery) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            const triggerEl = event.relatedTarget;
            const slideTo = triggerEl.getAttribute('data-bs-slide-to');
            console.log("Slide to:", slideTo); // Для отладки

            // Инициализация карусели при открытии модального окна
            if (!carouselInstance) {
                carouselInstance = new bootstrap.Carousel(carouselGallery);
            }

            if (slideTo !== null) {
                // Переключаем карусель на нужный слайд
                carouselInstance.to(parseInt(slideTo));
            } else {
                console.error("Нет атрибута data-bs-slide-to на элементе!");
            }
        });

        // Слушаем событие закрытия модального окна, чтобы сбросить carouselInstance
        galleryModal.addEventListener('hidden.bs.modal', function () {
            carouselInstance = null; // Сбрасываем инстанс карусели
        });
    } else {
        console.error("Элементы 'galleryModal' или 'carouselGallery' не найдены на странице.");
    }

    // Обработчик отправки формы
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения из полей формы
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Создаем объект данных для отправки на сервер
    const data = new FormData();
    data.append('name', name);
    data.append('phone', phone);

    // Создаем AJAX запрос для отправки данных на сервер
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/send-email.php', true);

    // Функция обработки ответа от сервера
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Если ответ успешный, выводим сообщение
            alert('Сообщение отправлено!');
            // Очистить форму
            document.getElementById('bookingForm').reset();
        } else {
            // Если произошла ошибка, выводим сообщение
            alert('Ошибка при отправке сообщения.');
        }
    };

    // Отправляем данные на сервер
    xhr.send(data);
});

// Логика для анимации листьев на сайте
window.addEventListener("scroll", function () {
    document.documentElement.style.setProperty("--parallax-offset", `${window.scrollY * 0.751}px`);
});

});
