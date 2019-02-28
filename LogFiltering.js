let filters = {
	/*
	'type': 'blacklist' or 'whitelist',
	'filter_name': function(log, color) { // color is always in rgb
		if (log matches filter) {
			return true;
		} else {
			return false;
		}
	}
	*/
};

function set_log_filters(filter) {
	if (game.html) {
		filters = filter;
	}
}

function set_filter_type(black_or_whitelist) {
	if (game.html) {
		filters.type = black_or_whitelist;
	}
}

function remove_log_filters() {
	if (game.html) {
		filters = {};
		set_filter_type('none');
	}
}

function add_log_filter(name, filterFn, force=false) {
	if (game.html) {
		if (name == 'type') {
			game_log(`Cannot set a filter with name: '${name}'`);
			return;
		}
		if (name in filters && !force) {
			game_log(`A filter with name: '${name}' already exists`, 'orangered');
		} else {
			filters[name] = filterFn;
		}
	}
}

function remove_log_filter(name) {
	if (game.html) {
		delete filter[name];
	}
}

function disable_log_filtering() {
	if (game.html) {
		parent.add_log = parent._add_log || parent.add_log;
	}
}

function enable_log_filtering() {
	if (game.html) {
		parent._add_log = parent._add_log || parent.add_log;
		parent.add_log = function(msg, color) {
			const d = document.createElement('div');
			d.style.color = color;
			document.body.appendChild(d);
			const c = window.getComputedStyle(d).color;
			d.outerHTML = '';
			const rgb = c.replace('rgb(', '').replace(')').split(',');
			rgb[0] = parseInt(rgb[0]);
			rgb[1] = parseInt(rgb[1]);
			rgb[2] = parseInt(rgb[2]);
			if (filters.type == 'none') {
				parent._add_log(msg, color);
				return;
			}
			for (const filter in filters) {
				if (filter != 'type') {
					if (!(filters[filter](msg, rgb) ^ filters.type == 'whitelist')) {
						parent._add_log(msg, color);
					}
					break;
				}
			}
		}
	}
}

enable_log_filtering();
