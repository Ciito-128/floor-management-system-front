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
        <a @click="editRecord(record, 'edit')"> <a-icon type="edit" />编辑 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => deleteRecord(record.roleId)"
        >
          <a> <a-icon type="delete" />删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <RoleManagementModal ref="RoleManagementModalRef" @ok="setData" />
  </a-card>
</template>

<script>
import _ from 'lodash'
import { rolesList } from '@/mock/role'
import RoleManagementModal from './RoleManagementModal.vue'
import dayjs from 'dayjs'
export default {
  name: 'RoleManagement',
  components: { RoleManagementModal },
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
      ],
      loadshData: {}
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    setData(record) {
      if (!record.roleId) {
        this.dataSource.push({
          ...record,
          index: this.dataSource.length + 1,
          roleId: Math.random().toString(36).substr(2),
          createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        this.dataSource = this.dataSource.map((item) => {
          if (item.roleId === record.roleId) {
            return record
          }
          return item
        })
        this.loadshData = _.cloneDeep(this.dataSource)
      }
    },
    getData() {
      this.loading = true
      this.dataSource = rolesList.map((item, index) => {
        return {
          index: index + 1,
          ...item
        }
      })
      this.loadshData = _.cloneDeep(this.dataSource)
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    search() {
      this.loading = true
      this.dataSource = this.loadshData.filter((item) => {
        return !this.form.roleName || item.roleName.includes(this.form.roleName)
      })
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    reset() {
      this.loading = true
      this.form = {
        roleName: ''
      }
      this.dataSource = _.cloneDeep(this.loadshData)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    add() {
      this.$refs.RoleManagementModalRef.openModal({}, 'add')
    },
    editRecord(record, type) {
      this.$refs.RoleManagementModalRef.openModal(record, type)
    },
    deleteRecord(roleId) {
      this.loading = true
      this.dataSource = this.dataSource.filter((item) => item.roleId !== roleId)
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
