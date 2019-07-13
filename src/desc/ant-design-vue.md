### 实现ant-design-vue的按需加载方案
#### 引入所有的组件，然后加载到vue上面
* 结合@/core/components-ant.ts 查看
```
import Vue from 'vue'
import Ant from 'ant-design-vue'
let {
  LocaleProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  ...
} = Ant

Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
...
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
```

#### 对Ant Design Vue进行文件声明处理
* @/types/index.d.ts
```
declare module 'ant-design-vue' {
  const Ant: any
  export default Ant;
}
```

### 安装插件并处理
#### 安装插件
```
npm i babel-plugin-import --dev
```
#### 进行设置
* 参考 babel.config.js
```
plugins: [
  [ "import", {
    "libraryName": "ant-design-vue",
    "libraryDirectory": "es",
    "style": "css"
  } ]
]
```
### 修改主题
* 参考 vue.config.js
```
css: {
  /* less 变量覆盖，用于自定义 ant design 主题 */
  loaderOptions: {
    less: {
      // modifyVars: {
      //   'primary-color': '#1DA57A',
      //   'link-color': '#1DA57A',
      //   'border-radius-base': '2px',
      // },
      javascriptEnabled: true
    }
  }
}
```


### ant-Design-vue 将组件默认的英文修改为中文
* 在app.vue中进行设置
```
  <a-locale-provider :locale="locale">
    <div id="app">
      ...
    </div>
  </a-locale-provider>

  <script>
    import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
    export default class Home extends Vue {
      locale = zhCN
    }
  </script>
```

### 表单通过submit提交的时候，事件处理函数必须显示阻止默认行为
```
handleSubmitByMesssage (e:any) {
  e.preventDefault();
  ...
}
```