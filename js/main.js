$('#frm-archiveForm').change(function() {
	document.location = $(this).val();
});

$.bigfoot({
	activateCallback: function(el) {
		if (typeof(_paq) !== 'undefined') {
			_paq.push(['trackEvent', 'Footnote', $(el).attr('alt'), document.location.href]);
		}
	}
});
