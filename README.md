## v-slot:
1. vue2 可以通过`this.$slots` and `this.$scopedSlots` 获取插槽内容
2. vue3 所有插槽都是通过 `this.$slots` 引用的, 移除了 `this.$scopedSlots`
- vue2
```html
<foo slot-scope="{msg}">
  <div> {{msg}} </div>
</foo>
```
- vue3
```html
<!-- default slot -->
<foo v-slot="{msg}">
  {{msg}}
</foo>

<!-- named slot -->
<foo v-slot:one="{msg}">
  <template>
    {{msg}}
  </template>
</foo>

<!-- 简写 --->
<foo>
  <template #header="{msg}">
    {{msg}}
  </template>

  <template #footer>
    A static footer
  </template>
</foo>
```

## 全局 API
  - 采用具名导出, 更容易 tree shaking, 没有用到的 API 不会被打包到最终生产文件中

```js
import { nextTick, observable } from 'vue'
nextTick(()=>{})
const obj = observable({})
```

  - 通过 createApp 全局 api 单独配置, 在程序中可以拥有多个 Vue 实例, 且各个实例配置互不影响
vue 2
```js
import Vue from 'vue'
Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

vue.prototype.customProperty = () => {}

new Vue({
  render: h=> h(App)
}).$mount('#app')
```
vue 3
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

app.config.globalProperties.customProperty = () => {}

app.mount(App, '#app')
```

## Teleport 应用节点外渲染
```html
<!--渲染到指定节点-->
<template>
  <teleport to="#endobody">
    <div>
      渲染到 
    </div>
  </teltport>
</template>

<!--渲染到 body-->
<template>
  <teleport to="body">
    <div>
      渲染到 
    </div>
  </teltport>
</template>
```

## Composition API

## v-model 变化
使用 `v-model` 指令代替 `v-bind.sync`
## 指令 API 变化


## TypeScript