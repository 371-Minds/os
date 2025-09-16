# Apps

The Apps API allows you to create, manage, and interact with applications in the Puter ecosystem. You can build and deploy applications that integrate seamlessly with Puter's platform.

## Available Functions

- **[`puter.apps.create()`](/Apps/create/)** - Create a new application
- **[`puter.apps.list()`](/Apps/list/)** - List all applications
- **[`puter.apps.delete()`](/Apps/delete/)** - Delete an application
- **[`puter.apps.update()`](/Apps/update/)** - Update application settings
- **[`puter.apps.get()`](/Apps/get/)** - Get information about a specific application

# puter.apps.create()

Creates a Puter app with the given name. The app will be created in the user's apps, and will be accessible to this app. The app will be created with no permissions, and will not be able to access any data until permissions are granted to it.

## Syntax
```js
puter.apps.create(name, indexURL)
puter.apps.create(name, indexURL, title)
puter.apps.create(name, indexURL, title, description)
puter.apps.create(options)
```

## Parameters
#### `name` (required)
The name of the app to create. This name must be unique to the user's apps. If an app with this name already exists, the promise will be rejected.

#### `indexURL` (required)
The URL of the app's index page. This URL must be accessible to the user. If this parameter is not provided, the app will be created with no index page. The index page is the page that will be displayed when the app is started.

**IMPORTANT**: The URL *must* start with either `http://` or `https://`. Any other protocols (including `file://`, `ftp://`, etc.) are not allowed and will result in an error. For example:

âœ… `https://example.com/app/index.html` <br>
âœ… `http://localhost:3000/index.html` <br>
âŒ `file:///path/to/index.html` <br>
âŒ `ftp://example.com/index.html` <br>

#### `title` (required)
The title of the app. If this parameter is not provided, the app will be created with `name` as its title.

#### `description` (optional)
The description of the app aimed at the end user.

#### `options` (required)
An object containing the options for the app to create. The object can contain the following properties:
- `name` (required): The name of the app to create. This name must be unique to the user's apps. If an app with this name already exists, the promise will be rejected.
- `indexURL` (required): The URL of the app's index page. This URL must be accessible to the user. If this parameter is not provided, the app will be created with no index page.
- `title` (optional): The human-readable title of the app. If this parameter is not provided, the app will be created with `name` as its title.
- `description` (optional): The description of the app aimed at the end user.
- `icon` (optional): The new icon of the app.
- `maximizeOnStart` (optional): Whether the app should be maximized when it is started. Defaults to `false`.
- `filetypeAssociations` (optional): An array of strings representing the filetypes that the app can open. Defaults to `[]`. File extentions and MIME types are supported; For example, `[".txt", ".md", "application/pdf"]` would allow the app to open `.txt`, `.md`, and PDF files.

## Return value
A `Promise` that will resolve to the [`app`](/Objects/app/) that was created.

## Examples

<strong class="example-title">Create an app pointing to https://example.com</strong>

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate a random app name
            let appName = puter.randName();

            // (2) Create the app and prints its UID to the page
            let app = await puter.apps.create(appName, "https://example.com");
            puter.print(`Created app "${app.name}". UID: ${app.uid}`);

            // (3) Delete the app (cleanup)
            await puter.apps.delete(appName);
        })();
    </script>
</body>
</html>
```

# puter.apps.list()

Returns an array of all apps belonging to the user and that this app has access to. If the user has no apps, the array will be empty.

## Syntax
```js
puter.apps.list()
puter.apps.list(options)
```

## Parameters

### options (optional)

An object containing the following properties:

- `stats_period` (optional): A string representing the period for which to get the user and open count. Possible values are `today`, `yesterday`, `7d`, `30d`, `this_month`, `last_month`, `this_year`, `last_year`, `month_to_date`, `year_to_date`, `last_12_months`. Default is `all` (all time).

- `icon_size` (optional): An integer representing the size of the icons to return. Possible values are `null`, `16`, `32`, `64`, `128`, `256`, and `512`. Default is `null` (the original size).

## Return value
A `Promise` that will resolve to an array of all [`app`s](/Objects/app/) belonging to the user that this app has access to.

## Examples

<strong class="example-title">Create 3 random apps and then list them</strong>
```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate 3 random app names
            let appName_1 = puter.randName();
            let appName_2 = puter.randName();
            let appName_3 = puter.randName();

            // (2) Create 3 apps
            await puter.apps.create(appName_1, 'https://example.com');
            await puter.apps.create(appName_2, 'https://example.com');
            await puter.apps.create(appName_3, 'https://example.com');

            // (3) Get all apps (list)
            let apps = await puter.apps.list();

            // (4) Display the names of the apps
            puter.print(JSON.stringify(apps.map(app => app.name)));

            // (5) Delete the 3 apps we created earlier (cleanup)
            await puter.apps.delete(appName_1);
            await puter.apps.delete(appName_2);
            await puter.apps.delete(appName_3);
        })();
    </script>
</body>
</html>
```

# puter.apps.delete()

Deletes an app with the given name.

## Syntax
```js
puter.apps.delete(name)
```

## Parameters
#### `name` (required)
The name of the app to delete.

## Return value
A `Promise` that will resolve to the app that was deleted.

## Examples

<strong class="example-title">Create a random app then delete it</strong>

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate a random app name to make sure it doesn't already exist
            let appName = puter.randName();

            // (2) Create the app
            await puter.apps.create(appName, "https://example.com");
            puter.print(`"${appName}" created<br>`);

            // (3) Delete the app
            await puter.apps.delete(appName);
            puter.print(`"${appName}" deleted<br>`);

            // (4) Try to retrieve the app (should fail)
            puter.print(`Trying to retrieve "${appName}"...<br>`);
            try {
                await puter.apps.get(appName);
            } catch (e) {
                puter.print(`"${appName}" could not be retrieved<br>`);
            }
        })();
    </script>
</body>
</html>
```

# puter.apps.update()

Updates attributes of the app with the given name.

## Syntax
```js
puter.apps.update(name, attributes)
```

## Parameters
#### `name` (required)
The name of the app to update.

#### `attributes` (required)
An object containing the attributes to update. The object can contain the following properties:
- `name` (optional): The new name of the app. This name must be unique to the user's apps. If an app with this name already exists, the promise will be rejected.
- `indexURL` (optional): The new URL of the app's index page. This URL must be accessible to the user.
- `title` (optional): The new title of the app.
- `description` (optional): The new description of the app aimed at the end user.
- `icon` (optional): The new icon of the app.
- `maximizeOnStart` (optional): Whether the app should be maximized when it is started. Defaults to `false`.
- `filetypeAssociations` (optional): An array of strings representing the filetypes that the app can open. Defaults to `[]`. File extentions and MIME types are supported; For example, `[".txt", ".md", "application/pdf"]` would allow the app to open `.txt`, `.md`, and PDF files.

## Return value
A `Promise` that will resolve to the [`app`](/Objects/app/) that was updated.

## Examples

<strong class="example-title">Create a random app then change its title</strong>

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random app
            let appName = puter.randName();
            await puter.apps.create(appName, "https://example.com")
            puter.print(`"${appName}" created<br>`);

            // (2) Update the app
            let updated_app = await puter.apps.update(appName, {title: "My Updated Test App!"})
            puter.print(`Changed title to "${updated_app.title}"<br>`);

            // (3) Delete the app (cleanup)
            await puter.apps.delete(appName)
        })();
    </script>
</body>
</html>
```

# puter.apps.get()

Returns an app with the given name. If the app does not exist, the promise will be rejected.

## Syntax
```js
puter.apps.get(name)
puter.apps.get(name, options)
```

## Parameters
#### `name` (required)
The name of the app to get.

### options (optional)

An object containing the following properties:

- `stats_period` (optional): A string representing the period for which to get the user and open count. Possible values are `today`, `yesterday`, `7d`, `30d`, `this_month`, `last_month`, `this_year`, `last_year`, `month_to_date`, `year_to_date`, `last_12_months`. Default is `all` (all time).

- `icon_size` (optional): An integer representing the size of the icons to return. Possible values are `null`, `16`, `32`, `64`, `128`, `256`, and `512`. Default is `null` (the original size).

## Return value
A `Promise` that will resolve to the [`app`](/Objects/app/) with the given name.

## Examples

<strong class="example-title">Create a random app then get it</strong>

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate a random app name to make sure it doesn't already exist
            let appName = puter.randName();

            // (2) Create the app
            await puter.apps.create(appName, "https://example.com");
            puter.print(`"${appName}" created<br>`);

            // (3) Retrieve the app using get()
            let app = await puter.apps.get(appName);
            puter.print(`"${appName}" retrieved using get(): id: ${app.uid}<br>`);

            // (4) Delete the app (cleanup)
            await puter.apps.delete(appName);
        })();
    </script>
</body>
</html>
```
