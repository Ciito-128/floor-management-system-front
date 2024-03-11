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
      <a-form-item label="工位使用状态">
        <a-select v-model="form.stationStatus" allowClear style="width: 200px">
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
    <a-table
      bordered
      :columns="columns"
      rowKey="workstationId"
      :scroll="{ x: 1600, y: 570 }"
      :data-source="dataSource"
      :loading="loading"
    >
      <template slot="stationStatus" slot-scope="text">
        <a-tag v-if="text" color="blue"> 使用中 </a-tag>
        <a-tag v-else color="green"> 未使用 </a-tag>
      </template>
      <template slot="usageStatus" slot-scope="text">
        <a-tag v-if="text" color="blue"> 使用中 </a-tag>
        <a-tag v-else color="green"> 未使用 </a-tag>
      </template>
      <template slot="stationAction" slot-scope="text, record">
        <!-- 详情 -->
        <a @click="editRecord(record, 'view')"> <a-icon type="eye" /> 详情 </a>
        <a-divider type="vertical" />
        <a @click="editRecord(record, 'edit')"> <a-icon type="edit" />编辑 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => deleteRecord(record.workstationId)"
        >
          <a> <a-icon type="delete" />删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <StationManagementModal ref="StationManagementModalRef" @ok="setData" />
  </a-card>
</template>

<script>
import { officesList } from '@/mock/office'
import StationManagementModal from './StationManagementModal.vue'
import _ from 'lodash'
export default {
  name: 'StationManagement',
  components: { StationManagementModal },
  data() {
    return {
      loading: false,
      dataSource: [],
      form: {
        officeName: '',
        floorName: '',
        stationStatus: null
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 80,
          fixed: 'left',
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '工位编号',
          dataIndex: 'workstationId'
        },
        {
          title: '工位使用状态',
          dataIndex: 'stationStatus',
          scopedSlots: { customRender: 'stationStatus' }
        },
        {
          title: '工位使用人姓名',
          dataIndex: 'userName'
        },
        {
          title: '工位使用人电话',
          dataIndex: 'stationPhone'
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
          width: 220,
          fixed: 'right',
          dataIndex: 'stationAction',
          scopedSlots: { customRender: 'stationAction' }
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
    setData(record, actionType) {
      console.log('🚀 ~ setData ~ record:', record)
      if (actionType === 'add') {
        this.dataSource.push({
          ...record,
          index: this.dataSource.length + 1,
          workstationId: Math.random().toString(36).substr(2)
        })
      } else {
        this.dataSource = this.dataSource.map((item) => {
          if (item.workstationId === record.workstationId) {
            return record
          }
          return item
        })
        this.loadshData = _.cloneDeep(this.dataSource)
      }
    },
    getData() {
      this.loading = true
      this.dataSource = officesList.flatMap((office) => office.workstations)
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
          (this.form.stationStatus === null ||
            item.stationStatus === this.form.stationStatus)
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
        stationStatus: null
      }
      this.dataSource = _.cloneDeep(this.loadshData)
      setTimeout(() => {
        clearTimeout()
        this.loading = false
      }, 300)
    },
    add() {
      this.$refs.StationManagementModalRef.openModal({}, 'add')
    },
    editRecord(record, type) {
      this.$refs.StationManagementModalRef.openModal(record, type)
    },
    deleteRecord(workstationId) {
      this.loading = true
      this.dataSource = this.dataSource.filter(
        (item) => item.workstationId !== workstationId
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
