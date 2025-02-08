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
    /*
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
*/
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

const gallery = document.getElementById('galleryContainer');
    const loadMoreBtn = document.getElementById('loadMore');
    let currentPage = 1;
    const itemsPerPage = 6;

    // Имитация данных (замените на реальный API)
    const allImages = [
        {src: 'images/photo1.jpg', alt: 'Фото 1'},
        {src: 'images/photo2.jpg', alt: 'Фото 2'},
        {src: 'images/photo3.jpg', alt: 'Фото 3'},
        {src: 'images/photo4.jpg', alt: 'Фото 4'},
        {src: 'images/photo5.jpg', alt: 'Фото 5'},
        {src: 'images/photo11.jpg', alt: 'Фото 9'},
        {src: 'images/photo12.jpg', alt: 'Фото 10'},
        {src: 'images/photo13.jpg', alt: 'Фото 11'},
        {src: 'images/photo14.jpg', alt: 'Фото 14'}
    ];

    // Инициализация галереи
    function initGallery() {
        // Загрузка первых изображений
        loadImages(currentPage);
        
        // Обработчик для модального окна
        gallery.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const index = item.dataset.index;
                showModal(index);
            }
        });

        // Кнопка "Показать еще"
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadImages(currentPage);
        });
    }

    // Загрузка изображений
    function loadImages(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const imagesToLoad = allImages.slice(start, end);

        imagesToLoad.forEach((img, index) => {
            const item = createGalleryItem(img, start + index);
            gallery.appendChild(item);
            
            // Добавляем слайд в модальное окно
            addModalSlide(img, start + index);
        });

        // Скрыть кнопку если больше нет изображений
        if (start + imagesToLoad.length >= allImages.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Создание элемента галереи
    function createGalleryItem(img, index) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        
        col.innerHTML = `
            <a href="#" class="gallery-item" 
               data-bs-toggle="modal" 
               data-bs-target="#galleryModal" 
               data-index="${index}">
                <img src="${img.src}" 
                     class="img-fluid" 
                     alt="${img.alt}" 
                     loading="lazy">
            </a>
        `;
        return col;
    }

    // Добавление слайда в модальное окно
    function addModalSlide(img, index) {
        const carouselInner = document.getElementById('modalCarouselInner');
        const existingSlides = carouselInner.querySelectorAll('.carousel-item');
    
        if (existingSlides.length <= index) {
            const slide = document.createElement('div');
            slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${img.src}" class="d-block w-100" alt="${img.alt}">`;
            carouselInner.appendChild(slide);
        }
    }
    // Показать модальное окно с нужным слайдом
    function showModal(index) {
        const carousel = new bootstrap.Carousel('#modalCarousel');
        carousel.to(index);
    }

    initGallery();


});
