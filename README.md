> **Note:** The branch is requiring nativescript-angular@5.x.x, nativescript-dev-webpack 0.10.x and all required additional dependencies updated.
> Until [this PR](https://github.com/NativeScript/nativescript-dev-webpack/pull/337) is merged, bundling with WebPack will require manual removal of all `moduleId: module.id`

# nativescript-ng-cosmos
POC application powered by NativeScript + Angular-2 and using Angular HTTP and NASA API.

## Requirements
- NativeScript 3.x.x
- Android or iOS device or emulator


## Instructions
- clone the repository
- to locally test the application execute
```
tns run android
```
or (for iOS)
```
tns run ios
```
- to bundle the application with WebPack, uglify and snapshot (only Android supports snapshots)
```
npm install
tns run android --bundle --env.uglify --env.snapshot
```
or (for iOS)
```
npm install
tns run ios --bundle --env.uglify
```