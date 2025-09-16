# Networking

The Networking API provides tools for making HTTP requests and establishing network connections. It includes both high-level HTTP client functionality and low-level socket connections.

## Available Functions

- **[`puter.net.fetch()`](/Networking/fetch/)** - Make HTTP requests
- **[`puter.net.Socket()`](/Networking/Socket/)** - Create TCP socket connections
- **[`puter.net.TLSSocket()`](/Networking/TLSSocket/)** - Create secure TLS socket connections

# Socket

The Socket API lets you create a raw TCP socket which can be used directly in the browser.

## Syntax

```js
const socket = new puter.net.Socket(hostname, port)
```

## Parameters
#### `hostname` (String) (Required)
The hostname of the server to connect to. This can be an IP address or a domain name.

#### `port` (Number) (Required)
The port number to connect to on the server.


## Return value

A `Socket` object.

## Methods

#### `socket.write(data)`

Write data to the socket.

### Parameters

- `data` (`ArrayBuffer | Uint8Array | string`) The data to write to the socket.

#### `socket.close()`

Voluntarily close a TCP Socket.


## Events

#### `socket.on("open", callback)`

Fired when the socket is initialized and ready to send data.

##### Parameters

- `callback` (Function) The callback to fire when the socket is open.

#### `socket.on("data", callback)`

Fired when the remote server sends data over the created TCP Socket.

##### Parameters

- `callback` (Function) The callback to fire when data is received.
  - `buffer` (`Uint8Array`) The data received from the socket.

#### `socket.on("error", callback)`

Fired when the socket encounters an error. The close event is fired shortly after.

##### Parameters

- `callback` (Function) The callback to fire when an error occurs.
  - `reason` (`string`) A user readable error reason.

#### `socket.on("close", callback)`

Fired when the socket is closed.

##### Parameters

- `callback` (Function) The callback to fire when the socket is closed.
  - `hadError` (`boolean`) Indicates whether the socket was closed due to an error. If true, there was an error.

## Examples

<strong class="example-title">Connect to a server and print the response</strong>

```html;net-basic
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    const socket = new puter.net.Socket("example.com", 80);
    socket.on("open", () => {
        socket.write("GET / HTTP/1.1\r\nHost: example.com\r\n\r\n");
    })
    const decoder = new TextDecoder();
    socket.on("data", (data) => {
        puter.print(decoder.decode(data), { code: true });
    })
    socket.on("error", (reason) => {
        puter.print("Socket errored with the following reason: ", reason);
    })
    socket.on("close", (hadError)=> {
        puter.print("Socket closed. Was there an error? ", hadError);
    })
    </script>
</body>
</html>
```
# TLSSocket

The TLS Socket API lets you create a TLS protected TCP socket connection which can be used directly in the browser. The interface is exactly the same as the normal <a href="/Networking/Socket/">`puter.net.Socket`</a> but connections are encrypted instead of being in plain text.

## Syntax

```js
const socket = new puter.net.tls.TLSSocket(hostname, port)
```

## Parameters

#### `hostname` (String) (Required)
The hostname of the server to connect to. This can be an IP address or a domain name.

#### `port` (Number) (Required)
The port number to connect to on the server.


## Return value

A `TLSSocket` object.

## Methods


#### `socket.on(event, callback)`

Listen to an event from the socket. Possible events are:

- `open` - The socket is open.
- `data` - Data is received from the socket.
- `error` - An error occurs on the socket.
- `close` - The socket is closed.


#### `socket.write(data)`

Write data to the socket.

### Parameters

- `data` (String) The data to write to the socket.


## Events

#### `socket.on("open", callback)`

Fired when the socket is open.


#### `socket.on("data", callback)`

Fired when data is received from the socket.


#### `socket.on("error", callback)`

Fired when an error occurs on the socket.



#### `socket.on("close", callback)`

Fired when the socket is closed.


The encryption is done by [rustls-wasm](https://github.com/MercuryWorkshop/rustls-wasm/).

# puter.net.fetch()

The puter fetch API lets you securely fetch a http/https resource without being bound by CORS restrictions.

## Syntax

```js
puter.net.fetch(url)
puter.net.fetch(url, options)
```

## Parameters 

#### `url` (String) (Required)
The url of the resource to access. The URL can be either http or https.

#### `options` (Object) (optional)
A standard [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) object

## Return value
A `Promise` to a `Response` object.

## Examples

```html;net-fetch
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => { 
        // Send a GET request to example.com
        const request = await puter.net.fetch("https://example.com");        

        // Get the response body as text
        const body = await request.text();

        // Print the body as a code block
        puter.print(body, { code: true });
    })()
    </script>
</body>
</html>
```
