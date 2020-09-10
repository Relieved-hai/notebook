沉浸式状态栏

`main.dart`

```javascript
void main() {
  runApp(MyApp());
  
  SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(statusBarColor: Colors.transparent);
  SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
}
...
...
...
```
