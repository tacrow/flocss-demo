(function() {
	console.log('common.js');

	var $DOC = $(document);

	var body  = 'body, html';
	var $body = $(body);

	var pageMain  = '#page-main';
	var $pageMain = $(pageMain);

	var pageForm  = '#page-form';
	var $pageForm = $(pageForm);

	if($pageMain.length > 0) {
		var listCnt  = '.js-cnt-list';
		var $listCnt = $(listCnt);
		var link  = '.js-link';
		var $link = $(link);
		var btnCloseModal  = '.js-btn-close-modal';
		var $btnCloseModal = $(btnCloseModal);
		var blackLayer  = '.js-black-layer';
		var $blackLayer = $(blackLayer);
		var data;
		var $modal;
		var $target;

		// modal - open/close
		$DOC.on('click', listCnt, link, function() {
			data    = $(this).attr('data-item');
			$modal  = $('#' + data);
			$target = data;
			$body.addClass('lock');
			$modal.fadeIn(250);
			$blackLayer.fadeIn(250);
			// data-modalに値を設定
			$blackLayer.attr('data-modal', $target);
		});
		$DOC.on('click', btnCloseModal, function() {
			$(this).closest('.l-content-modal').fadeOut(250);
			$body.removeClass('lock');
			$blackLayer.fadeOut(250);
		});
		$DOC.on('click', blackLayer, function() {
			data   = $blackLayer.attr('data-modal');
			$modal = $('#' + data);
			$body.removeClass('lock');
			$modal.fadeOut(250);
			$blackLayer.fadeOut(250);
		});
	}

	if($pageForm.length > 0) {
		var checkbox = '.js-checkbox';
		var $checkbox = $(checkbox);
		var label = '.c-input-label'
		var $label = $(label);

		$DOC.on('click', checkbox, function() {
			$(this).closest('.c-input-label').toggleClass('is-active');
		});
	}

	// slider
	// var sliderPointer = '#js-slider_pointer';
	// var $sliderPointer = $(sliderPointer);
	// var sliderBarLeft = '#js-slider_bar_left';
	// var $sliderBarLeft = $(sliderBarLeft);
	// var sliderBarRight = '#js-slider_bar_right';
	// var $sliderBarRight = $(sliderBarRight);
	// var dragging = false;

	// $DOC.on('mousedown', sliderPointer, function(event) {
	// 	dragging = true;
	// 	onMouseMove();
	// });

	// $DOC.on('mouseup', sliderPointer, function(event) {
	// 	if (dragging) {
	// 		dragging = false;
	// 	}
	// });

	// var onMouseMove = function() {
	// 	$DOC.on('mousemove', sliderPointer, function(event) {
	// 		var pointer = event.clientY;
	// 		$sliderPointer.css("left", pointer)
	// 	});
	// }

})();

