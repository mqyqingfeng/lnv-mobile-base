## dialog组件用法

### 只有确定按钮的dialog

```js

lnv.alert({
    title: '提示',
    content: 'content',
    alertBtnText: '确定',
    alertHandler: function(){

    }
})

```

### 有取消和确定按钮的dialog

```js

lnv.confirm({
    title: '提示',
    content: 'content',
    confirmBtnText: '确定选择',
    confirmHandler: function(){

    },
    cancelBtnText: '取消',
    cancelHandler: function(){

    }
})

```
