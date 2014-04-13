$("a").click(function (event) {
	var self = $(this);
	if (self.attr('href').substr(0, 1) !== '/'
		&& self.attr('href').substr(0, 'http://ondrej.mirtes.cz/'.length) !== 'http://ondrej.mirtes.cz/'
		&& typeof(_gat) !== 'undefined') {
		if (_gat && typeof(_gat._getTrackerByName) === 'function') {
			_gat._getTrackerByName()._trackEvent('Outbound Links', this.href);
			if (event.ctrlKey || event.metaKey || event.which != 1) {
				return;
			}
			event.preventDefault();
			setTimeout('document.location = "' + this.href + '"', 150);
		}
	}
});

$('#frm-archiveForm').change(function() {
	document.location = $(this).val();
});
