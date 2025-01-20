document.addEventListener('DOMContentLoaded', function() {
    adStatsInit()
    tabsBlockInit();
    slidersInit()
})

function adStatsInit() {
    const adStats = document.querySelectorAll('[data-js="adStat"]');

    if(adStats.length < 1) return

    const ww = window.innerWidth
    let paddings = 8+8
    let gap = 10

    if(ww < 768) {
        
    }

    adStats.forEach(adStat => {
        const adStatRows = adStat.querySelectorAll('[data-js="adStatRow"]')
        let baseWidth = 160
        let maxWidth = 160

        adStatRows.forEach(adStatRow => {
            const adStatName = adStatRow.querySelector('[data-js="adStatName"]')
            const adStatValue = adStatRow.querySelector('[data-js="adStatValue"]')

            let calculatedWidth = adStatName.offsetWidth + adStatValue.offsetWidth + paddings + gap;

            if(calculatedWidth > maxWidth) {
                maxWidth = calculatedWidth
            }
            
        })
        
        if(maxWidth > baseWidth) {
            adStatRows.forEach(adStatRow => {
                adStatRow.style.gridTemplateColumns = `${maxWidth}px auto`
            })
        }
    })
}

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

function slidersInit() {
    const sliders = document.querySelectorAll('[data-js="adPageSlider"]');

    if(sliders.length < 1) return

    
    sliders.forEach(slider => {
        const prevBtn = slider.querySelector('[data-js="adPageSliderPrev"]')
        const nextBtn = slider.querySelector('[data-js="adPageSliderNext"]')
        let adPageSliderEx = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 8,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            }
        })
    })
}