document.addEventListener('DOMContentLoaded', function() {
    tabsBlockInit()
})

function tabsBlockInit() {
    const tabsBlocks = document.querySelectorAll('[data-js="adTabs"]');

    if(tabsBlocks.length < 1) return

    tabsBlocks.forEach(tabsBlock => {
        const tabs = tabsBlock.querySelector('[data-js="tabsBlockTabs"]');
        const slides = tabsBlock.querySelector('[data-js="tabsBlockSlides"]');
    
        let tabsSliderEx = new Swiper(tabs, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            freeMode: true,
        })
    
        let slidesSliderEx = new Swiper(slides, {
            slidesPerView: 1,
            effect: 'fade',
            allowTouchMove: false,
            autoHeight: true,
            thumbs: {
                swiper: tabsSliderEx
            },
        })
    })


}