# Hosting

The Hosting API allows you to deploy and manage websites on Puter's infrastructure.

## Available Functions

- **[`puter.hosting.create()`](/Hosting/create/)** - Create a new hosting deployment
- **[`puter.hosting.list()`](/Hosting/list/)** - List all hosting deployments
- **[`puter.hosting.delete()`](/Hosting/delete/)** - Delete a hosting deployment
- **[`puter.hosting.update()`](/Hosting/update/)** - Update hosting settings
- **[`puter.hosting.get()`](/Hosting/get/)** - Get information about a specific deployment

# puter.hosting.create()

Will create a new subdomain that will be served by the hosting service. Optionally, you can specify a path to a directory that will be served by the subdomain.

## Syntax

```js
puter.hosting.create(subdomain, dirPath)
```

## Parameters
#### `subdomain` (String) (required)
A string containing the name of the subdomain you want to create.

#### `dirPath` (String) (optional)
A string containing the path to the directory you want to serve. If not specified, the subdomain will be created without a directory.

## Return value
A `Promise` that will resolve to a [`subdomain`](/Objects/subdomain/) object when the subdomain has been created. If a subdomain with the given name already exists, the promise will be rejected with an error. If the path does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title">Create a simple website displaying "Hello world!"</strong>

```html;hosting-create
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random directory
            let dirName = puter.randName();
            await puter.fs.mkdir(dirName)

            // (2) Create 'index.html' in the directory with the contents "Hello, world!"
            await puter.fs.write(`${dirName}/index.html`, '<h1>Hello, world!</h1>');

            // (3) Host the directory under a random subdomain
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain, dirName)

            puter.print(`Website hosted at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a>`);
        })();
    </script>
</body>
</html>
```
# puter.hosting.list()

Returns an array of all subdomains in the user's subdomains that this app has access to. If the user has no subdomains, the array will be empty.

## Syntax
```js
puter.hosting.list()
```

## Parameters
None

## Return value
A `Promise` that will resolve to an array of all [`subdomain`s](/Objects/subdomain/) belonging to the user that this app has access to. 

## Examples

<strong class="example-title">Create 3 random websites and then list them</strong>

```html;hosting-list
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Generate 3 random subdomains
            let site_1 = puter.randName();
            let site_2 = puter.randName();
            let site_3 = puter.randName();

            // (2) Create 3 empty websites with the subdomains we generated
            await puter.hosting.create(site_1);
            await puter.hosting.create(site_2);
            await puter.hosting.create(site_3);

            // (3) Get all subdomains
            let sites = await puter.hosting.list();

            // (4) Display the names of the websites
            puter.print(sites.map(site => site.subdomain));

            // Delete all sites (cleanup)
            await puter.hosting.delete(site_1);
            await puter.hosting.delete(site_2);
            await puter.hosting.delete(site_3);
        })();
    </script>
</body>
</html>
```
# puter.hosting.delete()

Deletes a subdomain from your account. The subdomain will no longer be served by the hosting service. If the subdomain has a directory, it will be disconnected from the subdomain. The associated directory will not be deleted.

## Syntax

```js
puter.hosting.delete(subdomain)
```

## Parameters
#### `subdomain` (String) (required)
A string containing the name of the subdomain you want to delete.

## Return value
A `Promise` that will resolve to `true` when the subdomain has been deleted. If a subdomain with the given name does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title">Create a random website then delete it</strong>

```html;hosting-delete
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site (This is an empty website with no files)<br>`);

            // (2) Delete the website using delete()
            const site2 = await puter.hosting.delete(site.subdomain);
            puter.print('Website deleted<br>');

            // (3) Try to retrieve the website (should fail)
            puter.print('Trying to retrieve website... (should fail)<br>');
            try {
                await puter.hosting.get(site.subdomain);
            } catch (e) {
                puter.print('Website could not be retrieved<br>');
            }
        })();
    </script>
</body>
</html>
```
# puter.hosting.update()

Updates a subdomain to point to a new directory. If directory is not specified, the subdomain will be disconnected from its directory.

## Syntax

```js
puter.hosting.update(subdomain, dirPath)
```

## Parameters
#### `subdomain` (String) (required)
A string containing the name of the subdomain you want to update.

#### `dirPath` (String) (optional)
A string containing the path to the directory you want to serve. If not specified, the subdomain will be disconnected from its directory.

## Return value
A `Promise` that will resolve to a [`subdomain`](/Objects/subdomain/) object when the subdomain has been updated. If a subdomain with the given name does not exist, the promise will be rejected with an error. If the path does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title">Update a subdomain to point to a new directory</strong>

```html;hosting-update
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site<br>`);

            // (2) Create a random directory
            let dirName = puter.randName();
            let dir = await puter.fs.mkdir(dirName)
            puter.print(`Created directory "${dir.path}"<br>`);

            // (3) Update the site with the new random directory
            await puter.hosting.update(subdomain, dirName)
            puter.print(`Changed subdomain's root directory to "${dir.path}"<br>`);

            // (4) Delete the app (cleanup)
            await puter.hosting.delete(updatedSite.subdomain)
        })();
    </script>
</body>
</html>
```
# puter.hosting.get()

Returns a subdomain. If the subdomain does not exist, the promise will be rejected with an error.

## Syntax

```js
puter.hosting.get(subdomain)
```

## Parameters
#### `subdomain` (String) (required)
A string containing the name of the subdomain you want to retrieve.

## Return value
A `Promise` that will resolve to a [`subdomain`](/Objects/subdomain/) object when the subdomain has been retrieved. If a subdomain with the given name does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title">Get a subdomain</strong>

```html;hosting-get
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random website
            let subdomain = puter.randName();
            const site = await puter.hosting.create(subdomain)
            puter.print(`Website hosted at: ${site.subdomain}.puter.site (This is an empty website with no files)<br>`);

            // (2) Retrieve the website using get()
            const site2 = await puter.hosting.get(site.subdomain);
            puter.print(`Website retrieved: subdomain=${site2.subdomain}.puter.site UID=${site2.uid}<br>`);

            // (3) Delete the website (cleanup)
            await puter.hosting.delete(subdomain);
        })();
    </script>
</body>
</html>
```

