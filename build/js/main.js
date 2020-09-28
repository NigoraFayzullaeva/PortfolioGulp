$(() => {
    $('.open_btn-menu').on('click', () => {
        $('.menu').addClass('active');
    })
    $('.menu_btn').on('click', () => {
        $('.menu').removeClass('active');
    })

    $('.portfolio_tabs-content').not('.active').hide();
    $('.portfolio_tabs-link a').on('click', function(e){
        e.preventDefault();
        $('.portfolio_tabs-link a')
            .removeClass('active')
            .eq($(this).index())
            .addClass('active');

        $('.portfolio_tabs-content')
            .removeClass('active')
            .hide()
            .eq($(this).index())
            .addClass('active')
            .fadeIn();
    })

    $(window).on('scroll', function(){
        if($(this).scrollTop() > 100){
            $('.open').addClass('scroll');
        }else{
            $('.open').removeClass('scroll');
        }
    })

    function slider(set){
        let btnLeft = set.querySelector('.posts_btn-left');
        let btnRight = set.querySelector('.posts_btn-right');
        let items = set.querySelectorAll('.posts_item');
        let i = 0;

        btnLeft.addEventListener('click', function(){
            items[i].classList.remove('active');
            i--;
            if(i <= 0){i = items.length - 1}
            items[i].classList.add('active');
        })

        btnRight.addEventListener('click', function(){
            items[i].classList.remove('active');
            i++;
            if(i >= items.length){i = 0}
            items[i].classList.add('active');
        })
    }

    let sliders = document.querySelectorAll('.posts');
    for (let i of sliders) {
        new slider(i);
    }
})