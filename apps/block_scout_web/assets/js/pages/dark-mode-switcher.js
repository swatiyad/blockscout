import $ from 'jquery'
import Cookies from 'js-cookie'

$('.dark-mode-changer-btn').on('click', function() {
    $(this).find('.fa-moon,.fa-sun').toggleClass('fa-moon').toggleClass('fa-sun')
    if (Cookies.get('chakra-ui-color-mode') === 'dark') {
        Cookies.set('chakra-ui-color-mode', 'light')
       
    } else {
        Cookies.set('chakra-ui-color-mode', 'dark')
       
    }
    // reload each theme switch
    document.location.reload(true)
})

