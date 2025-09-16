# Key-Value Store

The Key-Value Store API provides a simple and fast way to store and retrieve data using key-value pairs. It's perfect for caching, configuration storage, and simple data persistence.

## Available Functions

- **[`puter.kv.set()`](/KV/set/)** - Set a key-value pair
- **[`puter.kv.get()`](/KV/get/)** - Get a value by key
- **[`puter.kv.incr()`](/KV/incr/)** - Increment a numeric value
- **[`puter.kv.decr()`](/KV/decr/)** - Decrement a numeric value
- **[`puter.kv.del()`](/KV/del/)** - Delete a key-value pair
- **[`puter.kv.list()`](/KV/list/)** - List all keys
- **[`puter.kv.flush()`](/KV/flush/)** - Clear all data

# puter.kv.set()

When passed a key and a value, will add it to the user's key-value store, or update that key's value if it already exists.

<div class="info">Each app has its own private key-value store within each user's account. Apps cannot access the key-value stores of other apps - only their own.</div>

## Syntax
```js
puter.kv.set(key, value)
```

## Parameters

#### `key` (String) (required)
A string containing the name of the key you want to create/update. The maximum allowed `key` size is **1 KB**.

#### `value` (String | Number | Boolean | Object | Array)
A string containing the value you want to give the key you are creating/updating. The maximum allowed `value` size is **400 KB**.

## Return value 
A `Promise` that will resolves to `true` when the key-value pair has been created or the existing key's value has been updated.

## Examples

<strong class="example-title">Create a new key-value pair</strong>

```html;kv-set
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.kv.set('name', 'Puter Smith').then((success) => {
            puter.print(`Key-value pair created/updated: ${success}`);
        });
    </script>
</body>
</html>
```
# puter.kv.get()

When passed a key, will return that key's value, or `null` if the key does not exist.

## Syntax
```js
puter.kv.get(key)
```

## Parameters
#### `key` (String) (required)
A string containing the name of the key you want to retrieve the value of.

## Return value 
A `Promise` that will resolve to the key's value. If the key does not exist, it will resolve to `null`.

## Examples

<strong class="example-title">Retrieve the value of key 'name'</strong>

```html;kv-get
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a new key-value pair
            await puter.kv.set('name', 'Puter Smith');
            puter.print("Key-value pair 'name' created/updated<br>");

            // (2) Retrieve the value of key 'name'
            const name = await puter.kv.get('name');
            puter.print(`Name is: ${name}`);
        })();
    </script>
</body>
</html>
```
# puter.kv.incr()

Increments the value of a key. If the key does not exist, it is initialized with 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

## Syntax

```js
puter.kv.incr(key)
puter.kv.incr(key, amount)
```

## Parameters

#### `key` (string) (required)

The key of the value to increment.

#### `amount` (integer) (optional)

The amount to increment the value by. Defaults to 1.


## Return Value

Returns the new value of the key after the increment operation.

## Examples

<strong class="example-title">Increment the value of a key</strong>

```html;kv-incr
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.kv.incr('testIncrKey').then((newValue) => {
            puter.print(`New value: ${newValue}`);
        });
    </script>
</body>
</html>
```
# puter.kv.decr()

Decrements the value of a key. If the key does not exist, it is initialized with 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer.


## Syntax

```js
puter.kv.decr(key)
puter.kv.decr(key, amount)
```

## Parameters

#### `key` (string) (required)

The key of the value to decrement.

#### `amount` (integer) (optional)

The amount to decrement the value by. Defaults to 1.

## Return Value

Returns the new value of the key after the decrement operation.

## Examples

<strong class="example-title">Decrement the value of a key</strong>

```html;kv-decr
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.kv.decr('testIncrKey').then((newValue) => {
            puter.print(`New value: ${newValue}`);
        });
    </script>
</body>
</html>
```
# puter.kv.del()

When passed a key, will remove that key from the key-value storage. If there is no key with the given name in the key-value storage, nothing will happen.

## Syntax
```js
puter.kv.del(key)
```

## Parameters
#### `key` (String) (required)
A string containing the name of the key you want to remove.

## Return value 
A `Promise` that will resolve to `true` when the key has been removed.

## Examples

<strong class="example-title">Delete the key 'name'</strong>

```html;kv-del
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // create a new key-value pair
            await puter.kv.set('name', 'Puter Smith');
            puter.print("Key-value pair 'name' created/updated<br>");

            // delete the key 'name'
            await puter.kv.del('name');
            puter.print("Key-value pair 'name' deleted<br>");

            // try to retrieve the value of key 'name'
            const name = await puter.kv.get('name');
            puter.print(`Name is now: ${name}`);
        })();
    </script>
</body>
</html>
```
# puter.kv.list()

Returns an array of all keys in the user's key-value store for the current app. If the user has no keys, the array will be empty.

## Syntax
```js
puter.kv.list()
puter.kv.list(pattern)
puter.kv.list(returnValues = false)
puter.kv.list(pattern, returnValues = false)
```

## Parameters
#### `pattern` (String) (optional)
If set, only keys that match the given pattern will be returned. The pattern can contain the `*` wildcard character, which matches any number of characters. For example, `abc*` will match all keys that start with `abc`, such as `abc`, `abc123`, `abc123xyz`, etc. Default is `*`, which matches all keys.

#### `returnValues` (Boolean) (optional)
If set to `true`, the returned array will contain objects with both `key` and `value` properties. If set to `false`, the returned array will contain only the keys. Default is `false`.

## Return value
A `Promise` that will resolve to an array of all keys (and values, if `returnValues` is set to `true`) the user's key-value store for the current app. If the user has no keys, the array will be empty. 

## Examples

<strong class="example-title">Retrieve all keys in the user's key-value store for the current app</strong>

```html;kv-list
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a number of key-value pairs
            await puter.kv.set('name', 'Puter Smith');
            await puter.kv.set('age', 21);
            await puter.kv.set('isCool', true);
            puter.print("Key-value pairs created/updated<br><br>");

            // (2) Retrieve all keys
            const keys = await puter.kv.list();
            puter.print(`Keys are: ${keys}<br><br>`);

            // (3) Retrieve all keys and values
            const key_vals = await puter.kv.list(true);
            puter.print(`Keys and values are: ${(key_vals).map((key_val) => key_val.key + ' => ' + key_val.value)}<br><br>`);

            // (4) Match keys with a pattern
            const keys_matching_pattern = await puter.kv.list('is*');
            puter.print(`Keys matching pattern are: ${keys_matching_pattern}<br>`);

            // (5) Delete all keys (cleanup)
            await puter.kv.del('name');
            await puter.kv.del('age');
            await puter.kv.del('isCool');
        })();
    </script>
</body>
```
# puter.kv.flush()

Will remove all key-value pairs from the user's key-value store for the current app.

## Syntax
```js
puter.kv.flush()
```

## Parameters
None

## Return value
A `Promise` that will resolve to `true` when the key-value store has been flushed (emptied). The promise will never reject.

## Examples

```html;kv-flush
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        (async () => {
            // (1) Create a number of key-value pairs
            await puter.kv.set('name', 'Puter Smith');
            await puter.kv.set('age', 21);
            await puter.kv.set('isCool', true);
            puter.print("Key-value pairs created/updated<br>");

            // (2) Rretrieve all keys
            const keys = await puter.kv.list();
            puter.print(`Keys are: ${keys}<br>`);

            // (3) Flush the key-value store
            await puter.kv.flush();
            puter.print('Key-value store flushed<br>');

            // (4) Retrieve all keys again, should be empty
            const keys2 = await puter.kv.list();
            puter.print(`Keys are now: ${keys2}<br>`);
        })();
    </script>
</body>
```
