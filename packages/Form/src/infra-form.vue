<template>
  <div class="infra-form">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'infra-form',
    props: {
      rules: {
        type: Object
      },
      value: Object
    },
    watch: {
      value: {
        deep: true,
        handler: function (val, old) {
          this.pubData();
        }
      },
      rules: {
        deep: true,
        handler: function (val, old) {
          this.pubData();
        }
      }
    },
    mounted () {
      this.pubData();
    },
    methods: {
      pubData: function () {
        this.$scopedSlots.default().forEach(item => {
          let instance = item.componentInstance;
          if (instance) {
            instance.setCurrentData && instance.setCurrentData({ ...this.value }, { ...this.rules });
          }
        });
      },
      validate (fun) {
        return new Promise((resolve, reject) => {
          let result = [];
          this.$scopedSlots.default().forEach(item => {
            let instance = item.componentInstance;
            if (instance) {
              let thisRes = instance.setCurrentData && instance.handleValid();
              result.push(thisRes);
            }
          });
          if (result.every(item => item === true)) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).then(res => {
          fun && fun(res);
        });
      }
    }
  };
</script>

<style scoped>
  .infra-form {
    min-width: 200px;
    padding: 30px 50px;
  }
</style>
