<template>
  <a-card>
    <!-- 搜索 -->
    <a-form :form="form" layout="inline" style="margin-bottom: 8px">
      <a-form-item label="角色名称">
        <a-input v-model="form.roleName" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="search" style="margin-right: 8px">
          <a-icon type="search" />
          查询
        </a-button>
        <a-button @click="reset" style="margin-right: 8px"
          ><a-icon type="redo" />重置</a-button
        >
        <a-button type="primary" @click="add"
          ><a-icon type="plus" />新增</a-button
        >
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading">
      <template slot="floorAction" slot-scope="text, record">
        <a @click="editRecord(record)"> <a-icon type="edit" />编辑 </a>
        <a-divider type="vertical" />
        <a @click="deleteRecord(record.id)"> <a-icon type="delete" />删除 </a>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { rolesList } from '@/mock/role'
export default {
  name: 'RoleManagement',
  data() {
    return {
      loading: false,
      dataSource: [],
      form: {
        roleName: ''
      },
      columns: [
        {
          title: '序号',
          width: 80,
          dataIndex: 'index'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '角色描述',
          width: 560,
          ellipsis: true,
          dataIndex: 'roleDescription'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime'
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
      this.dataSource = rolesList.map((item, index) => {
        return {
          index: index + 1,
          ...item
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    search() {},
    reset() {},
    add() {},
    editRecord(record) {},
    deleteRecord(id) {}
  }
}
</script>

<style lang='less' scoped>
</style>
