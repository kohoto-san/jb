// <HOMEPAGE>
    var currentStep = 1;
    var numberSteps = 2;

    $('.step a').click(function(){
        var $step = $(this).parents('.step');
        stepId = $step.data('step');

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

    var animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    function surveyEnd () {

        $survey = $('.survey-wrapper');
        $survey.addClass('survey-rotateSlideOut').on(animEndEventName, function() {
            $survey.off( animEndEventName );
            $('.preloader-wrapper').show();
            loadJobsPage();
        });
    }

    function loadJobsPage(){
        url = '/remote-jobs/';
        history.pushState(null, 'title', url);

        $.get(window.location.href)
            
            .success(function( data ) {
                $('.survey-body').removeClass('survey-body');
                $('.preloader-wrapper').hide();
                $('#main-content').html(data);
                masonryInit();
            }) // success || done
                    
            .fail(function() {
                // $('#load_posts').prepend('<p>Упс...Кажется все посты уже загружены.</p>')
                // $('#load_posts a').addClass('disabled');
            }); // fail
    }
// </HOMEPAGE>


// <JOBS_LIST>

    $('body').on('click', '#btn', function(e) {
        e.preventDefault();
        load();
    });

    var nextUrl = '/jobs/';
    var page = 2;

    function load(){
    
        $.get( window.location.href, {page: page} )
        
            .success(function( data ) {

                var newElems = $( data );
                var $container = $('#grid');
                $container.masonryImagesReveal( newElems );

            }) // success || done
                    
            .fail(function() {
                // $('#load_posts').prepend('<p>Упс...Кажется все посты уже загружены.</p>')
                // $('#load_posts a').addClass('disabled');
            }); // fail

    }

    $.fn.masonryImagesReveal = function( $newElems ) {
        var msnry = this.data('masonry');
        var itemSelector = msnry.options.itemSelector;

        // append to container
        this.append( $newElems );
        msnry.appended( $newElems );
        page += 1;
        // loading('on');
        
        return this;
    };

    if( $(window).width() > 800){
        $(document).ready(function(){
           masonryInit();
        });
        
        // хитрый запуск masonry после события загрузки всех шрифтов
        document.onreadystatechange = function() {
            if (document.readyState === 'complete') 
                masonryInit();
        };
    }

    $(window).resize(function(){
        var msnry = $('#grid').data('masonry');
        msnry.layout();
    });

    /*
    $(window).scroll(function () { 
       if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
            if( !is_loading && !all_post){
                loading('off');
                loadPosts();
            }
       }
    });
    */

// </JOBS_LIST>


// <GLOBAL>

    function masonryInit(){
        $('#grid').masonry({
            itemSelector: '.grid__item',
            columnWidth: 300,
            gutter: 20
        });
    }

// </GLOBAL>