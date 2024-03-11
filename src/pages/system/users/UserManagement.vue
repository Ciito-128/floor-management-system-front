<template>
  <a-card>
    <!-- 搜索 -->
    <a-form :form="form" layout="inline" style="margin-bottom: 8px">
      <a-form-item label="姓名">
        <a-input v-model="form.userName" />
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
    <a-table
      :columns="columns"
      rowKey="userId"
      :data-source="dataSource"
      :loading="loading"
    >
      <template slot="floorAction" slot-scope="text, record">
        <a @click="editRecord(record, 'edit')"> <a-icon type="edit" />编辑 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => deleteRecord(record.userId)"
        >
          <a> <a-icon type="delete" />删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <UserManagementModal ref="UserManagementModalRef" @ok="setData" />
  </a-card>
</template>

<script>
import _ from 'lodash'
import { usersList } from '@/mock/users'
import UserManagementModal from './UserManagementModal.vue'
import dayjs from 'dayjs'
export default {
  name: 'UserManagement',
  components: { UserManagementModal },
  data() {
    return {
      loading: false,
      dataSource: [],
      form: {
        userName: ''
      },
      columns: [
        {
          title: '序号',
          width: 80,
          dataIndex: 'index',
          customRender: (text, record, index) => {
            return index + 1
          }
        },
        {
          title: '姓名',
          dataIndex: 'userName'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
        {
          title: '联系方式',
          dataIndex: 'stationPhone'
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
      if (!record.userId) {
        this.dataSource.push({
          ...record,
          index: this.dataSource.length + 1,
          userId: Math.random().toString(36).substr(2),
          createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        this.dataSource = this.dataSource.map((item) => {
          if (item.userId === record.userId) {
            return record
          }
          return item
        })
        this.loadshData = _.cloneDeep(this.dataSource)
      }
    },
    getData() {
      this.loading = true
      this.dataSource = usersList.flatMap((office) => office.usersList)
      this.loadshData = _.cloneDeep(this.dataSource)
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    search() {
      this.loading = true
      this.dataSource = this.loadshData.filter((item) => {
        return !this.form.userName || item.userName.includes(this.form.userName)
      })
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    reset() {
      this.loading = true
      this.form = {
        userName: ''
      }
      this.dataSource = _.cloneDeep(this.loadshData)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    add() {
      this.$refs.UserManagementModalRef.openModal({}, 'add')
    },
    editRecord(record, type) {
      this.$refs.UserManagementModalRef.openModal(record, type)
    },
    deleteRecord(userId) {
      this.loading = true
      this.dataSource = this.dataSource.filter((item) => item.userId !== userId)
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
