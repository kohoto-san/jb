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
		this.overlay = this.el.querySelector( '.nl-overlay' );
		this.fields = [];
		this.fldOpen = -1;
		this._init();
	}

	NLForm.prototype = {
		_init : function() {

			var self = this;


			var text = [
                {text: 'I am a', type: 'text'},
                {text: ['junior', 'middle', 'senior'], type: 'list'},
                {text: ['Web'], type: 'list'},
                {text: ['Frontend', 'Backend', 'Fullstack'], type: 'list'},
                {text: 'developer.<br />I am comfortable work in a', type: 'text'},
                {text: ['Small (1-10)', 'Medium (10-100)', 'Big (>100)'], type: 'list'},
                {text: '<br /> team on a project that has', type: 'text'},
                {text: ['Highload', 'Mediumload', 'Lowload'], type: 'list'},
            ];


			for (let item of text) {
                if(item['type'] == 'text'){
                    // var meta_html = element.html();
                    // element.html(meta_html + item['text']);
                    // writeChar(item['text']);
                    // this.el.innerHTML += item['text'];

                    for (let char of item['text']) {
	                    setTimeout(this._writeChar(char), 100);
	                }
                }

                if(item['type'] == 'list'){
                    this.el.innerHTML += ' ';
                    self._writeList(item['text']);
                    this.el.innerHTML += ' ';
                }
            }


			Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
				self.fldOpen++;
				self.fields.push( new NLField( self, el, self.fldOpen ) );
			} );


			// Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
			// 	self.fldOpen++;
			// 	self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
			// } );
			
			this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
			this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
		},
		_closeFlds : function() {
			if( this.fldOpen !== -1 ) {
				this.fields[ this.fldOpen ].close();
			}
		},

		_writeChars : function(chars){
            timerWrite = setInterval("writeChar()", 100);
            n = 0;
		},

		_writeChar : function(char){
			this.el.innerHTML += char;
		},

		_writeList : function(elements){
                // select = $('<select></select>')
                this.select = document.createElement( 'select' );
                for (let item of elements) {
                    // meta = $('<option value=' + item + '>' + item + '</option>');
                    // select.append(meta);
                    this.select.innerHTML += '<option value=' + item + '>' + item + '</option>';
                }

                this.el.appendChild(this.select);
        }
	}

	// function NLField( form, el, idx, type='dropdown' ) {
	function NLField( form, el, idx ) {
		this.form = form;
		this.elOriginal = el;
		this.pos = idx;
		// this.type = type;
		// this._create();
		this._createDropDown();
		this._initEvents();
	}

	NLField.prototype = {
		// _create : function() {
		// 	this._createDropDown();	
		// },
		_createDropDown : function() {
			var self = this;
			this.fld = document.createElement( 'div' );
			this.fld.className = 'nl-field nl-dd';
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML;
			this.toggle.className = 'nl-field-toggle';
			this.optionsList = document.createElement( 'ul' );
			var ihtml = '';
			Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
				ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
				// selected index value
				if( self.elOriginal.selectedIndex === i ) {
					self.selectedIdx = i;
				}
			} );
			this.optionsList.innerHTML = ihtml;
			this.fld.appendChild( this.toggle );
			this.fld.appendChild( this.optionsList );
			this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
			this.elOriginal.style.display = 'none';
		},
		
		_initEvents : function() {
			var self = this;
			this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
			this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );

			// if( this.type === 'dropdown' ) {
			var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
			opts.forEach( function( el, i ) {
				el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
				el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
			} );
			// }

		},
		_open : function() {
			if( this.open ) {
				return false;
			}
			this.open = true;
			this.form.fldOpen = this.pos;
			var self = this;
			this.fld.className += ' nl-field-open';
		},
		close : function( opt, idx ) {
			if( !this.open ) {
				return false;
			}
			this.open = false;
			this.form.fldOpen = -1;
			this.fld.className = this.fld.className.replace(/\b nl-field-open\b/,'');

			// if( this.type === 'dropdown' ) {
				if( opt ) {
					// remove class nl-dd-checked from previous option
					var selectedopt = this.optionsList.children[ this.selectedIdx ];
					selectedopt.className = '';
					opt.className = 'nl-dd-checked';
					this.toggle.innerHTML = opt.innerHTML;
					// update selected index value
					this.selectedIdx = idx;
					// update original select element´s value
					this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;
				}
			// }
			
		}
	}

	// add to global namespace
	window.NLForm = NLForm;

} )( window );