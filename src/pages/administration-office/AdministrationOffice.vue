<template>
  <a-card>
    <!-- 搜索 -->
    <a-form :form="form" layout="inline" style="margin-bottom: 8px">
      <a-form-item label="办公室名称">
        <a-input v-model="form.officeName" allowClear />
      </a-form-item>
      <a-form-item label="楼层名称">
        <a-input v-model="form.floorName" allowClear />
      </a-form-item>
      <a-form-item label="办公室使用状态">
        <a-select v-model="form.usageStatus" allowClear style="width: 200px">
          <a-select-option :value="1">使用中</a-select-option>
          <a-select-option :value="0">未使用</a-select-option>
        </a-select>
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
      <template slot="usageStatus" slot-scope="text">
        <a-tag v-if="text" color="blue"> 使用中 </a-tag>
        <a-tag v-else color="green"> 未使用 </a-tag>
      </template>
      <template slot="floorAction" slot-scope="text, record">
        <!-- 详情 -->
        <a @click="editRecord(record, 'view')"> <a-icon type="eye" /> 详情 </a>
        <a-divider type="vertical" />
        <a @click="editRecord(record, 'edit')"> <a-icon type="edit" />编辑 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => deleteRecord(record.officeId)"
        >
          <a> <a-icon type="delete" />删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <AdministrationOfficeModal ref="AdministrationOfficeModal" @ok="setData" />
  </a-card>
</template>

<script>
import { officesList } from '@/mock/office'
import _ from 'lodash'
import AdministrationOfficeModal from './AdministrationOfficeModal.vue'
export default {
  name: 'AdministrationOffice',
  components: {
    AdministrationOfficeModal
  },
  data() {
    return {
      loading: false,
      dataSource: [],
      form: {
        officeName: '',
        floorName: '',
        usageStatus: null
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'index'
        },
        {
          title: '办公室名称',
          dataIndex: 'officeName'
        },
        {
          title: '办公室使用状态',
          dataIndex: 'usageStatus',
          scopedSlots: { customRender: 'usageStatus' }
        },
        {
          title: '工位(个)',
          dataIndex: 'capacity'
        },
        {
          title: '楼层名称',
          dataIndex: 'floorName'
        },
        {
          title: '楼层管理员姓名',
          dataIndex: 'floorAdminName'
        },
        {
          title: '楼层管理员电话',
          dataIndex: 'floorAdminPhone'
        },
        {
          title: '操作',
          dataIndex: 'floorAction',
          scopedSlots: { customRender: 'floorAction' }
        }
      ],
      loadshData: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    setData(record) {
      if (!record.officeId) {
        this.dataSource.push({
          ...record,
          index: this.dataSource.length + 1,
          officeId: Math.random().toString(36).substr(2)
        })
      } else {
        this.dataSource = this.dataSource.map((item) => {
          if (item.officeId === record.officeId) {
            return record
          }
          return item
        })
        this.loadshData = _.cloneDeep(this.dataSource)
      }
    },
    getData() {
      this.loading = true
      this.dataSource = officesList.map((item, index) => {
        return {
          ...item,
          index: index + 1
        }
      })
      this.loadshData = _.cloneDeep(this.dataSource)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 500)
    },
    search() {
      this.loading = true
      this.dataSource = this.loadshData.filter((item) => {
        return (
          (!this.form.officeName ||
            item.officeName.includes(this.form.officeName)) &&
          (!this.form.floorName ||
            item.floorName.includes(this.form.floorName)) &&
          (this.form.usageStatus === null ||
            item.usageStatus === this.form.usageStatus)
        )
      })
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    reset() {
      this.loading = true
      this.form = {
        officeName: '',
        floorName: '',
        usageStatus: null
      }
      this.dataSource = _.cloneDeep(this.loadshData)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    add() {
      this.$refs.AdministrationOfficeModal.openModal({}, 'add')
    },
    editRecord(record, type) {
      this.$refs.AdministrationOfficeModal.openModal(record, type)
    },
    deleteRecord(officeId) {
      this.loading = true
      this.dataSource = this.dataSource.filter(
        (item) => item.officeId !== officeId
      )
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
