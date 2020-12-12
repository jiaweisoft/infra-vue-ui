<template>
  <table :style="tableStyle" cellspacing="0" cellpadding="5" class="infra-table" border="1">
    <tr class="infra-tr infra-title" :class="{'infra-mini': size === 'mini'}">
      <slot ref="slot"></slot>
    </tr>
    <tr @click="itemEvent(item, index)" :key="index" v-for="(item, index) in checkedList" class="infra-tr" :class="{'infra-mini': size === 'mini', 'infra-checked': (currentIndex === index) && (itemClick)}">
      <td :key="$index" v-for="(td, $index) in propsArray" class="infra-td" :class="{'infra-mini': size === 'mini'}">
        <slot v-if="!(td.type==='selection')" :name="td.prop" v-bind:row="item">
          {{item[td.prop]}}
        </slot>
        <input @click="choiceEvent(index)" :checked="item.isChecked" v-if="td.type==='selection'" type="checkbox">
      </td>
    </tr>
    <tr v-if="!tableData.length" class="infra-tr infra-center" :class="{'infra-mini': size === 'mini'}">
      <td class="infra-td infra-nodata" :colspan="propsArray.length">无数据</td>
    </tr>
  </table>
</template>

<script>
  /**
   * @infomation: tableData——向上暴露的接口，用于接收表格数据。
   * selection-change：向上暴露的接口，用于接收已经选择的表格数据。
   */
  import DomSize from 'wd-domsize-monitor';
  import PubSub from 'wd-pub-sub';
  import Config from '../../packages.config';
  export default {
    name: 'infra-table',
    data: function () {
      return {
        tableStyle: {
          width: '600px'
        },
        currentIndex: '',
        propsArray: [],
        checkedList: []
      };
    },
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      itemClick: Function,
      size: {
        type: String,
        default: 'default',
        validator: function (val) {
          return ['default', 'mini'].indexOf(val) !== -1;
        }
      }
    },
    watch: {
      tableData: function () {
        this.checkedList = JSON.parse(JSON.stringify([...this.tableData]));
      }
    },
    mounted () {
      PubSub.subscribe(Config.tableName, this.pubCallBack);
      DomSize.bind(this.$parent.$el, this.callback);
      this.callback();
      // this.propsArray = this.$slots.default.map(item => item.componentOptions.propsData);
      // @todo:这里相当于打了一个布丁，目前不知道这个是为什么有些componentOptions为undefined。
      this.propsArray = this.$slots.default.filter(item => {
        return item.componentOptions;
      }).map(item => item.componentOptions.propsData);
      this.checkedList = JSON.parse(JSON.stringify([...this.tableData]));
    },
    beforeDestroy () {
      DomSize.remove(this.$parent.$el);
    },
    methods: {
      itemEvent (item, index) {
        this.itemClick && this.itemClick({ ...item });
        this.currentIndex = index;
      },
      choiceEvent (index) {
        this.checkedList = this.checkedList.map((item, $index) => {
          if (index === $index) {
            item.isChecked = !item.isChecked;
          }
          return item;
        });
        let selectArr = [...this.checkedList].filter(item => item.isChecked === true);
        this.$emit('selection-change', selectArr);
      },
      pubCallBack (data) {
        this.checkedList = this.checkedList.map(item => {
          item.isChecked = data;
          return item;
        });
        let selectArr = [...this.checkedList].filter(item => item.isChecked === true);
        this.$emit('selection-change', selectArr);
      },
      callback () {
        let style = window.getComputedStyle(this.$parent.$el, null);
        this.tableStyle.width = style.width;
      }
    }
  };
</script>

<style scoped>
  .infra-table {
    width: 100%;
    height: auto;
    border: 1px solid #f4f4f4;
    color: #606266;
    font-size: 14px;
  }
  infra-title {
    color: #333;
  }
  .infra-tr {
    height: 50px;
  }
  .infra-mini {
    height: 40px !important;
    padding: 0;
  }
  .infra-tr:hover {
    background-color: #eeeeee;
  }
  .infra-td {
    border-bottom: 1px solid #f4f4f4;
    border-left: 0;
    border-right: 0;
    border-top: 0;
    padding: 0 20px;
    text-align: center;
  }
  .infra-center {
    text-align: center;
  }
  .infra-nodata {
    background-color: #f4f4f4
  }
  .infra-checked {
    background-color: #eeeeee;
  }
</style>
