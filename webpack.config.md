Add the `settings.json` in the **webpack.config.js** file

```JS
new CopyWebpackPlugin([
    { from: "settings.json" },
    { from: "fonts/**" },
    { from: "**/*.jpg" },
    { from: "**/*.png" },
]
```