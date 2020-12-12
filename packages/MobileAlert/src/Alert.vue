<template>
  <div class="infra-my-modal-bg infra-center">
    <div class="infra-flexBox infra-flexCol infra-my-modal">
      <div class="infra-flex2 infra-center infra-tips">{{message || '消息提示文本'}}</div>
      <div @click="click" class="infra-flex1 infra-center infra-btn">关闭</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    data: function () {
      return {
        message: null,
        onClose: null
      };
    },
    methods: {
      click: function () {
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>

<style scoped>
  .infra-my-modal-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .infra-my-modal {
    width: 65%;
    max-width: 400px;
    height: 120px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #888888;
    background-color: #ffffff;
    font-size: 14px;
  }

  .infra-btn {
    border-top: 1px solid #cccccc;
    color: #009FE8;
    cursor: pointer;
  }

  .infra-flexBox {
    display: flex;
  }

  .infra-flexCol {
    flex-direction: column;
  }

  .infra-flex1 {
    flex: 1;
  }

  .infra-flex2 {
    flex: 2;
  }

  .infra-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .infra-tips {
    text-align: center;
    padding: 5px 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
