document.addEventListener('DOMContentLoaded', function() {
    adStatsInit();
    tabsBlockInit();
    slidersInit();
    validation()
})

function adStatsInit() {
    const adStats = document.querySelectorAll('[data-js="adStat"]');

    if(adStats.length < 1) return

    let paddings = 8+8
    let gap = 10

    adStats.forEach((adStat, index) => {
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

        if(index == 0) {

            let onStart = false;

            checkStatPosition()

            if(!onStart) {
                window.addEventListener('scroll', checkStatPosition)
            }
            
            function checkStatPosition() {
                let vh = window.innerHeight
                let top = adStat.getBoundingClientRect().top
                let height = adStat.getBoundingClientRect().top

                console.log(top)

                if(vh > top + height * 0.5) {
                    adStatRows.forEach(row => {
                        row.style.maxWidth = '100%'
                    })
                    onStart = true;
                    window.removeEventListener('scroll', checkStatPosition)
                }

            }
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
            spaceBetween: 8,
            freeMode: true,
            breakpoints: {
                768: {
                    spaceBetween: 16
                }
            }
        })
    
        let slidesSliderEx = new Swiper(slides, {
            slidesPerView: 1,
            effect: 'fade',
            allowTouchMove: false,
            autoHeight: true,
            thumbs: {
                swiper: tabsSliderEx
            },
            on: {
                slideChangeTransitionEnd: function(slider) {
                    let currentSlide = slider.slides[slider.realIndex]
                    let currentRows = currentSlide.querySelectorAll('[data-js="adStatRow"]')

                    if(currentRows.length > 0) {
                        currentRows.forEach(row => {
                            row.style.maxWidth = '100%'
                        })
                    }
                }
            }
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

function validation() {

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
                date: /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")
                        errorField.innerHTML = errorText
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")
                        errorField.innerHTML = errorText
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = field.value;
                let spaceTrigger = !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный e-mail').set()
                                }
                                break
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный номер телефона').set()
                                }
                                break                                                         
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Необходимо заполнить это поле").set()
                                }
                        }
                    } else {
                        error(input, 'Необходимо заполнить это поле').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                            if(field.dataset.js === 'formSelect') {
                                field.closest('[data-js="formField"]').classList.remove('field--invalid')
                            }

                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    const formData = new FormData(form);
                    form.reset();

                    //тут можно добавить скрипт открытия окна благодарности
                    for (let [key, value] of formData.entries()) {
                        console.log(key + ': ' + value)
                    }
                    
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()

        })
    })
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
                this.value = val;
            })
        })
    }

}