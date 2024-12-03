
$(document).ready(function(){
    priceControl('.selectBox.detail .optionItem');

    init();
    
    updateTouchEnable();
    menuScroll();
    initSliders();

    panelControl('[class^="panel"] input');
    panelControl('header input');
    panelControl('input.btn_CheckList');
    panelControl('.forgot');
    panelControl('.successPopup');
    panelControl('.orderclose');
    panelControl('.btn_login.check');
    panelControl('.detailOrder');
    panelControl('.btn_activeControll');
    panelControl('.addMessageBox input');
    panelControl('.backMenu');

    priceControl('.btn_productOption');
    
    buttonControl('.btn_productOption');
    buttonControl('.selectBox.detail .optionItem');
    buttonControl('.btn_colorOption');
    buttonControl('.btn_fabricColor');
    buttonControl('.productTitle input');
    buttonControl('.productTitle button');
    buttonControl('.payment');
    buttonControl('.btn_stepperOption');
    buttonControl('.footerContent h2');
    buttonControl('.btn_frequently');

    

    changeImg('.btn_productOption');
    changeImg('.btn_colorOption');
    changeImg('.selectBox.detail .optionItem');

    
    numberText();
    textScroll();
    filterReset();



});

function init(){
    updateItemTotal();
    updateTotalPrice();
    selectBoxCustom();
    togglePW();
    toggleEdit();
    loginControl();
    setTimeAdd();
}

function updateTouchEnable(){
    var windowWidth = $(window).width();
    var touchEnabledVal = windowWidth >= 1279;

    customizeSlider(".bxslider", "horizontal", false, true, false, true, 752, 0, 1, 1, 0, null, touchEnabledVal);
    customizeSlider(".detailSlider", "horizontal", true, false, false, false, 400, 10, 6, 1, 0, null, touchEnabledVal);
    customizeSlider(".detailSlider2", "horizontal", true, false, false, true, 600, 10, 3, 1, 0, null, touchEnabledVal);

    if(windowWidth < 768){
        $('.colorOption>ul>li:first-of-type').addClass('active');
        $('.colorCheck .optionItem:first-of-type').addClass('active');
    }

}
function initSliders(){
    customizeRangeBar('.seatingCheck #sliderRange', 66, 9431, [66, 9431]);
    customizeRangeBar('.deskCheck #sliderRange', 114, 5348, [114, 5348]);
    customizeRangeBar('.storageCheck #sliderRange', 13, 3562, [13, 3562]);
    customizeRangeBar('.accessoriesCheck #sliderRange', 32, 1601, [32, 1601]);
}



function customizeSlider(target,mod,contVal,pagerVal,atVal,infinival,slideW,slideM,maxSlide,minSlide,startSlide,csPager,touchEnabledVal){
        $(target).bxSlider({
        mode: mod,
        controls: contVal,
        pager: pagerVal,
        auto: atVal,
        infiniteLoop: infinival,
        slideWidth: slideW,
        slideMargin: slideM,
        maxSlides: maxSlide,
        minSlides: minSlide,
        startSlide: startSlide,
        pagerCustom: csPager,
        touchEnabled: touchEnabledVal
    });
}

function customizeRangeBar(target, minVal, maxVal, startVals){
    $(target).slider({
        range: true,
        min: minVal,
        max: maxVal,
        values: startVals,
        slide: function(e, ui){
            $(target).closest('.panel').find("#minRange").val("$" + ui.values[0] + ".00");
            $(target).closest('.panel').find("#maxRange").val("$" + ui.values[1] + ".00");
        }
    });
    $(target).closest('.panel').find("#minRange").val("$" + $(target).slider("values", 0) + ".00");
    $(target).closest('.panel').find("#maxRange").val("$" + $(target).slider("values", 1) + ".00");
}

function panelControl(openBtn){
    var currentPanel = '';
    
    $(openBtn).click(function(){
        var panelName = $(this).attr('data-panelName');
        currentPanel = $("[class*='" + panelName + "']");
        
        if(currentPanel.hasClass('active')){
            if($(this).hasClass('btn_activeControll')) {
                currentPanel.removeClass('active');
                $(this).text('More Detail');
            }else if($(this).hasClass('backMenu') || $(this).is('.mainCatecories input')){
                currentPanel.css('animation', 'slideRight 0.8s ease forwards');
                $('.mainCatecories').removeClass('active');
                setTimeout(function(){
                    currentPanel.removeClass('active');
                    currentPanel.css('animation', '');
                }, 600);
            }else{
                currentPanel.removeClass('active');
            }
        }else if($(this).is('input[value="delete"]')){
            $(this).closest('li').remove();
            if($('#cartHave ul li').length === 0){
                $('#cartHave').removeClass('active');
                $('#cartEmpty').addClass('active');
            }
        }else if(panelName === 'cartHave' && $('#cartHave ul li').length === 0){
            $('#cartEmpty').addClass('active');
        }else{
            if($(this).hasClass('btn_activeControll')){
                $(this).text('Less Detail');
            }else if($(this).is('.mainCatecories input')){
                $('.mainCatecories').addClass('active');
            }
            currentPanel.siblings('.active').removeClass('active');
            currentPanel.addClass('active');
        }
        
    });
}
function priceControl(priceBtn){
    $(priceBtn).click(function() {
        if($(this).hasClass('active')){
            return;
        }
        var selectedPriceChange = parseFloat($(this).find('output').attr('data-price'));
        var currentPrice = parseFloat($('.detailPrice output').attr('data-price'));

        var previousActiveButton = $(this).siblings('.active');
        if (previousActiveButton.length > 0) {
            var previousPriceChange = parseFloat(previousActiveButton.find('output').attr('data-price'));
            currentPrice -= previousPriceChange;
            previousActiveButton.removeClass('active');
        }

        var updatedPrice = currentPrice + selectedPriceChange;
        $('.detailPrice output').attr('data-price', updatedPrice);
        $('.detailPrice output').text('$' + updatedPrice.toLocaleString());
    });
}
function buttonControl(priceBtn){
    
    var currentPanel = '';
    
    $(priceBtn).click(function(){
        
        var panelName = $(this).attr('data-panelName');
        currentPanel = $("[class*='" + panelName + "']");
        var windowWidth = $(window).width();
        
        if($(this).hasClass('optionItem') && $(this).closest('.colorCheck').length > 0){
            if(windowWidth >= 768){
                $('.colorCheck .optionItem').removeClass('active');
                $('.colorOption>ul>li.active').removeClass('active');
                $(this).addClass('active');
            }
            $(this).addClass('active');
        }else if($(this).closest('div').hasClass('colorOption')){
            $(this).closest('div').find('button').removeClass('active');
            $(this).addClass('active');
        }else if($(this).hasClass('btn_fabricColor')){
            $(this).toggleClass('active');
        }else if($(this).hasClass('btn_stepperOption')){
            $('.btn_stepperOption').removeClass('active');
            $(this).addClass('active');
        }else if($(this).closest('ul').hasClass('faqMenuSlider')){
            $('li.colorCheck button').removeClass('active');
            $(this).addClass('active');
        }else if($(this).closest('li').hasClass('footerContent')){
            $(this).siblings('ol').toggleClass('active');
            $(this).toggleClass('active');
        }else{
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
        }
        currentPanel.siblings('.active').removeClass('active');
        currentPanel
        .css('opacity', 0)
        .addClass('active')
        .animate({ opacity: 1 }, 100);
    });
}


function updateItemTotal(){
    $('.increase, .decrease').off('click').on('click', function(){
        var button = $(this);
        var parentElement = button.closest('li, .detailPrice');
        var quantityElement = parentElement.find('.quantity');
        var currentQuantity = parseInt(quantityElement.text());
        var pricePerItem = parseFloat(parentElement.find('output').attr('data-price'));

        if(button.hasClass('increase') && currentQuantity < 99){
            currentQuantity += 1;
        }else if(button.hasClass('decrease') && currentQuantity > 1){
            currentQuantity -= 1;
        }
        
        quantityElement.text(currentQuantity);

        var itemTotal = currentQuantity * pricePerItem;
        parentElement.find('output').text('$' + itemTotal.toLocaleString());

        updateTotalPrice();
    }
);
}

function updateDetailPrice(button){
    $(button).click(function(){
        var selectedPriceChange = parseFloat($(this).find('output').attr('data-price'));
        var currentPrice = parseFloat($('.detailPrice output').attr('data-price'));

        var previousActiveButton = $(this).siblings('.active');
        if(previousActiveButton.length > 0){
            var previousPriceChange = parseFloat(previousActiveButton.find('output').attr('data-price'));
            currentPrice -= previousPriceChange;
            previousActiveButton.removeClass('active');
        }

        var updatedPrice = currentPrice + selectedPriceChange;
        $('.detailPrice output').attr('data-price', updatedPrice);
        $('.detailPrice output').text('$' + updatedPrice.toLocaleString());
        $(this).addClass('active');

        updateTotalPrice();



    });
}

function updateTotalPrice() {
    var total = 0;

    $('#cartHave ul li').each(function() {
        var itemQuantity = parseInt($(this).find('.quantity').text());
        var itemPricePerUnit = parseFloat($(this).find('output').attr('data-price'));
        total += itemQuantity * itemPricePerUnit;
    });

    $('.totalOutput').text('$' + total.toLocaleString());
}



function changeImg(button){
    $(button).click(function(){
        var dataSrc = $(this).attr('data-src');
        if(dataSrc){
            var imgElement = $('.detailMainImg img');
            var oldSrc = imgElement.attr('src');
            var newSrc = oldSrc.replace(/(images\/detail)(.*)/, '$1' + dataSrc + '.png');
            
            imgElement.attr('src', newSrc);
        }
    });
}


function selectBoxCustom(){

    if($('.selectBox').hasClass('detail') && $(window).width() >= 768){
        
        $('.selectBox.selectBox>div').addClass('active');

        return;
    }else{
        $('.selectBox').click(function(e){
            e.stopPropagation();
            $(this).find('>div').toggleClass('active');
        });
        $('.optionItem').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active')
    
            var selectedHTML = $(this).html();
    
            $(this).closest('.selectBox').find('.label').html(selectedHTML)
            $(this).closest('.selectBox').closest('div').removeClass('active');
    
        });
    
        $(document).click(function(){
            $('.selectBox>div').removeClass('active');
        });

    }

}

function setTimeAdd(){
    var addBtn = $('.btn_addCart')
    
    addBtn.click(function(){   
        $('.addMessageBox').stop(true).fadeIn(500).css('opacity', 1);      
        setTimeout(function(){
            $('.addMessageBox').fadeOut(500, function(){
                $(this).css('opacity', 0);
            });
        }, 5000);
    });

}

function togglePW(){
    var target = $('.toggleVisible');
    var toggleStatus = false;

    target.click(function(){
        var toggleInput = $(this).siblings('input');
        toggleStatus = !toggleStatus;

        if(toggleStatus == true){
            $(this).text('visibility');
            toggleInput.attr('type', 'text');
        }else{
            $(this).text('visibility_off');
            toggleInput.attr('type', 'password');
        }
    });

}

function toggleEdit(){
    var target = $('.accountEdit');
    var toggleStatus = false;
    
    target.click(function(){
        toggleStatus = !toggleStatus;

        if(toggleStatus == true){
            target.text('Check')
            $('.myCountContainer input').prop('readonly', false);
            $('.password .toggleVisible').css('display', 'block');
        }else{
            target.text('Edit')
            $('.myCountContainer input').prop('readonly', true);
            $('.password .toggleVisible').css('display', 'none');
        }

    });
}

function loginControl(){

    var windowWidth = $(window).width();

    if(windowWidth >= 768){
        if(localStorage.getItem('loggedIn') === 'true'){
            $('#loginLink').text('My Page').removeAttr('href');
        }else{
            $('#loginLink').text('Login').attr('href', 'loginPage.html');
        }
        
        $('button.successLogin').click(function(e){
            e.preventDefault();

            localStorage.setItem('loggedIn', 'true');
            $('#loginLink').text('My Page').removeAttr('href');
            window.location.href = 'index.html';

        });

        $('#logoutLink').click(function(e){
            e.preventDefault();
            if(localStorage.getItem('loggedIn') === 'true'){
                localStorage.removeItem('loggedIn');
                $('#loginLink').text('Login').attr('href', 'loginPage.html');
                location.reload();
            }
        });

        $('#loginLink').click(function(e){
            if($(this).text() === 'My Page'){
                e.preventDefault();
                $('#myPageOption').toggleClass('active');
            }
        });
    }else{
        if(localStorage.getItem('loggedIn') === 'true'){
            $('#loginLink input.login').val('person');
            $('#loginLink').removeAttr('href');
        }else{
            $('#loginLink input.login').val('login');
            $('#loginLink').attr('href', 'loginPage.html');
        }

        $('button.successLogin').click(function(e){
            e.preventDefault();

            localStorage.setItem('loggedIn', 'true');
            $('#loginLink input.login').val('person');
            $('#loginLink').removeAttr('href');
            window.location.href = 'index.html';
        });

        $('#logoutLink').click(function(e){
            e.preventDefault();
            if(localStorage.getItem('loggedIn') === 'true'){
                localStorage.removeItem('loggedIn');
                $('#loginLink input.login').val('login');
                $('#loginLink').attr('href', 'loginPage.html');
                location.reload();
            }
        });

        $('#loginLink').click(function(e){
            if($('#loginLink input.login').val() === 'person'){
                e.preventDefault();
                $('#myPageOption').toggleClass('active');
            }
        });

    }

    $(document).click(function(e){
        if(!$(e.target).closest('#loginLink, #myPageOption').length){
            $('#myPageOption').removeClass('active');
        }
    });
    
}


function numberText(){
    $('.number').on('keydown', function(e){
        var allowedKeys = [8, 9, 37, 38, 39, 40, 46];
        var numberKeys = (e.key >= '0' && e.key <= '9') || (e.key >= 'Numpad0' && e.key <= 'Numpad9');
        

        $('.month').on('input', function(){
            var value = parseInt(this.value, 10);
            if(value > 12){
                this.setCustomValidity("Month must be between 01 and 12");
                this.reportValidity();
                setTimeout(() => {
                    this.value = '12';
                    this.setCustomValidity("");
                }, 800);
            }else{
                this.setCustomValidity("");
            }
        });
        $('.year').on('input', function(){
            var value = parseInt(this.value, 10);
            if(value < 1900 || value > 2024){
                setTimeout(() => {
                    var newValue = parseInt(this.value, 10);
                    if(newValue > 2024){
                        this.value = '2024';
                    }else if(newValue < 1900){
                        this.value = '1900';
                    }
                    this.setCustomValidity("");
                }, 1800);
                this.setCustomValidity("Year must be between 1900 and 2024");
                this.reportValidity();
            }else{
                this.setCustomValidity("");
            }
        });

        if(!numberKeys && !allowedKeys.includes(e.keyCode)){
            return false;
        }
    });
    
    $('.number').on('paste', function(e) {
        var pastedData = e.originalEvent.clipboardData.getData('text');
        if (!/^\d+$/.test(pastedData)) {
            e.preventDefault();
        }
    });

}


function textScroll(){
    $('#comments').on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

function menuScroll(){
    var header = $('header');
    var h1 = $('header > h1');

    $(window).on('scroll', function() {
        if($(window).scrollTop() >= h1.height()){
            header.addClass('sticky');
        }else{
            header.removeClass('sticky');
        }
    });
}

function filterReset(){
    $('button[type="reset"]').click(function(){
        var slider = $(this).closest('div').find('#sliderRange');
        if($(this).hasClass('filterAll')){
            initSliders();
            $('.brandCheck input').prop('checked', false);
        }else{
            if(slider.length > 0){
                initSliders();
            }else if($(this).closest('ul.brandCheck')){
                    $('.brandCheck input').prop('checked', false);
            }
        }
        

    });
    
}