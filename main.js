const swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }

    }
);


function carrinho (){
    const card = document.getElementById(carrinho)
}
