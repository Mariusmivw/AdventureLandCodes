function enable_folders() {
	parent._handle_information = parent._handle_information || parent.handle_information;
	parent.handle_information = function(g) {
		const info = g[0];
		if (info && info.type == 'code_list') {
			if (info.purpose == 'load') {
				let folders = {}
				if ('folders' in info) {
					parent.hide_modal();
					folders = info.folders;
				} else {
					info.list[0] = 'Default Code';
					parent.code_list = info.list;
					for (const b in info.list) {
						const path = info.list[b].split('/');
						let folder = folders;
						for (let i=0; i<path.length-1; i++) {
							const name = path[i];
							folder[name] = folder[name] || {};
							folder = folder[name];
						}
						folder[path[path.length-1]] = parseInt(b);
					}
				}
				let d = '';
				for (const f in folders) {
					if (typeof folders[f] == 'number') {
						d += `<div class='gamebutton block' style='margin-bottom: -4px' onclick='load_code("${folders[f]}",1)'>[${folders[f]}] ${f}</div>`;
					} else {
						d += `<div class='gamebutton block' style='margin-bottom: -4px' onclick='handle_information({0:{"type":"code_list","purpose":"load","folders":${JSON.stringify(folders[f])}}})'>${f}</div>`;
					}
				}
				d += "<div style='margin: 10px 5px 5px 5px; font-size: 24px; line-height: 28px'>";
				d += "<div>You can also load code's into your code. For example, you can save your 'Functions' in one code slot, let's say 2, and inside your first code slot, you can: <span class='label' style='height: 24px; margin: -2px 0px 0px 0px;'>load_code(2)</span> or <span class='label' style='height: 24px; margin: -2px 0px 0px 0px;'>load_code('Functions')</span></div>";
				d += "</div>";
				parent.show_modal(d);
			} else if (info.purpose == 'save') {
				let path = info.path || '';
				let d = '';
				d += "<div style='box-sizing: border-box; width: 100%; text-align: center; margin-bottom: 8px'>";
				d += "<input type='text' style='box-sizing: border-box; width: 20%;' placeholder='#' class='csharp cinput'/>";
				d += `<input type='text' style='display:none' class='cpath' value='${path}'/>`;
				d += "<input type='text' style='box-sizing: border-box; width: 58%;' placeholder='NAME' class='codename cinput' />";
				d += "<div class='gamebutton' style='box-sizing: border-box; width: 20%; padding: 8px' onclick='save_code_s(FOLDERSJSON)'>SAVE</div>";
				d += "</div>";
				let folders = {};
				if ('folders' in info) {
					parent.hide_modal();
					folders = info.folders;
				} else {
					if (!Object.keys(info.list).length) {
						info.list = {
							"1": "Empty",
							"2": "Empty"
						}
					}
					parent.code_list = info.list;
					for (const b in info.list) {
						const path = info.list[b].split('/');
						let folder = folders;
						for (let i=0; i<path.length-1; i++) {
							const name = path[i];
							folder[name] = folder[name] || {};
							folder = folder[name];
						}
						folder[path[path.length-1]] = parseInt(b);
					}
				}
				folders["NEW FOLDER"] = "+";
				folders["DELETE"] = "#";
				for (var f in folders) {
					if (typeof folders[f] == 'number' || folders[f] == '#' || folders[f] == '+'){
						d += `<div class='gamebutton block' style='margin-bottom: -4px' onclick='$(".csharp").val("${folders[f]}");$(".codename").val("${f}");'>[${folders[f]}] ${f}</div>`;
					} else {
						d += `<div class='gamebutton block' style='margin-bottom: -4px' onclick='handle_information({0:{"type":"code_list","purpose":"save","folders":${JSON.stringify(folders[f])},"path":"${path}${f}/"}})'>${f}</div>`;
					}
				}
				d += "<div style='margin: 10px 5px 5px 5px; font-size: 24px; line-height: 28px'>";
				d += "</div>";
				d = d.replace('FOLDERSJSON', JSON.stringify(folders));
				parent.show_modal(d);
			} else {
				parent._handle_information(g);
			}
		} else {
			parent._handle_information(g);
		}
	}

	parent._save_code_s = parent._save_code_s || parent.save_code_s;
	parent.save_code_s = function(folderJSON) {
		const $ = parent.$;
		if ($('.csharp').val() == '+') {
			if ($(".codename").val()) {
				//folderJSON[$(".codename").val()] = {};
				//parent.handle_information({0:{"type":"code_list","purpose":"save","folders":folderJSON}});
				parent.handle_information({0:{"type":"code_list","purpose":"save","folders":{},"path":`${$('.cpath').val()}${$(".codename").val()}/`}});
			}
		} else if($('.cpath').val()) {
			override_modal(()=>{
				const before = $('.codename').val();
				if (before != 'DELETE') {
					$('.codename').val($('.cpath').val() + before);
				}
				parent._save_code_s();
				$('.codename').val(before);
			});
		} else {
			override_modal(()=>{
				parent._save_code_s();
			});
		}
	};

	function override_modal(on_yes=()=>{}, on_no=()=>{}) {
		const v = parent.$('.csharp').val();
		if (parent.$('.codename').val() != 'DELETE' && parent.code_list[v]) {
			parent.show_modal(`<div class='gamebutton' style='display:block;border:none'>Index ${v} is already in use by script '${parent.code_list[v]}'.</div><div class='gamebutton' style='box-sizing: border-box; width: 50%; padding: 8px' onclick="(${on_yes})();parent.hide_modal()">REPLACE</div><div class='gamebutton' style='box-sizing: border-box; width: 50%; padding: 8px' onclick='(${on_no})();parent.hide_modal()'>CANCEL</div>`);
		} else {
			on_yes();
		}
	}
}

function disable_folders() {
	parent.handle_information = parent._handle_information || parent.handle_information;
	parent.save_code_s = parent._save_code_s || parent.save_code_s;
}

enable_folders();
