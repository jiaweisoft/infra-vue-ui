<template>
  <div class="infra-my-modal-bg infra-center">
    <div class="infra-flexBox infra-flexCol infra-my-modal">
      <div class="infra-modal-header">
        <h4 class="infra-modal-title">{{title}}</h4>
        <i @click="close" class="iconfont iconclose infra-icon"></i>
      </div>
      <div class="infra-modal-body">
        <p v-if="!dangerouslyUseHTMLString">{{content}}</p>
        <p v-if="dangerouslyUseHTMLString" v-html="content"></p>
      </div>
      <div class="infra-modal-footer">
        <InfraButton v-if="type === 'confirm'" @click="cancelEvent" type="default">取消</InfraButton>
        <InfraButton v-if="type === 'confirm'" @click="confirmEvent" class="infra-positionConfirm" type="default">确认</InfraButton>
        <InfraButton v-if="type === 'alert'" @click="closeEvent" class="infra-positionRight" type="default">Close</InfraButton>
      </div>
    </div>
  </div>
</template>

<script>
  import InfraButton from '../../Button/index';
  export default {
    name: 'MessageBox',
    data: function () {
      return {
        title: '提示信息!',
        content: '内容信息',
        type: 'alert',
        dangerouslyUseHTMLString: false
      };
    },
    components: {
      InfraButton
    },
    methods: {
      closeEvent () {
        if (this.onClose && typeof this.onClose === 'function') {
          this.onClose();
        }
        this.close();
      },
      confirmEvent () {
        if (this.onConfirm && typeof this.onConfirm === 'function') {
          this.onConfirm();
        }
        this.close();
      },
      cancelEvent () {
        if (this.onCancel && typeof this.onCancel === 'function') {
          this.onCancel();
        }
        this.close();
      },
      close () {
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
    background-color: rgba(0, 0, 0, 0.3);
  }

  .infra-my-modal {
    width: 600px;
    height: auto;
    background-color: #ffffff;
    font-size: 16px;
    color: #333333;
    font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  }
  .infra-modal-header {
    height: 56px;
    font-size: 18px;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    position: relative;
  }
  .infra-modal-title {
    padding: 0;
    margin: 0;
    font-family: 'Source Sans Pro',sans-serif;
  }
  .infra-modal-body {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 14px;
  }
  .infra-modal-footer {
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
  }

  .infra-flexBox {
    display: flex;
  }

  .infra-flexCol {
    flex-direction: column;
  }

  .infra-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .infra-positionRight {
    position: relative;
    left: 500px;
  }
  .infra-positionConfirm {
    position: absolute;
    right: 15px;
  }
  .infra-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999999;
  }
</style>
