function enable_fold() {
	if (game.html) {
		const document = parent.document;
		if (!parent.$(`link[href="https://codemirror.net/addon/fold/foldgutter.css"]`).get(0)) {
			const link = document.createElement('link');
			link.href = 'https://codemirror.net/addon/fold/foldgutter.css';
			link.rel = 'stylesheet';
			document.documentElement.append(link);
		}
		['https://codemirror.net/addon/fold/foldcode.js',
		'https://codemirror.net/addon/fold/foldgutter.js',
		'https://codemirror.net/addon/fold/brace-fold.js',
		'https://codemirror.net/addon/fold/indent-fold.js',
		'https://codemirror.net/addon/fold/comment-fold.js',
		'https://codemirror.net/addon/fold/xml-fold.js'].forEach((src)=>{
			if (!parent.$(`script[src="${src}"]`).get(0)) {
				const script = document.createElement('script');
				script.src = src;
				document.documentElement.append(script);
			}
		});
		if (!parent.codemirror_render.options.gutters.includes('CodeMirror-foldgutter')) {
			parent.codemirror_render.options.gutters.splice(1, 0, 'CodeMirror-foldgutter');
		}
		if (!parent.$('.CodeMirror-foldgutter').get(0)) {
			parent.$('.CodeMirror-gutters > div:nth-child(2)').before('<div class="CodeMirror-gutter CodeMirror-foldgutter"></div>');
		}
		parent.$('.CodeMirror-foldgutter').css('display', '');


		if (!parent.$(`style[id="CODE Enhancement"]`).get(0)) {
			const style = document.createElement('style');
			style.id = 'CODE Enchancement';
			style.innerHTML = '.CodeMirror-gutters {\
				background: #303030 !important;\
			}\
			.CodeMirror-foldgutter-open, .CodeMirror-foldgutter-folded {\
				margin-top: -5px;\
			}';
			document.documentElement.append(style);
		}

		if (parent.CodeMirror.fold) {
			set_fold();
		} else {
			parent.$('script[src*=foldgutter]').get(0).onload = set_fold;
		}
		function set_fold() {
			try {
				// for some reason sometimes needed, but will also sometimes throw an error
				parent.codemirror_render.setOption('foldGutter', false);
				console.log('no error was thrown');
			} catch (e) {console.warn(e)}
			parent.codemirror_render.setOption('foldGutter', true);
		}
	}
}

function disable_fold() {
	if(game.html) {
		parent.codemirror_render.setOption('foldGutter', false);
		parent.$('.CodeMirror-foldgutter').css('display', 'none');
	}
}

enable_fold();
