# Auth

The Authentication API provides secure user authentication and session management for your applications. It handles user sign-in, sign-out, and session validation.

## Available Functions

- **[`puter.auth.signIn()`](/Auth/signIn/)** - Sign in a user
- **[`puter.auth.signOut()`](/Auth/signOut/)** - Sign out the current user
- **[`puter.auth.isSignedIn()`](/Auth/isSignedIn/)** - Check if a user is signed in
- **[`puter.auth.getUser()`](/Auth/getUser/)** - Get information about the current user

# puter.auth.signIn()

Initiates the sign in process for the user. This will open a popup window with the appropriate authentication method. Puter automatically handles the authentication process and will resolve the promise when the user has signed in.

It is important to note that all essential methods in Puter handle authentication automatically. This method is only necessary if you want to handle authentication manually, for example if you want to build your own custom authentication flow.

## Syntax

```js
puter.auth.signIn();
puter.auth.signIn(options);
```

## Parameters

#### `options` (optional)
`options` is an object with the following properties:

- `attempt_temp_user_creation`: A boolean value that indicates whether to Puter should automatically create a temporary user. This is useful if you want to quickly onboard a user without requiring them to sign up. They can always sign up later if they want to.

## Return value

A `Promise` that will resolve to `true` when the user has signed in. The promise will never reject.

## Example

```html;auth-sign-in
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="sign-in">Sign in</button>
    <script>
        // Because signIn() opens a popup window, it must be called from a user action.
        document.getElementById('sign-in').addEventListener('click', async () => {
            // signIn() will resolve when the user has signed in.
            await puter.auth.signIn().then((res) => {
                puter.print('Signed in<br>' + JSON.stringify(res));
            });
        });
    </script>
</body>
</html>
```

# puter.auth.signOut()

Signs the user out of the application.


## Syntax

```js
puter.auth.signOut();
```

## Parameters

None

## Return value

None

## Example

```html;auth-sign-out
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.auth.signOut();
    </script>
</body>
</html>
```

# puter.auth.isSignedIn()

Checks whether the user is signed into the application.

## Syntax

```js
puter.auth.isSignedIn();
```

## Parameters

None

## Return value

Returns `true` if the user is signed in, `false` otherwise.

## Example

```html
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.print(puter.auth.isSignedIn());
    </script>
</body>
</html>
```

# puter.auth.getUser()

Returns the user's basic information.


## Syntax

```js
puter.auth.getUser();
```

## Parameters

None

## Return value

A promise that resolves to an object containing the user's basic information. The user's basic information is an object with the following properties:

- `uuid` - The user's UUID. This is a unique identifier that can be used to identify the user.
- `username` - The user's username.
- `email_confirmed` - Whether the user has confirmed their email address.

## Example

```html;auth-get-user
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.auth.getUser().then(function(user) {
            puter.print(JSON.stringify(user));
        });
    </script>
</body>
</html>
```
