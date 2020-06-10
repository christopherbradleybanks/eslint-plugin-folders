# eslint-plugin-folders

Adds [eslint](http://eslint.org/) rules to ensure consistent folder names for your javascript files.

__Please note__: This plugin will only lint the folder Names of the `.js`, `.jsx` files you are linting with eslint. It will ignore other files that are not linted with eslint.

## Enabling the plugin

This plugin requires a version of `eslint>=1.0.0` to be installed as a peer dependency.

Modify your `.eslintrc` file to load the plugin and enable the rules you want to use.

```json
{
  "plugins": [
    "folders"
  ],
  "rules": {
    "folders/match-regex": [2, null, "/root/"]
  }
}
```

## Rules

### Consistent Folder Names via regex (match-regex)

A rule to enforce a certain file naming convention using a regular expression.

The convention can be configured using a regular expression (the default is `camelCase`). Additionally
the root of the project is defined with a second configuration parameter.

```json
"folders/match-regex": [2, "^[a-z_]+$", '/work/']
```

With these configuration options, any folder beneath the **/work/** directory `camelCase` will be reported as an error while `snake_case` will pass.

