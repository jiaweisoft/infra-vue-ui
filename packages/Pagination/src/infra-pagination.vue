<template>
  <div class="infra-pagination">
    <div class="infra-left infra-leftCenter">
      <span>当前第{{data_currentPage}}页，共{{range[1]}}页</span>
    </div>
    <div class="infra-right infra-flex1">
      <div class="infra-flex1"></div>
      <infra-button @click="preEvent" :disabled="data_currentPage <= 1" class="infra-pre-btn" type="default">上一页</infra-button>
      <infra-button @click="nextEvent" :disabled="data_currentPage >= range[1]" class="infra-next-btn" type="default">下一页</infra-button>
      <input v-model="inputValue" ref="input" class="infra-input" type="number">
      <infra-button @click="goEvent" class="infra-go" type="default">Go！</infra-button>
    </div>
  </div>
</template>

<script>
  import InfraButton from '../../Button/index';
  export default {
    name: 'infra-pagination',
    data: function () {
      return {
        data_tatal: this.total,
        data_pageSize: this.pageSize,
        data_currentPage: this.currentPage,
        inputValue: ''
      };
    },
    props: {
      pageSize: {
        default: 20
      },
      currentPage: {
        default: 1
      },
      total: {
        default: 0
      },
      currentChange: {
        type: Function,
        default: () => {}
      }
    },
    computed: {
      range: function () {
        return [1, Math.ceil(this.data_tatal / this.data_pageSize)];
      }
    },
    watch: {
      total: function (val) {
        this.data_tatal = val;
      },
      currentPage: function (val) {
        this.data_currentPage = val;
      },
      pageSize: function (val) {
        this.data_pageSize = val;
      }
    },
    components: {
      InfraButton
    },
    methods: {
      preEvent () {
        this.data_currentPage = this.data_currentPage - 1;
        this.currentChange(this.data_currentPage);
      },
      nextEvent () {
        this.data_currentPage = this.data_currentPage + 1;
        this.currentChange(this.data_currentPage);
      },
      goEvent () {
        let val = parseInt(this.$refs.input.value);
        let start = this.range[0];
        let end = this.range[1];
        if (val > end) {
          this.data_currentPage = end;
        }
        if (val < start) {
          this.data_currentPage = start;
        }
        if (val >= start && val <= end) {
          this.data_currentPage = val;
        }
        this.inputValue = this.data_currentPage;
        this.currentChange(this.data_currentPage);
      }
    }
  };
</script>

<style scoped>
  .infra-pagination {
    font-size: 14px;
    color: #333;
    display: flex;
  }
  .infra-flex1 {
    flex: 1;
  }
  .infra-leftCenter {
    display: flex;
    align-items: center;
  }
 .infra-input {
   display: inline-block;
   border: 1px solid #ddd;
   outline: none;
   height: 37px;
   width: 100px;
   margin-left: 5px;
 }
 .infra-input:focus {
   border: 1px solid #367fa9;
 }
 .infra-pre-btn {
   border-top-right-radius: 0;
   border-bottom-right-radius: 0;
   background-color: #fafafa;
   border: 1px solid #ddd;
 }
 .infra-next-btn {
   border-top-left-radius: 0;
   border-bottom-left-radius: 0;
   background-color: #fafafa;
   border: 1px solid #ddd;
 }
 .infra-right {
   display: flex;
 }
  .infra-go {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #fafafa;
    border: 1px solid #ddd;
  }
  .infra-pre-btn:focus {
    color: #337ab7;
  }
  .infra-next-btn:focus {
    color: #337ab7;
  }
  .infra-go:focus {
    color: #337ab7;
  }
</style>
