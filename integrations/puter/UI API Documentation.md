# UI

The UI API provides a comprehensive set of tools for creating rich user interfaces and interacting with the Puter desktop environment. It includes window management, dialogs, and desktop integration features.

## Available Functions

### Authentication
- **[`puter.ui.authenticateWithPuter()`](/UI/authenticateWithPuter/)** - Authenticate with Puter

### Dialogs and Alerts
- **[`puter.ui.alert()`](/UI/alert/)** - Show alert dialogs
- **[`puter.ui.prompt()`](/UI/prompt/)** - Show input prompts

### Window Management
- **[`puter.ui.createWindow()`](/UI/createWindow/)** - Create new windows
- **[`puter.ui.setWindowTitle()`](/UI/setWindowTitle/)** - Set window title
- **[`puter.ui.setWindowSize()`](/UI/setWindowSize/)** - Set window dimensions
- **[`puter.ui.setWindowPosition()`](/UI/setWindowPosition/)** - Set window position
- **[`puter.ui.setWindowWidth()`](/UI/setWindowWidth/)** - Set window width
- **[`puter.ui.setWindowHeight()`](/UI/setWindowHeight/)** - Set window height
- **[`puter.ui.setWindowX()`](/UI/setWindowX/)** - Set window X position
- **[`puter.ui.setWindowY()`](/UI/setWindowY/)** - Set window Y position

### File Pickers
- **[`puter.ui.showOpenFilePicker()`](/UI/showOpenFilePicker/)** - Show file open dialog
- **[`puter.ui.showSaveFilePicker()`](/UI/showSaveFilePicker/)** - Show file save dialog
- **[`puter.ui.showDirectoryPicker()`](/UI/showDirectoryPicker/)** - Show directory picker

### System Integration
- **[`puter.ui.launchApp()`](/UI/launchApp/)** - Launch other applications
- **[`puter.ui.parentApp()`](/UI/parentApp/)** - Get parent application info
- **[`puter.ui.exit()`](/UI/exit/)** - Exit the application
- **[`puter.ui.setMenubar()`](/UI/setMenubar/)** - Set application menubar
- **[`puter.ui.getLanguage()`](/UI/getLanguage/)** - Get current language/locale code

### Event Handling
- **[`puter.ui.on()`](/UI/on/)** - Register event handlers
- **[`puter.ui.onLaunchedWithItems()`](/UI/onLaunchedWithItems/)** - Handle launch with items
- **[`puter.ui.wasLaunchedWithItems()`](/UI/wasLaunchedWithItems/)** - Check if launched with items
- **[`puter.ui.onWindowClose()`](/UI/onWindowClose/)** - Handle window close events

### Additional UI Elements
- **[`puter.ui.hideSpinner()`](/UI/hideSpinner/)** - Hide spinner
- **[`puter.ui.showColorPicker()`](/UI/showColorPicker/)** - Show color picker
- **[`puter.ui.showFontPicker()`](/UI/showFontPicker/)** - Show font picker
- **[`puter.ui.showSpinner()`](/UI/showSpinner/)** - Show spinner
- **[`puter.ui.socialShare()`](/UI/socialShare/)** - Share content socially

# puter.ui.authenticateWithPuter()

Presents a dialog to the user to authenticate with their Puter account.

## Syntax

```js
puter.ui.authenticateWithPuter()
```

## Parameters
None.

## Return value
A `Promise` that will resolve to `true`. If the user cancels the dialog, the promise will be rejected with an error.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Presents a dialog to the user to authenticate with their Puter account.
        puter.ui.authenticateWithPuter().then((user)=>{
            console.log(user)
        });
    </script>
</body>
</html>
```
# puter.ui.alert()


Displays an alert dialog by Puter. Puter improves upon the traditional browser alerts by providing more flexibility. For example, you can customize the buttons displayed.

`puter.ui.alert()` will block the parent window until user responds by pressing a button.

## Syntax
```js
puter.ui.alert(message)
puter.ui.alert(message, buttons)
```

## Parameters

#### `message` (optional)
A string to be displayed in the alert dialog. If not set, the dialog will be empty. 

#### `buttons` (optional)
An array of objects that define the buttons to be displayed in the alert dialog. Each object must have a `label` property. The `value` property is optional. If it is not set, the `label` property will be used as the value. The `type` property is optional and can be set to `primary`, `success`, `info`, `warning`, or `danger`. If it is not set, the default type will be used.


## Return value 
A `Promise` that resolves to the value of the button pressed. If the `value` property of button is set it is returned, otherwise `label` property will be returned.

## Examples
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // display an alert with a message and three different types of buttons
        puter.ui.alert('Please press a button!', [
            {
                label: 'Hello :)',
                value: 'hello',
                type: 'primary',
            },
            {
                label: 'Bye :(',
                type: 'danger',
            },
            {
                label: 'Cancel',
            },
        ]).then((resp) => {
            // print user's response to console
            console.log(resp);
        });
    </script>
</body>
</html>
```
# puter.ui.contextMenu()

Displays a context menu at the current cursor position. Context menus provide a convenient way to show contextual actions that users can perform.

## Syntax
```js
puter.ui.contextMenu(options)
```

## Parameters

#### `options` (required)
An object that configures the context menu.

* `items` (Array): An array of menu items and separators. Each item can be either:
  - **Menu Item Object**: An object with the following properties:
    - `label` (String): The text to display for the menu item.
    - `action` (Function, optional): The function to execute when the menu item is clicked. Not required for items with submenus.
    - `icon` (String, optional): The icon to display next to the menu item label. Must be a base64-encoded image data URI starting with `data:image`. Strings not starting with `data:image` will be ignored.
    - `icon_active` (String, optional): The icon to display when the menu item is hovered or active. Must be a base64-encoded image data URI starting with `data:image`. Strings not starting with `data:image` will be ignored.
    - `disabled` (Boolean, optional): If set to `true`, the menu item will be disabled and unclickable. Default is `false`.
    - `items` (Array, optional): An array of submenu items. Creates a submenu when specified.
  - **Separator**: A string `'-'` to create a visual separator between menu items.

## Return value 
This method does not return a value. The context menu is displayed immediately and menu item actions are executed when clicked.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div id="right-click-area" style="width: 200px; height: 200px; border: 1px solid #ccc; padding: 20px;">
        Right-click me to show context menu
    </div>

    <script>
        document.getElementById('right-click-area').addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Prevent default browser context menu
            
            puter.ui.contextMenu({
                items: [
                    {
                        label: 'Edit Item',
                        action: () => {
                            console.log('Edit action triggered');
                            alert('Editing item...');
                        },
                    },
                    {
                        label: 'Copy Item',
                        action: () => {
                            console.log('Copy action triggered');
                            alert('Item copied!');
                        },
                    },
                    '-', // Separator
                    {
                        label: 'Delete Item',
                        action: () => {
                            console.log('Delete action triggered');
                            if (confirm('Are you sure you want to delete this item?')) {
                                alert('Item deleted!');
                            }
                        },
                    },
                ],
            });
        });
    </script>
</body>
</html>
```

### Advanced Example with Icons, Disabled Items, and Submenus

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <div id="advanced-menu" style="padding: 20px; border: 1px solid #ddd; margin: 10px; cursor: pointer;">
        Right-click for advanced context menu with all features
    </div>

    <script>
        document.getElementById('advanced-menu').addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            // Note: Icons must be base64-encoded data URIs starting with "data:image"
            // The examples below use simple SVG icons encoded as base64
            puter.ui.contextMenu({
                items: [
                    {
                        label: 'New File',
                        action: () => {
                            console.log('Creating new file');
                        },
                    },
                    {
                        label: 'Export',
                        items: [
                            {
                                label: 'Export as PDF',
                                action: () => console.log('Exporting as PDF'),
                            },
                            {
                                label: 'Export as JSON',
                                action: () => console.log('Exporting as JSON'),
                            },
                            {
                                label: 'Export as CSV',
                                action: () => console.log('Exporting as CSV'),
                            },
                        ],
                    },
                    '-',
                    {
                        label: 'Copy',
                        action: () => {
                            console.log('Copying item');
                        },
                    },
                    {
                        label: 'Paste',
                        disabled: true, // This item is disabled
                        action: () => {
                            console.log('This should not execute');
                        },
                    },
                    '-',
                    {
                        label: 'Settings',
                        icon: 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2259px%22%20height%3D%2259px%22%20stroke-width%3D%221.9%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22%23000000%22%3E%3Cpath%20d%3D%22M12%2015C13.6569%2015%2015%2013.6569%2015%2012C15%2010.3431%2013.6569%209%2012%209C10.3431%209%209%2010.3431%209%2012C9%2013.6569%2010.3431%2015%2012%2015Z%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.9%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.6224%2010.3954L18.5247%207.7448L20%206L18%204L16.2647%205.48295L13.5578%204.36974L12.9353%202H10.981L10.3491%204.40113L7.70441%205.51596L6%204L4%206L5.45337%207.78885L4.3725%2010.4463L2%2011V13L4.40111%2013.6555L5.51575%2016.2997L4%2018L6%2020L7.79116%2018.5403L10.397%2019.6123L11%2022H13L13.6045%2019.6132L16.2551%2018.5155C16.6969%2018.8313%2018%2020%2018%2020L20%2018L18.5159%2016.2494L19.6139%2013.598L21.9999%2012.9772L22%2011L19.6224%2010.3954Z%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.9%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
                        icon_active: 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20width%3D%2259px%22%20height%3D%2259px%22%20stroke-width%3D%221.9%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20color%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M12%2015C13.6569%2015%2015%2013.6569%2015%2012C15%2010.3431%2013.6569%209%2012%209C10.3431%209%209%2010.3431%209%2012C9%2013.6569%2010.3431%2015%2012%2015Z%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221.9%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M19.6224%2010.3954L18.5247%207.7448L20%206L18%204L16.2647%205.48295L13.5578%204.36974L12.9353%202H10.981L10.3491%204.40113L7.70441%205.51596L6%204L4%206L5.45337%207.78885L4.3725%2010.4463L2%2011V13L4.40111%2013.6555L5.51575%2016.2997L4%2018L6%2020L7.79116%2018.5403L10.397%2019.6123L11%2022H13L13.6045%2019.6132L16.2551%2018.5155C16.6969%2018.8313%2018%2020%2018%2020L20%2018L18.5159%2016.2494L19.6139%2013.598L21.9999%2012.9772L22%2011L19.6224%2010.3954Z%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221.9%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E',
                        items: [
                            {
                                label: 'Preferences',
                                action: () => console.log('Opening preferences'),
                            },
                            {
                                label: 'Theme',
                                items: [
                                    {
                                        label: 'Light',
                                        action: () => console.log('Setting light theme'),
                                    },
                                    {
                                        label: 'Dark',
                                        action: () => console.log('Setting dark theme'),
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        });
    </script>
</body>
</html>
```
# puter.ui.createWindow()

Creates and displays a window.

## Syntax
```js
puter.ui.createWindow()
puter.ui.createWindow(options)
```

## Parameters

#### `options` (optional)
A set of key/value pairs that configure the window.
    
* `center` (Boolean): if set to `true`, window will be placed at the center of the screen.
* `content` (String): content of the window.
* `disable_parent_window` (Boolean): if set to `true`, the parent window will be blocked until current window is closed. 
* `has_head` (Boolean): if set to `true`, window will have a head which contains the icon and close, minimize, and maximize buttons.
* `height` (Float): height of window in pixels.
* `is_resizable` (Boolean): if set to `true`, user will be able to resize the window.
* `show_in_taskbar` (Boolean): if set to `true`, window will be represented in the taskbar.
* `title` (String): title of the window.
* `width` (Float): width of window in pixels.

## Examples
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // create the window
        puter.ui.createWindow({
            title: 'Cool Title',
            content: `<h1 style="text-align:center;">My little test window!</h1>`, 
            disable_parent_window: true,
            width: 300,
            height: 300,
            is_resizable: false,
            has_head: true,
            center: true,
            show_in_taskbar: false,
        })
    </script>
</body>
</html>
```
# puter.exit()

Will terminate the running application and close its window.

## Syntax
```js
puter.exit()
puter.exit(statusCode)
```

## Parameters

#### `statusCode` (Integer) (optional)
Reports the reason for exiting, with `0` meaning success and non-zero indicating some kind of error. Defaults to `0`.

This value is reported to other apps as the reason that your app exited.
## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="exit-button">Exit App</button>
    <script>
        const exit_button = document.getElementById('exit-button');
        exit_button.addEventListener('click', () => {
            puter.exit();
        });
    </script>
</body>
</html>
```
# puter.ui.getLanguage()

Retrieves the current language/locale code from the Puter environment. This function communicates with the host environment to get the active language setting.

## Syntax
```js
puter.ui.getLanguage()
```

## Parameters

This function takes no parameters.

## Return value 
A `Promise` that resolves to a string containing the current language code (e.g., `en`, `fr`, `es`, `de`).

## Examples
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Get the current language
        puter.ui.getLanguage().then((language) => {
            console.log('Current language:', language);
            // Output: "Current language: fr" (if French is selected)
        });

        // Using async/await syntax
        async function displayLanguage() {
            const currentLang = await puter.ui.getLanguage();
            document.body.innerHTML = `<h1>Current language: ${currentLang}</h1>`;
        }
        
        displayLanguage();

        // Listen for language changes and update accordingly
        puter.ui.on('localeChanged', async (data) => {
            console.log('Language changed to:', data.language);
            const updatedLang = await puter.ui.getLanguage();
            console.log('Confirmed current language:', updatedLang);
        });
    </script>
</body>
</html>
```
# puter.ui.launchApp()

Allows you to dynamically launch another app from within your app.

## Syntax
```js
puter.ui.launchApp()
puter.ui.launchApp(appName)
puter.ui.launchApp(appName, args)
puter.ui.launchApp(options)
```

## Parameters
#### `appName` (String)
Name of the app. If not provided, a new instance of the current app will be launched.

#### `args` (Object)
Arguments to pass to the app. If `appName` is not provided, these arguments will be passed to the current app.

#### `options` (Object)

#### `options.name` (String)
Name of the app. If not provided, a new instance of the current app will be launched.

#### `options.args` (Object)
Arguments to pass to the app.

## Return value 
A `Promise` that will resolve to an [`AppConnection`](/Objects/AppConnection) once the app is launched.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // launches the Editor app
        puter.ui.launchApp('editor');
    </script>
</body>
</html>
```
# puter.ui.on()

Listen to broadcast events from Puter. If the broadcast was received before attaching the handler, then the handler is called immediately with the most recent value.


## Syntax
```js
puter.ui.on(eventName, handler)
```

## Parameters

#### `eventName` (String)
Name of the event to listen to.

#### `handler` (Function)
Callback function run when the broadcast event is received.

## Broadcasts
Possible broadcasts are:

#### `localeChanged`
Sent on app startup, and whenever the user's locale on Puter is changed. The value passed to `handler` is:
```js
{
    language, // (String) Language identifier, such as 'en' or 'pt-BR'
}
```

#### `themeChanged`
Sent on app startup, and whenever the user's desktop theme on Puter is changed. The value passed to `handler` is:
```js
{
    palette: {
        primaryHue,         // (Float) Hue of the theme color
        primarySaturation,  // (String) Saturation of the theme color as a percentage, with % sign
        primaryLightness,   // (String) Lightness of the theme color as a percentage, with % sign
        primaryAlpha,       // (Float) Opacity of the theme color from 0 to 1
        primaryColor,       // (String) CSS color value for text
    }
}
```

## Examples

```html
<html>
<body>
<script src="https://js.puter.com/v2/"></script>
<script>
    puter.ui.on('localeChanged', function(locale) {
        alert(`User's preferred language code is: ${locale.language}!`);
    })
</script>
</body>
</html>
```
# puter.ui.onLaunchedWithItems()

Specify a callback function to execute if the app is launched with items. `onLaunchedWithItems` will be called if one or more items are opened via double-clicking on items, right-clicking on items and choosing the app from the 'Open With...' submenu.

## Syntax
```js
puter.ui.onLaunchedWithItems(handler)
```

## Parameters
#### `handler` (Function)
A function to execute after items are opened by user action. The function will be passed an array of items. Each items is either a file or a directory.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.onLaunchedWithItems(function(items){
            document.body.innerHTML = JSON.stringify(items);
        })
    </script>
</body>
</html>
```
# puter.ui.onWindowClose()

Specify a function to execute when the window is about to close. For example the provided function will run right after  the 'X' button of the window has been pressed.

**Note** `onWindowClose` is not called when app is closed using `puter.exit()`.

## Syntax
```js
puter.ui.onWindowClose(handler)
```

## Parameters
#### `handler` (Function)
A function to execute when the window is going to close.


## Examples
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.onWindowClose(function(){
            alert('Window is about to close!')
            puter.exit();
        })
    </script>
</body>
</html>
```
# puter.ui.parentApp()

Obtain a connection to the app that launched this app.

## Syntax
```js
puter.ui.parentApp()
```

## Parameters
`puter.ui.parentApp()` does not accept any parameters.

## Return value 
An [`AppConnection`](/Objects/AppConnection) to the parent, or null if there is no parent app.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const parent = puter.ui.parentApp();
        if (!parent) {
            alert('This app was launched directly');
        } else {
            alert('This app was launched by another app');
            parent.postMessage("Hello, parent!");
        }
    </script>
</body>
</html>
```
# puter.ui.prompt()


Displays a prompt dialog by Puter. This will block the parent window until the user responds by pressing a button.

## Syntax
```js
puter.ui.prompt()
puter.ui.prompt(message)
puter.ui.prompt(message, placeholder)
```

## Parameters

#### `message` (optional)
A string to be displayed in the prompt dialog. If not set, the dialog will be empty. 

#### `placeholder` (optional)
A string to be displayed as a placeholder in the input field. If not set, the input field will be empty.


## Return value 
A `Promise` that resolves to the value of the input field when the user presses the OK button. If the user presses the Cancel button, the promise will resolve to `null`.

## Examples
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.prompt('Please enter your name:', 'John Doe').then((resp) => {
            // print user's response to console
            console.log(resp);
        });
    </script>
</body>
</html>
```
# puter.ui.setMenubar()


Creates a menubar in the UI. The menubar is a horizontal bar at the top of the window that contains menus.

## Syntax

```js
puter.ui.setMenubar(options)
```

## Parameters

#### `options.items` (Array)

An array of menu items. Each item can be a menu or a menu item. Each menu item can have a label, an action, and a submenu.

#### `options.items.label` (String)

The label of the menu item.

#### `options.items.action` (Function)

A function to execute when the menu item is clicked.

#### `options.items.items` (Array)

An array of submenu items.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.setMenubar({
            items: [
                {
                    label: 'File',
                    items: [
                        {
                            label: 'Action',
                            action: () => {
                                alert('Action was clicked!');
                            }
                        },
                        {
                            label: 'Sub-Menu',
                            items: [
                                {
                                    label: 'Action 1',
                                    action: () => {
                                        alert('Action 1 was clicked!');
                                    }
                                },
                                {
                                    label: 'Action 2',
                                    action: () => {
                                        alert('Action 2 was clicked!');
                                    }
                                },
                            ]
                        },
                    ]
                },
            ]
        });
    </script>
</body>
</html>
```
# puter.ui.setWindowHeight()

Allows the user to dynamically set the height of the window.

## Syntax
```js
puter.ui.setWindowHeight(height)
```

## Parameters

#### `height` (Float)
The new height for this window. Must be a positive number. Minimum height is 200px, if a value less than 200 is provided, the height will be set to 200px.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the height of the window to 800px
        puter.ui.setWindowHeight(800);
    </script>
</body>
</html>
```
# puter.ui.setWindowPosition()

Allows the user to set the position of the window.

## Syntax
```js
puter.ui.setWindowPosition(x, y)
```

## Parameters

#### `x` (Float)
The new x position for this window. Must be a positive number.

#### `y` (Float)
The new y position for this window. Must be a positive number.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the position of the window to 100px from the left and 200px from the top
        puter.ui.setWindowPosition(100, 200);
    </script>
</body>
</html>
```
# puter.ui.setWindowSize()

Allows the user to dynamically set the width and height of the window.

## Syntax
```js
puter.ui.setWindowSize(width, height)
```

## Parameters

#### `width` (Float)
The new width for this window. Must be a positive number. Minimum width is 200px, if a value less than 200 is provided, the width will be set to 200px.

#### `height` (Float)
The new height for this window. Must be a positive number. Minimum height is 200px, if a value less than 200 is provided, the height will be set to 200px.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the width and height of the window to 800px x 600px
        puter.ui.setWindowSize(800, 600);
    </script>
</body>
```
# puter.ui.setWindowTitle()

Allows the user to dynamically set the title of the window.

## Syntax
```js
puter.ui.setWindowTitle(title)
```

## Parameters

#### `title` (String)
The new title for this window.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.setWindowTitle('Fancy New Title');
    </script>
</body>
</html>
```
# puter.ui.setWindowWidth()

Allows the user to dynamically set the width of the window.

## Syntax
```js
puter.ui.setWindowWidth(width)
```

## Parameters

#### `width` (Float)
The new width for this window. Must be a positive number. Minimum width is 200px, if a value less than 200 is provided, the width will be set to 200px.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the width of the window to 800px
        puter.ui.setWindowWidth(800);
    </script>
</body>
</html>
```
# puter.ui.setWindowX()

Sets the X position of the window.

## Syntax
```js
puter.ui.setWindowX(x)
```

## Parameters

#### `x` (Float) (Required)
The new x position for this window.


## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the position of the window to 100px from the left
        puter.ui.setWindowX(100);
    </script>
</body>
```
# puter.ui.setWindowY()

Sets the y position of the window.

## Syntax
```js
puter.ui.setWindowY(y)
```

## Parameters

#### `y` (Float) (Required)
The new y position for this window.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // sets the position of the window to 200px from the top
        puter.ui.setWindowY(200);
    </script>
</body>
```
# puter.ui.showColorPicker()

Presents the user with a color picker dialog allowing them to select a color.

## Syntax
```js
puter.ui.showColorPicker()
puter.ui.showColorPicker(defaultColor)
puter.ui.showColorPicker(options)
```

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ui.showColorPicker().then((color)=>{
            document.body.style.backgroundColor = color;
        })
    </script>
</body>
</html>
```
# puter.ui.showDirectoryPicker()

Presents the user with a directory picker dialog allowing them to pick a directory from their Puter cloud storage.

## Syntax
```js
puter.ui.showDirectoryPicker()
puter.ui.showDirectoryPicker(options)
```

## Parameters

#### `options` (optional)
A set of key/value pairs that configure the directory picker dialog.
* `multiple` (Boolean): if set to `true`, user will be able to select multiple directories. Default is `false`.

## Return value 
A `Promise` that resolves to either one <code>FSItem</code> or an array of <code>FSItem</code> objects, depending on how many directories were selected by the user. 

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <button id="open-directory">Open directory</button>

    <h1 id="directory-name"></h1>
    <pre><code id="directory-content"></code></pre>

    <script>
        document.getElementById('open-directory').addEventListener('click', ()=>{
            puter.ui.showDirectoryPicker().then(async (directory)=>{
                // print directory name
                document.getElementById('directory-name').innerHTML = directory.name;
                // print directory content
                const children = await directory.readdir();
                if(children.length){
                    let content = '';
                    for(let child of children){
                        content += child.name + '\n';
                    }
                    document.getElementById('directory-content').innerText = content;
                }else{
                    document.getElementById('directory-content').innerText = 'Empty directory';
                }
            });
        });
    </script>
</body>
</html>
```
# puter.ui.showFontPicker()

Presents the user with a list of fonts allowing them to preview and select a font.

## Syntax
```js
puter.ui.showFontPicker()
puter.ui.showFontPicker(defaultFont)
puter.ui.showFontPicker(options)
```

## Parameters
#### `defaultFont` (String)
The default font to select when the font picker is opened.


## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1>A cool Font Picker demo!</h1>

    <script>
        puter.ui.showFontPicker().then((font)=>{
            document.body.style.fontFamily = font.fontFamily;
        })
    </script>
</body>
</html>
```
# puter.ui.showOpenFilePicker()

Presents the user with a file picker dialog allowing them to pick a file from their Puter cloud storage.

## Syntax
```js
puter.ui.showOpenFilePicker()
puter.ui.showOpenFilePicker(options)
```

## Parameters

#### `options` (optional)
A set of key/value pairs that configure the file picker dialog.
* `multiple` (Boolean): if set to `true`, user will be able to select multiple files. Default is `false`.
* `accept` (String): The list of MIME types or file extensions that are accepted by the file picker. Default is `*/*`.
    - Example: `image/*` will allow the user to select any image file.
    - Example: `['.jpg', '.png']` will allow the user to select files with `.jpg` or `.png` extensions.

## Return value 
A `Promise` that resolves to either one <code>FSItem</code> or an array of <code>FSItem</code> objects, depending on how many files were selected by the user. 

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>

    <h1 id="file-name"></h1>

    <button id="open-file-picker">Open file picker</button>
    <pre><code id="file-content"></code></pre>

    <script>
        document.getElementById('open-file-picker').addEventListener('click', ()=>{
            puter.ui.showOpenFilePicker().then(async (file)=>{
                // print file name
                document.getElementById('file-name').innerHTML = file.name;
                // print file content
                document.getElementById('file-content').innerText = await (await file.read()).text();
            });
        });
    </script>
</body>
</html>
```
# puter.ui.showSaveFilePicker()

Presents the user with a file picker dialog allowing them to specify where and with what name to save a file.

## Syntax
```js
puter.ui.showSaveFilePicker()
puter.ui.showSaveFilePicker(data, defaultFileName)
```

## Parameters
#### `defaultFileName` (String)
The default file name to use.

## Examples

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <h1 id="file-name"></h1>

    <button id="save-file">Save file</button>
    <pre><code id="file-content"></code></pre>

    <script>
        document.getElementById('save-file').addEventListener('click', ()=>{
            puter.ui.showSaveFilePicker("Hello world! I'm the content of this file.", 'Untitled.txt').then(async (file)=>{
                // print file name
                document.getElementById('file-name').innerHTML = file.name;
                // print file content
                document.getElementById('file-content').innerText = await (await file.read()).text();
            });
        });
    </script>
</body>
</html>
```
# puter.ui.socialShare()

Presents a dialog to the user allowing them to share a link on various social media platforms.

## Syntax

```js
puter.ui.socialShare(url)
puter.ui.socialShare(url, message)
puter.ui.socialShare(url, message, options)
```

## Parameters

#### `url` (required)

The URL to share.


#### `message` (optional)

The message to prefill in the social media post. This parameter is only supported by some social media platforms.

#### `options` (optional)

A set of key/value pairs that configure the social share dialog. The following options are supported:

* `left` (Number): The distance from the left edge of the window to the dialog. Default is `0`.
* `top` (Number): The distance from the top edge of the window to the dialog. Default is `0`.

# puter.ui.wasLaunchedWithItems()

Returns whether the app was launched to open one or more items. Use this in conjunction with `onLaunchedWithItems()` to, for example, determine whether to display an empty state or wait for items to be provided.

## Syntax
```js
puter.ui.wasLaunchedWithItems()
```

## Return value
Returns `true` if the app was launched to open items (via double-clicking, 'Open With...' menu, etc.), `false` otherwise.
