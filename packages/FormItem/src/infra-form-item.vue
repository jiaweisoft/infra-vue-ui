<template>
  <div class="formItem">
    <div class="infra-formItem-content">
      <div v-if="label" :labelWidth="labelWidth" class="infra-label">{{label}}</div>
      <!--<InfraInput1 style="width: 100%" placeholder="姓名"></InfraInput1>-->
      <slot></slot>
    </div>
    <div class="infra-error">
      <span v-if="isShowError">{{message}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'infra-form-item',
    data: function () {
      return {
        formData: null,
        rules: null,
        message: '',
        isShowError: false
      };
    },
    props: {
      label: String,
      labelWidth: {
        type: [String, Number],
        default: 0
      },
      prop: String
    },
    watch: {
      // 这里应该监听是数据的变化。
      formData: {
        deep: true,
        handler: function () {
          // alert(123);
          // this.handleValid();
        }
      }
    },
    mounted () {
      // console.log('formItem', this.formData);
    },
    methods: {
      handleValid () {
        if (this.prop) {
          let ruleArr = this.rules[this.prop];
          for (let i = 0; i < ruleArr.length; i++) {
            let result = this.isValid(ruleArr[i]);
            if (!result) {
              return false;
            }
          }
          return true;
        }
        // 在没有传递prop的时候，默认不进行校验
        return true;
      },
      isValid: function (obj) {
        let data = this.formData[this.prop];
        if (obj.required && !data) {
          this.message = obj.message;
          this.isShowError = true;
          return false;
        }
        if (data && obj.validator && obj.validator(data)) {
          this.message = obj.message;
          this.isShowError = true;
          return false;
        }
        this.message = '';
        this.isShowError = false;
        return true;
      },
      setCurrentData: function (data, rules) {
        this.formData = data;
        this.rules = rules;
      }
    }
  };
</script>

<style scoped>
  .infra-formItem-content {
    display: flex;
  }
  .infra-error {
    height: 20px;
    color: red;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .infra-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
  }
</style>
