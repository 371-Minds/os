# Objects

Various object types and classes that represent different entities in the Puter ecosystem. These objects encapsulate data and provide methods for interacting with system resources.

## Available Objects

- **[App](/Objects/app/)** - Represents an application
- **[AppConnection](/Objects/AppConnection/)** - Represents a connection to an application
- **[FSItem](/Objects/fsitem/)** - Represents a file or directory
- **[Subdomain](/Objects/subdomain/)** - Represents a subdomain

# AppConnection

Provides an interface for interaction with another app.

## Attributes

#### `usesSDK` (Boolean)
Whether the target app is using Puter.js. If not, then some features of `AppConnection` will not be available.

## Methods

#### `on(eventName, handler)`
Listen to an event from the target app. Possible events are:

- `message` - The target app sent us a message with `postMessage()`. The handler receives the message.
- `close` - The target app has closed. The handler receives an object with an `appInstanceID` field of the closed app.

#### `off(eventName, handler)`
Remove an event listener added with `on(eventName, handler)`.

#### `postMessage(message)`
Send a message to the target app. Think of it as a more limited version of [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). `message` can be anything that [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) would accept for its `message` parameter.

If the target app is not using the SDK, or the connection is not open, then nothing will happen.

#### `close()`
Attempt to close the target app. If you do not have permission to close it, or the target app is already closed, then nothing will happen.

An app has permission to close apps that it has launched with [`puter.ui.launchApp()`](/UI/launchApp).

## Examples

### Interacting with another app

This example demonstrates two apps, `parent` and `child`, communicating with each other over using `AppConnection`.

In order:
1. `parent` launches `child`
2. `parent` sends a message, `"Hello!"`, to `child`
3. `child` shows that message in an alert dialog.
4. `child` sends a message back.
5. `parent` receives the message and logs it.
6. `parent` closes the child app.

```html
<html>
<head>
    <title>Parent app</title>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // This app is the parent
        
        // Launch child (1)
        const child = await puter.ui.launchApp('child');
        
        // Listen to messages from the child app. (5)
        child.on('message', msg => {
            console.log('Parent app received a message from child:', msg);
            console.log('Closing child app.');
            
            // Close the child (6)
            child.close();
        });
        
        // Send a message to the child (2)
        child.postMessage('Hello!');
    </script>
</body>
</html>

<!------------------->

<html>
<head>
    <title>Child app</title>
</head>
<body>
<script src="https://js.puter.com/v2/"></script>
<script>
    // This app is the child
    
    // Get a connection to our parent.
    const parent = puter.ui.parentApp();
    if (!parent) {
        // We were not launched by the parent.
        // For this example, we'll just exit.
        puter.exit();
    } else {
        // We were launched by the parent, and can communicate with it.
        
        // Any time we get a message from the parent, show it in an alert dialog. (3)
        parent.on('message', msg => {
            puter.ui.alert(msg);
            
            // Send a message back (4)
            // Messages can be any JS object that can be cloned.
            parent.postMessage({
                name: 'Nyan Cat',
                age: 13
            });
        });
    }
</script>
</body>
</html>
```

### Single app with multiple windows

Multi-window applications can also be implemented with a single app, by launching copies of itself that check if they have a parent and wait for instructions from it.

In this example, a parent app (with the name `traffic-light`) launches three children that display the different colors of a traffic light.

```html
<html>
<head>
    <title>Traffic light</title>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        const parent = puter.ui.parentApp();
        if (parent) {
            // We have a parent, so wait for it to tell us what to do.
            // In this example, just change the background color and display a message.
            parent.on('message', msg => {
                document.bgColor = msg.color;
                document.body.innerText = msg.text;
            });
        } else {
            // `parent` is null, so we are the instance that should create and direct the child apps.
            const trafficLight = [
                {
                    color: 'red',
                    text: 'STOP',
                }, {
                    color: 'yellow',
                    text: 'WAIT',
                }, {
                    color: 'green',
                    text: 'GO',
                },
            ];
            for (const data of trafficLight) {
                // Launch a child app for each task.
                puter.ui.launchApp('traffic-light').then(child => {
                    child.postMessage(data);
                });
            }
        }
    </script>
</head>
</html>
```
# App


## Attributes

#### `uid` (String)

A string containing the unique identifier of the app. This is a unique identifier generated by Puter when the app is created.

#### `name` (String)

A string containing the name of the app. 

#### `icon` (String)

A string containing the Data URL of the icon of the app. This is a base64 encoded image.

#### `description` (String)

A string containing the description of the app.


#### `title` (String)

A string containing the title of the app.

#### `maximize_on_start` (Boolean) (default: `false`)

A boolean value indicating whether the app should be maximized when it is started.

#### `index_url` (String)

A string containing the URL of the index file of the app. This is the file that will be loaded when the app is started.

#### `created_at` (String)

A string containing the date and time when the app was created. The format of the date and time is `YYYY-MM-DDTHH:MM:SSZ`.

#### `background` (Boolean) (default: `false`)

A boolean value indicating whether the app should run in the background. If this is set to `true`.

#### `filetype_associations` (Array)

An array of strings containing the file types that the app can open. Each string should be in the format `".<extension>"` or `"mime/type"`. e.g. `[".txt", "image/png"]`. For a directory association, the string should be `.directory`.

#### `open_count` (Number)

A number containing the number of times the app has been opened. If the `stats_period` option is set to a value other than `all`, this will be the number of times the app has been opened in that period.

#### `user_count` (Number)

A number containing the number of users that have access to the app. If the `stats_period` option is set to a value other than `all`, this will be the number of users that have access to the app in that period.

# FSItem


An fsitem object represents a file or a directory in the file system of a Puter. 

## Attributes

#### `id` (String)

A string containing the unique identifier of the item. This is a unique identifier generated by Puter when the item is created.

#### `uid` (String)

This is an alias for `id`.

#### `name` (String)

A string containing the name of the item.

#### `path` (String)

A string containing the path of the item. This is the path of the item relative to the root directory of the file system.

#### `is_dir` (Boolean)

A boolean value indicating whether the item is a directory. If this is set to `true`, the item is a directory. If this is set to `false`, the item is a file.

#### `parent_id` (String)

A string containing the unique identifier of the parent directory of the item.

#### `parent_uid` (String)

This is an alias for `parent_id`.

#### `created` (Integer)

An integer containing the Unix timestamp of the date and time when the item was created.

#### `modified` (Integer)

An integer containing the Unix timestamp of the date and time when the item was last modified.

#### `accessed` (Integer)

An integer containing the Unix timestamp of the date and time when the item was last accessed.


#### `size` (Integer)

An integer containing the size of the item in bytes. If the item is a directory, this will be `null`.


#### `writable` (Boolean)

A boolean value indicating whether the item is writable. If this is set to `true`, the item is writable. If this is set to `false`, the item is not writable. If the item is a directory and `writable` is `false`, it means new items cannot be added to the directory;
however, it is possible that subdirectories may be writable or contain writable files.

# Subdomain


## Attributes

#### `uid` (String)

A string containing the unique identifier of the subdomain.

#### `subdomain` (String)

A string containing the name of the subdomain. This is the part of the domain that comes before the main domain name.
e.g. in `example.puter.site`, `example` is the subdomain.

#### `root_dir` (FSItem)

An FSItem object representing the root directory of the subdomain. This is the directory where the files of the subdomain are stored.
