# Modules
* [Folders](#folders)
* [Custom Buttons](#custom-buttons)
* [Code Fold](#code-fold)
* [Log Filtering](#log-filtering)

# Folders
This module allows the user to make folders to save their code in to keep some order in chaos.
Automatically calls [`enable_folders`](#enable_folders) when called

_NOTE: No folders are actually made, it just helps out with the visuals._  
_If you save a piece of code in a folder called_ `Test` _under the name of_ `Attack` _it will actually be saved as_ `Test/Attack` _._

## Methods

### enable_folders
Arguments: None

Turns on the visual helper.

### disable_folders
Arguments: None

Turns off the visual helper.

# Custom Buttons
As the name implies this module allows the user to make custom buttons, because it's just easier to click a button than to have to write the code.

## Methods

### create_custom_button
Arguments:
* button_text (String)
* button_fn (Function)
* setup_fn (Function, optional)

Creates a button with text `button_text`, which when clicked performs `button_fn`  
If given `setup_fn` will run right after the button is created, it's first argument will be the button element.

# Code Fold
Used to create fold buttons in the gutter of the CODE editor.  
Automatically calls [`enable_fold`](#enable_fold) when loaded

## Methods

### enable_fold
Arguments: None

Enables the folding of lines.

### disable_fold
Arguments: None

Disables the folding of lines

# Log Filtering
Allows the user to make white-/blacklist filters for the in-game log.
Automatically calls [`enable_log_filtering`](#enable_log_filtering).

_NOTE: All filters are in the same filter mode_

## Methods
### set_log_filters
Arguments:
* filters (Object)

Removes all filters and replaces them with `filters`  
`filters` should always be in the following format:
```js
{
	'type': 'blacklist' | 'whitelist' | 'none',
	'filter_name': function(log, color) { // color is in rgb
		if (log matches filter) {
			return true;
		} else {
			return false;
		}
	}
};
```

### set_filter_type
Arguments:
* filter_type ('blacklist'|'whitelist'|'none')

Sets the filter type

### remove_log_filters
Arguments: None

Removes all filters

### add_log_filter
Arguments:
* name (String)
* filter_fn (Function)
* force (Boolean, optional)

Creates a new filter.  
`filter_fn` should return `true` if it passes your filter, or `false` if it does not.  
If a filter with the same name already exists it won't be overridden, unless `force` is set to `true`.

### remove_log_filter
Arguments:
* name (String)

Removes a filter with it's name `name`

### disable_log_filtering
Arguments: None

Sets the filter type to `'none'`

### enable_log_filtering
Arguments: None

Enables log filtering
