(function() {
	'use strict';

	// iframe height-resize
	var iframeResize = function() {
		// ページの高さを取得
		var PageHight = document.body.scrollHeight + 0;
		if($inputWrapSub.hasClass('is-open')) {
			PageHight = document.body.scrollHeight + 0;
		} else {
			PageHight = document.getElementById('page-contents').scrollHeight + 0;
		}
		// iframeの高さを変更
		window.parent.document.getElementById('widget-wolf').style.height = PageHight + 'px';
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

	var triggerToggle  = '#js-trigger-toggle',
		$triggerToggle = $(triggerToggle);
	var inputWrapSub  = '#js-input-wrap--sub',
		$inputWrapSub = $(inputWrapSub);

	$triggerToggle.on('click', function() {
		$inputWrapSub.toggleClass('is-open');
		if($inputWrapSub.hasClass('is-open')) {
			$triggerToggle.text('▲ 追加条件を閉じる');
		} else {
			$triggerToggle.text('+ さらに条件をくわえる');
		}
		iframeResize();
	});

	var form = $('#widget-form form');
	form.on('change', function () {
		$.get('/?' + form.serialize()).then(function (response) {
			console.log('send!!')
		});
	}).trigger('change');
})();
