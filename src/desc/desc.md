### 替换favicon.ico
设置vue.config.js
```
pwa: {
  iconPaths: {
    favicon32: 'favicon.ico',
    favicon16: 'favicon.ico',
    appleTouchIcon: 'favicon.ico',
    maskIcon: 'favicon.ico',
    msTileImage: 'favicon.ico'
  }
}
```
### bug处理
#### 使用forEach、map的时候报错 has an 'any' type
解决方法：为参数添加声明any
```
arr.map((item: any) => {
        
});
```
#### 使用filters
必须将filters放到component 里面

#### 使用表单
必须在组件里面设置，会出现红色警告，但是运行的时候不会报错
```
  beforeCreate () {
    this.form = this.$form.createForm(this);     
  }
```
#### 修改触发验证的方式
```
{ 
  validateTrigger: [ 'blur'], 
  rules: [{ validator: validatorPhone}] }
```

#### 读取表单的值的时候只能通过下面的方式
```
{
  this.form.getFieldValue('password')
}
```

#### 图片懒加载
只有列表的图片才使用懒加载，用户的头像信息不能使用懒加载。


#### 使用 vue-social-share
1. 在main.js中
import Share from 'vue-social-share'
Vue.use(Share)

2. 在组件中直接使用
```
<share :config="config" v-if="showShare"></share>
```
首选设置showShare为false，当config设置完成以后，设置showShare为true

#### 兼容ie
#### SCRIPT1003: 缺少 ':'
1. 找到对应的包，将包的install方法改成key:value类型
[参考地址](https://blog.csdn.net/lbPro0412/article/details/82466986)
```
install (Vue, options) {
  Vue.component('vue-particles', particles)
}
 ===>
install: function(Vue, options) {
  Vue.component('vue-particles', particles)
}
```

#### 在使用antd的时候，ie浏览器不支持以svg的形式导入icon，可以用一张小图片代替

#### ie浏览器，进行时间处理的时候必须把-换成/，否则计算出来的结果就是NaN
```
time = timeProp.replace(/-/g, '/');
```