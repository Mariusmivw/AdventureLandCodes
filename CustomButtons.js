(function(){
	if (game.html) {
		const $ = parent.$;
		if ($('#bottomrightcorner > div:nth-child(1) > div#custombuttons')[0]) {
			$('#bottomrightcorner > div:nth-child(1) > br')[0].outerHTML = '';
			$('#bottomrightcorner > div:nth-child(1) > div#custombuttons')[0].outerHTML = '';
		}

		const div = document.createElement('div');
		div.id = 'custombuttons';
		div.classList.add('enableclicks');
		div.setAttribute('style', 'display:none;padding:2px;min-height:50px;border:5px solid gray;border-bottom:0;min-width:187px;max-width:316px;background-color:black;flex-wrap:wrap;');
		$('#bottomrightcorner > div:nth-child(1)')[0].appendChild(document.createElement('br'));
		$('#bottomrightcorner > div:nth-child(1)')[0].appendChild(div);
	}
})();


function create_custom_button(text, fn, setup=()=>{}) {
	if (game.html) {
		const container = parent.$('#bottomrightcorner > div:nth-child(1) > div#custombuttons')[0];
		const div = document.createElement('div');
		div.innerHTML = text;
		div.onclick = fn;
		div.setAttribute('style', 'text-align:center;flex-grow:1;font-family:pixel;font-size:24px;cursor:pointer;display:inline-block;vertical-align:top;border:2px solid gray;min-width:46px;height:46px;margin:2px;color:white;overflow-wrap:normal;width:min-content;');
		setup(div);
		//container.insertBefore(div, container.children[0]);
		container.appendChild(div);
		container.style.display = 'flex';
		return div;
	}
}
