<template>
  <div class="infra-my-modal-bg infra-center">
    <div class="infra-flexBox infra-flexCol infra-my-modal">
      <div class="infra-modal-body infra-center">
        <p class="infra-center" v-if="!dangerouslyUseHTMLString">{{content}}</p>
        <p class="infra-center" v-if="dangerouslyUseHTMLString" v-html="content"></p>
      </div>
      <div class="infra-modal-footer infra-flexBox">
        <div v-if="type === 'confirm'" @click="cancelEvent" class="infra-flex1 infra-center">{{leftBtnText}}</div>
        <div v-if="type === 'confirm'" class="infra-middle"></div>
        <div v-if="type === 'confirm'" @click="confirmEvent" class="infra-flex1 infra-center">{{rightBtnText}}</div>
        <div v-if="type === 'alert'" @click="closeEvent" class="infra-flex1 infra-center">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MobileMessageBox',
    data: function () {
      return {
        content: '内容信息',
        type: 'alert',
        dangerouslyUseHTMLString: false,
        leftBtnText: '返回',
        rightBtnText: '保存'
      };
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
  .infra-flex1 {
    flex: 1;
  }

  .infra-my-modal {
    width: 65%;
    max-width: 400px;
    border-radius: 10px;
    height: auto;
    background-color: #ffffff;
    font-size: 16px;
    color: #333333;
    font-family: 'Microsoft YaHei';
  }
  .infra-modal-body {
    height: 120px;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    color: #8f8f94;
    font-family: 'Microsoft YaHei';
    text-align: center  ;
  }
  .infra-modal-footer {
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    color: #009FE8;
    height: 45px;
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
    top: 20px;
    transform: translateY(-50%);
    color: #999999;
  }
  .infra-middle {
    width: 1px;
    height: 100%;
    background-color: #e5e5e5;
  }

</style>
