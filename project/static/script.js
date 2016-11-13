// <GLOBAL>

    jQuery.masonryInit = function masonryInit(){

        var itemWidth = ($('#grid').width() / 3) - 30;
        $('.grid__item').each(function(index){
            $(this).css('width', itemWidth + 'px');
        });

        $('#grid').masonry({
            itemSelector: '.grid__item',
            columnWidth: itemWidth,
            gutter: 30
        });
    }

// </GLOBAL>

// <HOMEPAGE>
    var currentStep = 1;
    var numberSteps = 2;

    $('.step a').click(function(){
        var $step = $(this).parents('.step');
        var stepId = $step.data('step');

        if(stepId == numberSteps){
            surveyEnd();
            // history.pushState({foo: 'bar'}, 'Title', '/remote-jobs');
        }
        else{
            toggleStep(stepId);
        }

    });

    function toggleStep(currentStep){

        var nextStep = currentStep + 1;
        hideStep(currentStep);
        showStep(nextStep);
        
    }

    function hideStep(stepId){

        var $step = $('.step-' + stepId);
        $step.fadeOut("slow", function(){
            return true;
        });

        /*
        $step.animate({
            marginTop: '-200vh'
        }, {
            duration: 10000,
            complete: function() {
                $step.hide();
                return true;
            }
        });
        */
    }

    function showStep(stepId){
        var $step = $('.step-' + stepId);
        $step.fadeIn("slow", function(){
            return true;
        });

        /*
        $step.animate({
            marginTop: '0'
        }, {
            duration: 10000,
            complete: function() {
                return true;
            }
        });
        */
    }
// </HOMEPAGE>


// <JOBS_LIST>

    if( $(window).width() > 800){
        $(document).ready(function(){
            $.masonryInit();
        });
        
        // хитрый запуск masonry после события загрузки всех шрифтов
        document.onreadystatechange = function() {
            if (document.readyState === 'complete') 
                $.masonryInit();
        };
    }

    $(window).resize(function(){
        var msnry = $('#grid').data('masonry');
        if(msnry)
            msnry.layout();
    });

    $('#main-content').on('click', '.grid__item .view-job', function(e) {
        e.preventDefault();
        // var url = $(this).find('a.card-body').attr('href');
        var url = $(this).attr('href');
        $('body').addClass('job-show');
        $('#job-details-ajax .preloader').show();

        $.ajax({
            url: url + '?ajax=true',
            // cache: false
        }).done(function (response) {
            // $mainContent.hide();
            // $('#job-details-ajax').fadeIn({duration: 200});
            $('#job-details-ajax .preloader').hide();
            $('#job-details-ajax .job-content').html(response);
            $('.tooltipped').tooltip();

            // bindButtons();

            history.pushState({content_url: url, prev_url: document.location.href}, '', url);
        });
    });

    $('#job-details-ajax .close').click(function(e){
        e.preventDefault();
        $('#job-details-ajax .job-content').html('');
        $('.job-show').removeClass('job-show');

        var prev_url = history.state.prev_url;
        history.pushState({content_url: prev_url, prev_url: document.location.href}, '', prev_url);

        // $('#job-details-ajax').hide();
    });


// </JOBS_LIST>
