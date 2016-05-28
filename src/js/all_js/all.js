(function() {
	var $DOC = $(document);

	var body  = 'body, html',
		$body = $(body);

	var pageMain  = '#page-main',
		$pageMain = $(pageMain);

	var pageForm  = '#page-form',
		$pageForm = $(pageForm);

	if($pageMain.length > 0) {
		var listCnt  = '.js-cnt-list',
			$listCnt = $(listCnt);
		var link  = '.js-link',
			$link = $(link);
		var btnCloseModal  = '.js-btn-close-modal',
			$btnCloseModal = $(btnCloseModal);
		var blackLayer  = '.js-black-layer',
			$blackLayer = $(blackLayer);
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
		var checkbox = '.js-checkbox',
			$checkbox = $(checkbox);
		var label = '.c-input-label',
			$label = $(label);

		$DOC.on('click', checkbox, function() {
			$(this).closest('.c-input-label').toggleClass('is-active');
		});
	}

	// widget
	var sampleWidget = '.sample-widget',
		$sampleWidget = $(sampleWidget);
	$sampleWidget.css('border', '0 none');

})();


