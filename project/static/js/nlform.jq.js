/**
 * nlform.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
    
    'use strict';

    var document = window.document;

    if (!String.prototype.trim) {
        String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    }

    function NLForm( el ) { 
        this.el = el;
        this.overlay = this.el.find('.nl-overlay').get(0);
        this.fields = [];
        this.fldOpen = -1;
        this.i = 0;
        this.parametrs = '';
        this._init();
    }

    NLForm.prototype = {
        _init : function() {
            var self = this;

            this.text = [
                {text: 'I am a', type: 'text'},
                {text: ['junior', 'middle', 'senior'], type: 'list', parametr: 'exp'},
                // {text: ['Web'], type: 'list'},
                {text: ['Web/Frontend', 'Web/Backend', 'Web/Fullstack', "Mobile/CrossPlatform", "Mobile/iOS", "Mobile/Android"], type: 'list', parametr: 'scope'},
                {text: 'developer. I am comfortable work in a', type: 'text'},
                {text: ['Small (1-10)', 'Medium (10-100)', 'Big (>100)'], type: 'list', parametr: 'team'},
                {text: 'team on a project that has', type: 'text'},
                {text: ['Highload', 'Mediumload', 'Lowload'], type: 'list', parametr: 'load'}
            ];
            this.charIndex = 0;
            this.parse();

            // this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
            // this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
        },

        parse : function(){
            var self = this;

            if(self.i < self.text.length){
                var item = self.text[self.i];

                if(item['type'] == 'text'){
                    // self.timerWrite = setInterval(self._writeChars(item['text']), 100);

                    var timerId = setTimeout(function tick() {
                        var meta_html = self.el.html()
                        var new_char = item['text'].charAt(self.charIndex);
                        self.el.html(meta_html + new_char)
                        self.charIndex += 1;

                        if(self.charIndex >= item['text'].length){
                            self.charIndex = 0;
                            self.i++;
                            self.parse();
                        }
                        else
                            timerId = setTimeout(tick, 60);
                    }, 60);

                    self.charIndex = 0;
                }
                else if(item['type'] == 'list'){
                    self.fldOpen++;
                    var field = new NLField(self, self.el, item['text'], self.fldOpen, item['parametr']);
                    // self.fields.push(new NLField(self, self.el, item['text'], self.fldOpen));
                    // self.parse(i+1);
                }
            }
            else{
                // similar behavior as clicking on a link
                // window.location.href = "/remote-jobs"
                new homepageEnd(self.parametrs);

            }
        },

        _closeFlds : function() {
            if( this.fldOpen !== -1 ) {
                this.fields[ this.fldOpen ].close();
            }
        }

        // _writeChars : function(chars){
        //     if(this.charIndex >= chars.length){
        //         clearInterval(this.timerWrite);
        //         // setTimeout(writeStart, 500);
        //     }
        //     else{
        //         this.el.innerHTML += chars.charAt(this.charIndex)
        //         this.charIndex += 1;
        //     }
        // },
    }

    function NLField( form, formEl, el, idx, param ) {
        this.form = form;
        this.formEl = formEl;
        this.items = el;
        this.pos = idx;
        this.param = param;
        this._createDropDown(); 
        this._initEvents();
    }

    NLField.prototype = {
        _createDropDown : function() {
            var self = this;
            this.fld = $('<div></div>');
            this.fld.attr('id', 'fld-'+this.pos);
            this.fld.addClass('nl-field nl-dd');
            
            this.toggle = $('<a></a>');
            this.toggle.hide();
            this.toggle.html(this.items[0]);
            this.toggle.addClass('nl-field-toggle');
            this.toggle.attr("fld", this.pos);
            
            this.optionsList = $('<ul></ul>');
            var ihtml = '';
            Array.prototype.slice.call(this.items).forEach(function(el, i){
                // selected index value
                if(i === 0){
                    ihtml += '<li class="nl-dd-checked">' + el + '</li>';
                    self.selectedIdx = i;
                }
                else{
                    ihtml += '<li>' + el + '</li>';
                }
            });
            this.optionsList.html(ihtml);
            this.fld.append(this.toggle);
            this.fld.append(this.optionsList);

            this.formEl.append(this.fld);
            this.open = true;
            setTimeout(function(){
                self.fld.addClass('nl-field-open');
                self.toggle.show();
            }, 300);
            // this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
            // this.elOriginal.style.display = 'none';
        },
        _initEvents : function() {
            var self = this;

            this.formEl.on('click touchstart', '.nl-field-toggle', function(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                var fld_id = $(this).attr('fld');
                self._open(fld_id);
            });

            self.formEl.on('click touchstart', '.nl-field li', function(ev){
                ev.preventDefault();
                self.close($(this));
            });
        },
        _open : function(idx) {
            if( this.open ) {
                return false;
            }
            this.open = true;
            this.form.fldOpen = idx;
            // this.fld.addClass('nl-field-open');
            $('#fld-'+idx).addClass('nl-field-open');
        },
        close : function(opt) {
            if( !this.open ) {
                return false;
            }
            this.open = false;
            this.form.fldOpen = -1;

            if(opt) {
                var field = opt.parents('.nl-field');
                field.removeClass('nl-field-open');

                // remove class nl-dd-checked from previous option
                opt.parent('ul').children().removeClass();

                // update original select element´s value
                opt.addClass('nl-dd-checked');
                opt.parent('ul').siblings('a').html(opt.html());
            }

            this.form.parametrs += this.param + '=' + opt.text() + '&';

            this.form.i++;
            this.form.parse();
        }
    }

    function homepageEnd(parametrs){
        this.animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        // animation end event name
        this.animEndEventName = this.animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
        this.parametrs = parametrs;

        this.surveyEnd();
    }

    homepageEnd.prototype = {
        surveyEnd : function () {

            var self = this;
            var $survey = $('.survey-wrapper');
            
            $survey.addClass('survey-rotateSlideOut').on(this.animEndEventName, function() {
                // $survey.off(this.animEndEventName);
                $('.preloader-wrapper').show();
                self.loadJobsPage();
            });
        },

        loadJobsPage : function(){

             var urlParametrs = '';

            if(this.parametrs.charAt(this.parametrs.length-1) == '&'){
                urlParametrs = this.parametrs.substring(0, this.parametrs.length - 1);
            }
            var url = '/remote-jobs/?' + urlParametrs;
            history.pushState({content_url: url}, '', url);
            

            $.get(window.location.href)
                
                .success(function( data ) {
                    $('.survey-body').removeClass('survey-body');
                    $('.preloader-wrapper').hide();
                    $('#main-content').html(data);
                    $.masonryInit();
                }) // success || done
                        
                .fail(function() {
                    // $('#load_posts').prepend('<p>Упс...Кажется все посты уже загружены.</p>')
                    // $('#load_posts a').addClass('disabled');
                }); // fail
        }
    }

    // add to global namespace
    window.NLForm = NLForm;

} )( window );