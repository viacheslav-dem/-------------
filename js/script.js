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

    // Smooth scrolling. Для прокрутки по пунктам меню
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
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Порог появления кнопки в зависимости от экрана
        const scrollThreshold = window.innerWidth < 768 
            ? window.innerHeight * 0.15  // 15vh для мобильных
            : window.innerHeight * 0.3;  // 30vh для десктопов

        if (scrollTop > scrollThreshold) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

        backToTopButton.style.opacity = (scrollTop > lastScrollTop) ? "0.7" : "1";
        lastScrollTop = scrollTop;
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
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
        {src: 'images/photo1.webp', alt: 'Фото 1'},
        {src: 'images/photo2.webp', alt: 'Фото 2'},
        {src: 'images/photo3.webp', alt: 'Фото 3'},
        {src: 'images/photo4.webp', alt: 'Фото 4'},
        {src: 'images/photo5.webp', alt: 'Фото 5'},
        {src: 'images/photo11.webp', alt: 'Фото 9'},
        {src: 'images/photo12.webp', alt: 'Фото 10'},
        {src: 'images/photo13.webp', alt: 'Фото 11'},
        {src: 'images/photo14.webp', alt: 'Фото 14'}
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


    const swiper = new Swiper('.reviews-slider', {
        loop: true,
        slidesPerView: 3, // По умолчанию на больших экранах показываем 3 слайда
        slidesPerGroup: 3,
        centeredSlides: true, // Центрируем активный слайд
        spaceBetween: 20, // Расстояние между слайдами
        loopedSlides: 3, // Количество дублируемых слайдов для loop
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: { // На телефонах (320px и больше) - 1 слайд
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          768: { // На планшетах (768px и больше) - 2 слайда
            slidesPerView: 1,
            slidesPerGroup: 1
          },
            1024: { // На (1024px и больше) - 2 слайда
                slidesPerView: 2,
                slidesPerGroup: 2
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
 // Собираем обе формы по их id
 const forms = document.querySelectorAll("#contactForm, #bookingForm");

 // Обновленное регулярное выражение для белорусских и российских номеров
 const phonePattern = /^(?:\+375|80|\+7)[\d\s\-()]{8,15}$/;

 // Регулярное выражение для имени (только буквы и пробелы)
 const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;

 forms.forEach(function(form) {
   // Получаем все поля с текстом (для имени) и телефона
   const nameInput = form.querySelector('input[type="text"]');
   const phoneInput = form.querySelector('input[type="tel"]');
   const submitButton = form.querySelector('button[type="submit"]');

   // Функция для обновления состояния кнопки
   function updateSubmitButton() {
     if (nameInput && phoneInput) {
       // Проверяем все условия для имени и телефона
       const isNameValid = namePattern.test(nameInput.value.trim()) && nameInput.value.trim().length >= 2;
       const isPhoneValid = phonePattern.test(phoneInput.value.trim());

       // Если оба поля валидны, делаем кнопку активной
       if (isNameValid && isPhoneValid) {
         submitButton.disabled = false;
       } else {
         submitButton.disabled = true;
       }
     }
   }

   // Валидация для поля имени
   if (nameInput) {
     nameInput.addEventListener("input", function() {
       if (!namePattern.test(nameInput.value.trim()) || nameInput.value.trim().length < 2) {
         nameInput.classList.add("is-invalid");
         nameInput.classList.remove("is-valid");
       } else {
         nameInput.classList.remove("is-invalid");
         nameInput.classList.add("is-valid");
       }
       // Проверяем состояние кнопки после каждого ввода
       updateSubmitButton();
     });
   }

   // Валидация для поля телефона
   if (phoneInput) {
     phoneInput.addEventListener("input", function() {
       if (!phonePattern.test(phoneInput.value.trim())) {
         phoneInput.classList.add("is-invalid");
         phoneInput.classList.remove("is-valid");
       } else {
         phoneInput.classList.remove("is-invalid");
         phoneInput.classList.add("is-valid");
       }
       // Проверяем состояние кнопки после каждого ввода
       updateSubmitButton();
     });
   }

   // Валидация формы при отправке
   form.addEventListener("submit", function(event) {
     let isValid = true;

     // Валидация имени (не менее 2 символов и только буквы)
     if (nameInput && (nameInput.value.trim().length < 2 || !namePattern.test(nameInput.value.trim()))) {
       nameInput.classList.add("is-invalid");
       isValid = false;
     }

     // Валидация телефона
     if (phoneInput && !phonePattern.test(phoneInput.value.trim())) {
       phoneInput.classList.add("is-invalid");
       isValid = false;
     }

     // Если хотя бы одно поле не прошло валидацию, отменяем отправку формы
     if (!isValid) {
       event.preventDefault();
       event.stopPropagation();
     }
   });

   // Изначально кнопка заблокирована
   updateSubmitButton();
 });
     // Обработчик отправки обеих форм
   // Получаем все формы для отправки данных
   const formElements = document.querySelectorAll('#contactForm, #bookingForm');

   formElements.forEach(function(form) {
       form.addEventListener('submit', function(event) {
           event.preventDefault(); // Отменяем стандартное поведение формы

           // Получаем значения из полей формы
           const name = form.querySelector('input[type="text"]').value;
           const phone = form.querySelector('input[type="tel"]').value;

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
                   form.reset();
               } else {
                   // Если произошла ошибка, выводим сообщение
                   alert('Ошибка при отправке сообщения.');
               }
           };

           // Отправляем данные на сервер
           xhr.send(data);
       });
   });

});
