<template>
  <button
    class="infra-btn infra-btn-warning"
    v-bind:class="{'infra-btn-default': type === 'default', 'infra-btn-danger': type === 'danger', 'infra-btn-success': type === 'success'}"
    @click="handleClick"
    :disabled="disabled"
    :style="{background: disabled ? 'disabledBgColor' : '', cursor: disabled ? 'no-drop' : '', height: form.height}"
  >
    <slot></slot>
  </button>
</template>

<script>
  import { form } from '../../packages.config';
  export default {
    name: 'infra-button',
    data: function () {
      return {
        form: { ...form }
      };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        validator: function (val) {
          return ['default', 'danger', 'success'].indexOf(val) !== -1;
        }
      },
      disabledBgColor: {
        type: String,
        default: '#ccc'
      }
    },
    methods: {
      handleClick: function (evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>

<style scoped>
  .infra-btn {
    vertical-align: top;
    padding: 10px 20px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 5px;
    outline: none;
  }

  .infra-btn-warning {
    background: #F5A623;
    color: #ffffff;
  }
  .infra-btn-default {
    color: #444;
    background: #e9e9e9;
  }
  .infra-btn-success {
    color: #ffffff;
    background: #67C23A;
  }
  .infra-btn-danger {
    color: #ffffff;
    background: #F56C6C;
  }

  .infra-btn:active {
    opacity: 0.9;
  }
  /*hover状态*/
  .infra-btn-warning:hover {
    background: #fccc7d;
  }
  .infra-btn-default:hover {
    background: #d9d9d9;
  }
  .infra-btn-success:hover {
    background: #aadf90;
  }
  .infra-btn-danger:hover {
    background: #f7a6a6;
  }
</style>
