### `Android` 端图标、应用名

- **1、** 打开 `项目根目录 -> android -> app -> src -> main` 文件夹中的 `AndroidManifest.xml` 

- **2、** `android:label='直接写应用名'`。

- **3、** `android:icon="@mipmap/ic_launcher"` 对应适配的 `ic_launcher.png` 图标。

  - **图标存放位置：** 找到 `项目根目录 -> android -> app -> src -> main -> res` 文件中，以 `mipmap-` 开头的文件。

  - **图标存放规则：** 将对应的图标尺寸放入对应的文件夹中（ `hdpi`、`mdpi`、`xhdpi`、`xxhdpi`、`xxxhdpi` ）。

<br/>

```xml
<application
    ...
    android:label="xxx"
    android:icon="@mipmap/ic_launcher">
```

<br/>
<br/>
<br/>

### `IOS` 端图标、应用名

- **1、** 打开  `项目根目录 -> ios -> Runner` 中的 `Info.plist` 文件。

- **2、** 修改应用名

```xml
<dict>
	<key>CFBundleName</key>
	<string>直接写应用名</string>
</dict>
```

- **3、** 打开  `项目根目录 -> ios -> Runner -> Assets.xcassets -> AppIcon.appiconset` 文件夹

- **4、** 

  - 将 UI 给的 `@1x`、`@2x`、`@3x` 的图片直接放到该目录下。

  - `Contents.json` 则为配置文件。