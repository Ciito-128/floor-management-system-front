<template>
  <a-card>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading">
      <template slot="status" slot-scope="text">
        <a-tag v-if="text == '1'" color="blue"> 使用中 </a-tag>
        <a-tag v-else color="green"> 未使用 </a-tag>
      </template>
      <template slot="floorAction" slot-scope="text, record">
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => deleteRecord(record.id)"
        >
          <a> <a-icon type="delete" />删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { workstationData } from '@/mock/logs'
export default {
  name: 'LogManagement',
  data() {
    return {
      loading: false,
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '操作人',
          dataIndex: 'actionPerson'
        },
        {
          title: '操作类型',
          dataIndex: 'action'
        },
        {
          title: '操作时间',
          dataIndex: 'actionTime'
        },
        {
          title: '位置',
          dataIndex: 'location'
        },
        {
          title: '工位状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'floorAction',
          scopedSlots: { customRender: 'floorAction' }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.dataSource = workstationData.workstations.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 500)
    },
    deleteRecord(id) {
      this.loading = true
      this.dataSource = this.dataSource.filter((item) => item.id !== id)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
