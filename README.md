# maximize-select2-height

This package is short and simple. It magically expands your [Select2](https://select2.github.io) dropdowns to fill the height of the window.

It factors in the number of elements in the dropdown, the position of the
Select2 on the page, the size and scroll position of the page, the visibility
of scroll bars, and whether the dropdown is rendered upwards or downwards. And
it resizes itself each time the dropdown is opened. And minified, it's **<700 bytes** (including comments)!

*(Note that this plugin is built for Select2 v4.x.x only.)*

## Installation

```bash
npm install maximize-select2-height
```

Or download it directly from [npm](https://www.npmjs.com/package/maximize-select2-height).

Or clone this repository.

Or copy-paste the `minimize-select2-height.js` or
`minimize-select2-height.min.js` file into your project directly.

## Usage

Anywhere you initialize a Select2 dropdown like so:

```javascript
$("#my-dropdown").select2();
```

Simply chain the magic method on:

```javascript
$("#my-dropdown").select2().maximizeSelect2Height();
```

And your dropdowns will go from being an arbitrary hardcoded height:

![Select2's default behavior](https://cloud.githubusercontent.com/assets/1114569/9886899/b85b8924-5bba-11e5-9b08-f63d012652d3.png)

To showing all options when there is room in the window for all of them:

![When there is room for all options to be displayed](https://cloud.githubusercontent.com/assets/1114569/9886898/b85a2a70-5bba-11e5-8695-b41e84af4a18.png)

And intelligently shrinking where there isn't:

![When there isn't room for all options to be displayed](https://cloud.githubusercontent.com/assets/1114569/9886900/b85dbee2-5bba-11e5-9544-19bdc6ca9752.png)

The height is adjusted slightly when a horizontal scroll bar is present, to
prevent the scroll bar from obscuring the dropdown:

![When a scroll bar would obscure the dropdown](https://cloud.githubusercontent.com/assets/1114569/9905981/0c9d5030-5c56-11e5-86b5-bb10e1d9bd7d.png)

And the height automatically adjusts when Select2 decides to render a dropdown
upwards instead of downwards:

![When the dropdown is rendered upwards](https://cloud.githubusercontent.com/assets/1114569/9906104/9e3083f0-5c56-11e5-89f3-4fb41a43b916.png)

## Advanced Usage

You can adjust how much extra space is left between the edge of the open
dropdown and the edge of the viewport with the `cushion` option:

```javascript
$("#my-dropdown").select2().maximizeSelect2Height({
  cushion: 50 // Must be a numerical pixel value.
});
```

Note that when a `cushion` is passed, the code will not adjust spacing for the
presence of a horizontal scroll bar, to allow for maximum control.

![With a custom bottom margin](https://cloud.githubusercontent.com/assets/1114569/9886897/b85714e8-5bba-11e5-80d7-c76be11d1dd9.png)

## Note

**This plugin requires a unique ID on the** `<select></select>`
**DOM element to work (though you don't have to select by ID with
jQuery when you initialize this).**
