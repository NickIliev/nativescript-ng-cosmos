Add the `settings.json` in the **webpack.config.js** file

```JS
new CopyWebpackPlugin([
    { from: { glob: "settings.json"} }, // HERE
    { from: { glob: "fonts/**" } },
    { from: { glob: "**/*.jpg" } },
    { from: { glob: "**/*.png" } },
]
```