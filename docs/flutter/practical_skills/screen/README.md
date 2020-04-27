如果你的项目并没有 **适配横竖屏**，那么就要强制限制屏幕方向。

<br/>

### `Android` 端

找到 `项目根目录 -> android -> app -> src -> main` 路径下的 `AndroidManifest.xml` 文件，在 `activity` 中添加 `screenOrientation` 属性。

```xml
<activity
    ...
    android:screenOrientation="portrait">
</activity>
```

<br/>
<br/>
<br/>

### `Ios` 端


打开：`项目根目录 -> ios -> Runner -> Info.plist`

```plist
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationLandscapeLeft</string> // 删除这行
    <string>UIInterfaceOrientationLandscapeRight</string> // 删除这行
</array>
<key>UISupportedInterfaceOrientations~ipad</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
    <string>UIInterfaceOrientationLandscapeLeft</string> // 删除这行
    <string>UIInterfaceOrientationLandscapeRight</string> // 删除这行
</array>
```

<br/>

:::tip
上面的改动，将会影响到整个应用的屏幕显示
:::


<br/>
<br/>
<br/>

也可以使用三方的 `packages` 来实现，例如要 **动态配置某个页面的横竖屏** 也可以使用：[orientation](https://pub.flutter-io.cn/packages/orientation#-installing-tab-)
