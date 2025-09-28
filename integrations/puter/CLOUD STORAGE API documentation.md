# Cloud Storage

The Cloud Storage API provides a comprehensive file system interface for managing files and directories in the cloud. It offers a familiar file system API with powerful cloud capabilities.

## Available Functions

- **[`puter.fs.write()`](/FS/write/)** - Write data to a file
- **[`puter.fs.read()`](/FS/read/)** - Read data from a file
- **[`puter.fs.mkdir()`](/FS/mkdir/)** - Create a directory
- **[`puter.fs.readdir()`](/FS/readdir/)** - List contents of a directory
- **[`puter.fs.rename()`](/FS/rename/)** - Rename a file or directory
- **[`puter.fs.copy()`](/FS/copy/)** - Copy a file or directory
- **[`puter.fs.move()`](/FS/move/)** - Move a file or directory
- **[`puter.fs.stat()`](/FS/stat/)** - Get information about a file or directory
- **[`puter.fs.delete()`](/FS/delete/)** - Delete a file or directory
- **[`puter.fs.upload()`](/FS/upload/)** - Upload a file from the local system

# puter.fs.write()

Writes data to a specified file path. This method is useful for creating new files or modifying existing ones in the Puter cloud storage.

## Syntax

```js
puter.fs.write(path)
puter.fs.write(path, data)
puter.fs.write(path, data, options)
```

## Parameters
#### `path` (string) (required)
The path to the file to write to.
If path is not absolute, it will be resolved relative to the app's root directory.

#### `data` (string|File|Blob)
The data to write to the file.

#### `options` (object)
The options for the `write` operation. The following options are supported:
- `overwrite` (boolean) - Whether to overwrite the file if it already exists. Defaults to `true`.
- `dedupeName` (boolean) - Whether to deduplicate the file name if it already exists. Defaults to `false`.
- `createMissingParents` (boolean) - Whether to create missing parent directories. Defaults to `false`.

## Return value
Returns a promise that resolves to the file object of the written file.

## Examples

<strong class="example-title">Create a new file containing "Hello, world!"</strong>

```html;fs-write
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Create a new file called "hello.txt" containing "Hello, world!"
        puter.fs.write('hello.txt', 'Hello, world!').then(() => {
            puter.print('File written successfully');
        })
    </script>
</body>
</html>
```

<strong class="example-title">Create a new file with input coming from a file input</strong>

```html;fs-write-from-input
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <input type="file" id="file-input">
    <script>
        // Example: Writing a file with input coming from a file input
        document.getElementById('file-input').addEventListener('change', (event) => {
            puter.fs.write('hello.txt', event.target.files[0]).then(() => {
                puter.print('File written successfully');
            }).catch((error) => {
                puter.print('Error writing file:', error);
            });
        });
    </script>
</body>
</html>
```

<strong class="example-title">Demonstrate the use of `dedupeName`</strong>

```html;fs-write-dedupe
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // create a file named 'hello.txt'
            let file_1 = await puter.fs.write('hello.txt', 'Hello, world!');
            puter.print(`File 1: ${file_1.name}<br>`);
            // create a file named 'hello.txt' again, it should be automatically renamed to 'hello (n).txt' where n is the next available number
            let file_2 = await puter.fs.write('hello.txt', 'Hello, world!', { dedupeName: true });
            puter.print(`File 2: ${file_2.name}<br>`);
        })();
    </script>
</body>
</html>
```

<strong class="example-title">Demonstrate the use of `createMissingParents`</strong>

```html;fs-write-create-missing-parents
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // create a file named 'hello.txt' in a directory that does not exist
            let file = await puter.fs.write('my-directory/another-directory/hello.txt', 'Hello, world!', { createMissingParents: true });
            puter.print(`File created at: ${file.path}<br>`);
        })();
    </script>
</body>
</html>
```
# puter.fs.read()

Reads data from a file.

## Syntax
```js
puter.fs.read(path)
puter.fs.read(path, options)
```

## Parameters
#### `path` (String) (required)
Path of the file to read.
If `path` is not absolute, it will be resolved relative to the app's root directory.

#### `options` (Object) (optional)

An object with the following properties:

- `offset` (Number) (optional)
The offset to start reading from.

- `byte_count` (Number) (required if `offset` is provided)
The number of bytes to read from the offset.

## Return value
A `Promise` that will resolve to a `Blob` object containing the contents of the file.

## Examples

<strong class="example-title">Read a file</strong>

```html;fs-read
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random text file
            let filename = puter.randName() + ".txt";
            await puter.fs.write(filename, "Hello world! I'm a file!");
            puter.print(`"${filename}" created<br>`);

            // (2) Read the file and print its contents
            let blob = await puter.fs.read(filename);
            let content = await blob.text();
            puter.print(`"${filename}" read (content: "${content}")<br>`);
        })();
    </script>
</body>
</html>
```
# puter.fs.mkdir()

Allows you to create a directory.

## Syntax
```js
puter.fs.mkdir(path)
puter.fs.mkdir(path, options)
```

## Parameters
#### `path` (string) (required)
The path to the directory to create.
If path is not absolute, it will be resolved relative to the app's root directory.

#### `options` (object)
The options for the `mkdir` operation. The following options are supported:
- `overwrite` (boolean) - Whether to overwrite the directory if it already exists. Defaults to `false`.
- `dedupeName` (boolean) - Whether to deduplicate the directory name if it already exists. Defaults to `false`.
- `createMissingParents` (boolean) - Whether to create missing parent directories. Defaults to `false`.

## Return value
Returns a promise that resolves to the directory object of the created directory.

## Examples

<strong class="example-title">Create a new directory</strong>

```html;fs-mkdir
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Create a directory with random name
        let dirName = puter.randName();
        puter.fs.mkdir(dirName).then((directory) => {
            puter.print(`"${dirName}" created at ${directory.path}`);
        }).catch((error) => {
            puter.print('Error creating directory:', error);
        });
    </script>
</body>
</html>
```

<strong class="example-title">Demonstrate the use of `dedupeName`</strong>

```html;fs-mkdir-dedupe
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // create a directory named 'hello'
            let dir_1 = await puter.fs.mkdir('hello');
            puter.print(`Directory 1: ${dir_1.name}<br>`);
            // create a directory named 'hello' again, it should be automatically renamed to 'hello (n)' where n is the next available number
            let dir_2 = await puter.fs.mkdir('hello', { dedupeName: true });
            puter.print(`Directory 2: ${dir_2.name}<br>`);
        })();
    </script>
</body>
</html>
```

<strong class="example-title">Demonstrate the use of `createMissingParents`</strong>

```html;fs-mkdir-create-missing-parents
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create a directory named 'hello' in a directory that does not exist
            let dir = await puter.fs.mkdir('my-directory/another-directory/hello', { createMissingParents: true });
            puter.print(`Directory created at: ${dir.path}<br>`);
        })();
    </script>
</body>
</html>
```
# puter.fs.readdir()

Reads the contents of a directory, returning an array of items (files and directories) within it. This method is useful for listing all items in a specified directory in the Puter cloud storage.

## Syntax
```js
puter.fs.readdir(path)
puter.fs.readdir(path, options)
puter.fs.readdir(options)
```

## Parameters

#### `path` (string)
The path to the directory to read.
If `path` is not absolute, it will be resolved relative to the app's root directory.
 

#### `options` (object) (optional)

<br>

- `options.path` (string) (optional)
The path to the directory to read.

- `options.uid` (string) (optional)
The UID of the directory to read.



## Return value
A `Promise` that resolves to an array of [`fsitem`s](/Objects/fsitem/) (files and directories) within the specified directory.

## Examples

<strong class="example-title">Read a directory</strong>

```html;fs-readdir
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.fs.readdir('./').then((items) => {
            // print the path of each item in the directory
            puter.print(`Items in the directory:<br>${items.map((item) => item.path)}<br>`);
        }).catch((error) => {
            puter.print(`Error reading directory: ${error}`);
        });
    </script>
</body>
</html>
```
# puter.fs.rename()

Renames a file or directory to a new name. This method allows you to change the name of a file or directory in the Puter cloud storage.

## Syntax
```js
puter.fs.rename(path, newName)
```

## Parameters
#### `path` (string)
The path to the file or directory to rename.
If `path` is not absolute, it will be resolved relative to the app's root directory.

#### `newName` (string)
The new name of the file or directory.

## Return value
Returns a promise that resolves to the file or directory object of the renamed file or directory.

## Examples

<strong class="example-title">Rename a file</strong>

```html;fs-rename
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // Create hello.txt
            await puter.fs.write('hello.txt', 'Hello, world!');
            puter.print(`"hello.txt" created<br>`);

            // Rename hello.txt to hello-world.txt
            await puter.fs.rename('hello.txt', 'hello-world.txt')
            puter.print(`"hello.txt" renamed to "hello-world.txt"<br>`);
        })();
    </script>
</body>
</html>
```
# puter.fs.copy()

Copies a file or directory from one location to another. 

## Syntax

```js
puter.fs.copy(source, destination)
puter.fs.copy(source, destination, options)
```

## Parameters
#### `source` (String) (Required)
The path to the file or directory to copy.

#### `destination` (String) (Required)
The path to the destination directory. If destination is a directory then the file or directory will be copied into that directory using the same name as the source file or directory. If the destination is a file, we overwrite if overwrite is `true`, otherwise we error.

#### `options` (Object) (Optional)
The options for the `copy` operation. The following options are supported:
- `overwrite` (Boolean) - Whether to overwrite the destination file or directory if it already exists. Defaults to `false`.
- `dedupeName` (Boolean) - Whether to deduplicate the file or directory name if it already exists. Defaults to `false`.
- `newName` (String) - The new name to use for the copied file or directory. Defaults to `undefined`.


## Return value
A `Promise` that will resolve to the copied file or directory. If the source file or directory does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title"> Copy a file</strong>

```html;fs-copy
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        // (1) Create a random text file
        let filename = puter.randName() + '.txt';
        await puter.fs.write(filename, 'Hello, world!');
        puter.print(`Created file: "${filename}"<br>`);

        // (2) create a random directory
        let dirname = puter.randName();
        await puter.fs.mkdir(dirname);
        puter.print(`Created directory: "${dirname}"<br>`);

        // (3) Copy the file into the directory
        puter.fs.copy(filename, dirname).then((file)=>{
            puter.print(`Copied file: "${filename}" to directory "${dirname}"<br>`);
        }).catch((error)=>{
            puter.print(`Error copying file: "${error}"<br>`);
        });
    })()
    </script>
</body>
</html>
```
# puter.fs.move()

Moves a file or a directory from one location to another.

## Syntax

```js
puter.fs.move(source, destination)
puter.fs.move(source, destination, options)
```

## Parameters
#### `source` (String) (Required)
The path to the file or directory to move.

#### `destination` (String) (Required)
The path to the destination directory. If destination is a directory then the file or directory will be moved into that directory using the same name as the source file or directory. If the destination is a file, we overwrite if overwrite is `true`, otherwise we error.

#### `options` (Object) (Optional)
The options for the `move` operation. The following options are supported:
- `overwrite` (Boolean) - Whether to overwrite the destination file or directory if it already exists. Defaults to `false`.
- `dedupeName` (Boolean) - Whether to deduplicate the file or directory name if it already exists. Defaults to `false`.
- `createMissingParents` (Boolean) - Whether to create missing parent directories. Defaults to `false`.

## Return value
A `Promise` that will resolve to the moved file or directory. If the source file or directory does not exist, the promise will be rejected with an error.

## Examples

<strong class="example-title"> Move a file</strong>

```html;fs-move
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        // (1) Create a random text file
        let filename = puter.randName() + '.txt';
        await puter.fs.write(filename, 'Hello, world!');
        puter.print(`Created file: ${filename}<br>`);

        // (2) create a random directory
        let dirname = puter.randName();
        await puter.fs.mkdir(dirname);
        puter.print(`Created directory: ${dirname}<br>`);

        // (3) Move the file into the directory
        await puter.fs.move(filename, dirname);
        puter.print(`Moved file: ${filename} to directory ${dirname}<br>`);

        // (4) Delete the file and directory (cleanup)
        await puter.fs.delete(dirname + '/' + filename);
        await puter.fs.delete(dirname);
    })();
    </script>
</body>
</html>
```

<strong class="example-title"> Demonstrate the `createMissingParents` option</strong>

```html;fs-move-create-missing-parents
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        // (1) Create a random file
        let filename = puter.randName() + '.txt';
        await puter.fs.write(filename, 'Hello, world!');
        puter.print('Created file: ' + filename + '<br>');

        // (2) Move the file into a non-existent directory
        let dirname = puter.randName();
        await puter.fs.move(filename, dirname + '/' + filename, { createMissingParents: true });
        puter.print(`Moved ${filename} to ${dirname}<br>`);

        // (3) Delete the file and directory (cleanup)
        await puter.fs.delete('non-existent-directory/' + filename);
        await puter.fs.delete('non-existent-directory');
    })();
    </script>
</body>
</html>
```
# puter.fs.stat()

This method allows you to get information about a file or directory.

## Syntax

```js
puter.fs.stat(path)
```

## Parameters
#### `path` (string) (required)
The path to the file or directory to get information about.
If `path` is not absolute, it will be resolved relative to the app's root directory.

## Return value
A `Promise` that resolves to the [`fsitem`](/Objects/fsitem/) of the specified file or directory.

## Examples

<strong class="example-title">Get information about a file</strong>

```html;fs-stat
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // () create a file
            await puter.fs.write('hello.txt', 'Hello, world!');
            puter.print('hello.txt created<br>');

            // (2) get information about hello.txt
            const file = await puter.fs.stat('hello.txt');
            puter.print(`hello.txt name: ${file.name}<br>`);
            puter.print(`hello.txt path: ${file.path}<br>`);
            puter.print(`hello.txt size: ${file.size}<br>`);
            puter.print(`hello.txt created: ${file.created}<br>`);
        })()
    </script>
</body>
</html>
```
# puter.fs.delete()

Deletes a file or directory.

## Syntax
```js
puter.fs.delete(path)
puter.fs.delete(path, options)
```

## Parameters
#### `path` (String) (required)
Path of the file or directory to delete.
If `path` is not absolute, it will be resolved relative to the app's root directory.

#### `options` (Object) (optional)
The options for the `delete` operation. The following options are supported:
- `recursive` (Boolean) - Whether to delete the directory recursively. Defaults to `true`.
- `descendantsOnly` (Boolean) - Whether to delete only the descendants of the directory and not the directory itself. Defaults to `false`.


## Return value
A `Promise` that will resolve when the file or directory is deleted.

## Examples


<strong class="example-title">Delete a file</strong>

```html;fs-delete
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random file
            let filename = puter.randName();
            await puter.fs.write(filename, 'Hello, world!');
            puter.print('File created successfully<br>');

            // (2) Delete the file
            await puter.fs.delete(filename);
            puter.print('File deleted successfully');
        })();
    </script>
</body>
</html>
```

<strong class="example-title">Delete a directory</strong>

```html;fs-delete-directory
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a random directory
            let dirname = puter.randName();
            await puter.fs.mkdir(dirname);
            puter.print('Directory created successfully<br>');

            // (2) Delete the directory
            await puter.fs.delete(dirname);
            puter.print('Directory deleted successfully');
        })();
    </script>
</body>
</html>
```
# puter.fs.getReadURL()

Generates a URL that can be used to read a file.

## Syntax
```javascript
puter.fs.getReadURL(path);
puter.fs.getReadURL(path, expiresIn);
```

## Parameters

#### `path` (String) (Required)

The path to the file to read.

#### `expiresIn` (Number) (Optional)

The number of seconds until the URL expires. If not provided, the URL will expire in 24 hours.

## Returns

A promise that resolves to a URL that can be used to read the file.

## Example

```javascript
const url = await puter.fs.getReadURL("~/myfile.txt");
```
# puter.fs.upload()

Given a number of local items, upload them to the Puter filesystem.

## Syntax

```js
puter.fs.upload(items)
puter.fs.upload(items, dirPath)
puter.fs.upload(items, dirPath, options)
```

## Parameters
#### `items` (Array) (required)
The items to upload to the Puter filesystem. `items` can be an `InputFileList`, `FileList`, `Array` of `File` objects, or an `Array` of `Blob` objects.

#### `dirPath` (String) (optional)
The path of the directory to upload the items to. If not set, the items will be uploaded to the app's root directory.

#### `options` (Object) (optional)
A set of key/value pairs that configure the upload process. 


## Return value
Returns a promise that resolves to an array of file objects of the uploaded files.

## Examples

<strong class="example-title">Upload a file from a file input</strong>

```html;fs-upload
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <input type="file" id="file-input" />
    <script>
        // File input
        let fileInput = document.getElementById('file-input');

        // Upload the file when the user selects it
        fileInput.onchange = () => {
            puter.fs.upload(fileInput.files).then((file) => {
                puter.print(`File uploaded successfully to: ${file.path}`);                
            })
        };
    </script>
</body>
</html>
```
