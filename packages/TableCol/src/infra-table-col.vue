<template>
  <th class="infra-th">
    {{type === 'default' ? label : ''}}
    <input @click="changeEvent" type="checkbox" v-if="type === 'selection'">
  </th>
</template>

<script>
  import PubSub from 'wd-pub-sub';
  import Config from '../../packages.config';
  export default {
    name: 'infra-table-col',
    props: {
      label: String,
      prop: {
        type: String,
        default: '-'
      },
      type: {
        default: 'default',
        validator: function (val) {
          return ['default', 'selection'].indexOf(val) !== -1;
        }
      }
    },
    methods: {
      changeEvent (e) {
        let value = e.target.checked;
        PubSub.notify(Config.tableName, value);
      }
    }
  };
</script>

<style scoped>
  .infra-th {
    border-bottom: 1px solid #f4f4f4;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 0 2px;
    text-align: center;
  }
</style>
