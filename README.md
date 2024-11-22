# Laravel Pint Fixer for VSCode

**Laravel Pint Fixer** is an unofficial extension for Visual Studio Code that adds the ability to automatically format PHP files using [Laravel Pint](https://github.com/laravel/pint).

## Getting started

**1. Install the extension**

Go to the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode) and install the **Laravel Pint Formatter** extension.

**2. Install Laravel Pint Globally**

Make sure Laravel Pint is installed globally. Run the following command:

```sh
composer global require laravel/pint --dev
```

This will make Laravel Pint available on your system.

**3. Configure the Extension**

Add the following settings to your VSCode `settings.json` file:

```jsonc
"laravel-pint-fixer.pintBinPath": "path/to/pint", // set correct path to pint bin

"[php]": {
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "evgenius33.laravel-pint-fixer"
},
```

**Examples of correct paths by OS:**

```jsonc
// macOS / Linux:
"laravel-pint-fixer.pintBinPath": "~/.composer/vendor/bin/pint"

// Windows
"laravel-pint-fixer.pintBinPath": "%USERPROFILE%\\AppData\\Roaming\\Composer\\vendor\\bin\\pint"
```

**4. Specify a Default Configuration File (Optional)**

By default, the extension will use the **pint.json** configuration file in the root of your workspace if it exists. If no configuration file is found, the default Laravel Pint configuration will be used
To override this behavior, you can specify an absolute path to a default pint.json file:

```json
"laravel-pint-fixer.pintConfigPath": "/absolute/path/to/pint.json"
```
