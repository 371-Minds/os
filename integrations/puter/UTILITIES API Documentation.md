# Utilities

The Utilities API provides helpful utility functions and properties that make development easier and more efficient. These utilities help with common tasks and provide access to important system information.

## Available Functions

- **[`puter.print()`](/Utils/print/)** - Print text to console or output
- **[`puter.randName()`](/Utils/randName/)** - Generate random names
- **[`puter.appID`](/Utils/appID/)** - Get the current application ID
- **[`puter.env`](/Utils/env/)** - Access environment variables

# puter.appID

A property of the `puter` object that returns the App ID of the running application.

## Syntax

```js
puter.appID
```

## Examples

<strong class="example-title">Get the ID of the current application</strong>

<div style="position: relative;">


```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("App ID: " + puter.appID);
    </script>
</body>
</html>
```

</div>

# puter.env

A property of the `puter` object that returns the environment in which Puter.js is being used.

## Syntax

```js
puter.env
```

## Return value

A string containing the environment in which Puter.js is being used:

- `app` - Puter.js is running inside a Puter application. e.g. `https://puter.com/app/editor` 

- `web` - Puter.js is running inside a web page outside of the Puter environment. e.g. `https://example.com/index.html`

- `gui` - Puter.js is running inside the Puter GUI. e.g. `https://puter.com/`

## Examples

<strong class="example-title">Get the environment in which Puter.js is running</strong>

<div style="position: relative;">


```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Environment: " + puter.env);
    </script>
</body>
</html>
```

</div>

# puter.print()

Prints a string by appending it to the body of the document. This is useful for debugging and testing purposes and is not recommended for production use.

## Syntax

```js
puter.print(text);
```

## Parameters

#### `text` (String)
The text to print.

#### `options` (Object, optional)
An object containing options for the print function.

- `code` (Boolean, optional): If true, the text will be printed as code by wrapping it in a `<code>` and `<pre>` tag. Defaults to `false`.

## Examples

<strong class="example-title">Print "Hello, world!"</strong>

<div style="position: relative;">


```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Hello, world!");
    </script>
</body>
</html>
```

</div>

<strong class="example-title">Print "Hello, world!" as code</strong>
<div style="position: relative;">

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print("Hello, world!", { code: true });
    </script>
</body>
</html>
```
</div>

# puter.randName()

A function that generates a domain-safe name by combining a random adjective, a random noun, and a random number (between 0 and 9999). The result is returned as a string with components separated by hyphens by default. You can change the separator by passing a string as the first argument to the function.

## Syntax

```js
puter.randName()
puter.randName(separator)
```

## Parameters

#### `separator` (String)
The separator to use between components. Defaults to `-`.

## Examples

<strong class="example-title">Generate a random name</strong>

<div style="position: relative;">


```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print(puter.randName());
    </script>
</body>
</html>
```

</div>
