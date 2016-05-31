(function() {
	'use strict';

	// iframe height-resize
	var iframeResize = function() {
		// ページの高さを取得
		var PageHight = document.body.scrollHeight + 0;
		if($uiListPair.hasClass('is-open')) {
			PageHight = document.body.scrollHeight + 0;
		} else {
			PageHight = document.getElementById('page-contents').scrollHeight + 0;
		}
		// iframeの高さを変更
		window.parent.document.getElementById('widget-falcon').style.height = PageHight + 'px';
	};
	window.onload = iframeResize;


	var pickupRadio  = '.js-pickup_radio',
		$pickupRadio = $(pickupRadio);

	$pickupRadio.on('click', function() {
		var $this = $(this);
		if($this.hasClass('chkRadio')) {
			$('.chkRadio').removeClass('chkRadio');
			$this.prop('checked', false);
			form.trigger('change');
		} else {
			$('.chkRadio').removeClass('chkRadio');
			$this.addClass('chkRadio');
			$this.prop('checked', true);
		}
	});

	var radio  = '.js-radio',
		$radio = $(radio);

	$radio.on('click', function() {
		var $this = $(this);
		if($this.hasClass('chkRadio')) {
			$('.chkRadio').removeClass('chkRadio');
			$this.prop('checked', false);
			form.trigger('change');
		} else {
			$('.chkRadio').removeClass('chkRadio');
			$this.addClass('chkRadio');
			$this.prop('checked', true);
		}
	});

	var btnToggle  = '.js-btn-toggle',
		$btnToggle = $(btnToggle);
	var uiListPair = '.js-ui-list--pair',
		$uiListPair = $(uiListPair);

	$btnToggle.on('click', function() {
		$uiListPair.toggleClass('is-open');
		if($uiListPair.hasClass('is-open')) {
			$btnToggle.text('ペアを閉じる');
		} else {
			$btnToggle.text('ペアを開く');
		}
		setTimeout(function(){
			iframeResize();
		}, 300);
	});

	var form = $('#widget-form form');
	form.on('change', function () {
		$.get('/?' + form.serialize()).then(function (response) {
			console.log('send!!')
		});
	}).trigger('change');
})();
