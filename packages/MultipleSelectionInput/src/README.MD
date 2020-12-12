## MultipleSelectionInput组件说明

##### 1、数据流向图

【dataSource & checkedList: props】------>【sourceList: data】------> 【filterList: computed】-------> 【choicedList: computed】

##### 2、优化

1，this.sourceList赋值优化。
```
this.sourceList = ....
```

2，事件触发方式的优化。
```
this.$emit('change', this.sourceList, this.choicedList);
```

3，isChoice初始化的优化。

```javascript
let item = this.sourceList.find(item => item.id === arr[i]);
if (item) {
  item.isChoice = true;
} else {
  item.isChoice = false;
}
```

4，watch监听优化。（最后进行this.sourceList的赋值操作）

5，filterList的优化。设置setter。
