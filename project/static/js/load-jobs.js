
$('body').on('click', '#btn', function(e) {
    e.preventDefault();
    load();
});

var nextUrl = '/jobs/';
var page = 2;
var all_post = false;
var is_loading = false;

$(window).scroll(function () { 
   if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
        if( !is_loading && !all_post){
            console.log('loading!');
            loading('off');
            load();
        }
   }
});

function loading(turn){
    // Когда посты загружены включить возможность загрузить ещё
    if(turn == 'on'){
        // $('#load_posts a').removeClass('disabled');
        $('.preloader-more-jobs').hide();
        is_loading = false;
    }
    // Когда посты начали грузиться выключить возможность загрузить ещё
    else if(turn == 'off'){
        // $('#load_posts a').addClass('disabled');
        $('.preloader-more-jobs').show();
        is_loading = true;
    }
}

function load(){

    $.get( window.location.href, {page: page} )
    
        .success(function( data ) {

            var newElems = $( data );
            var $container = $('#grid');
            $container.masonryImagesReveal( newElems );

        }) // success || done
                
        .fail(function() {
            all_post = true;
            loading('on');

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
    loading('on');
    
    return this;
};

