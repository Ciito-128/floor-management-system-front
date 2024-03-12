<template>
  <a-modal
    :title="Title"
    :width="800"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="form"
      :model="model"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="办公室" prop="officeId">
            <a-select
              v-model="model.officeId"
              allowClear
              :disabled="isView"
              style="width: 100%"
              placeholder="请选择办公室"
              @select="officeIdSelect"
            >
              <a-select-option
                v-for="item in officesList"
                :key="item.officeId"
                :value="item.officeId"
              >
                {{ item.officeName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工位编号" prop="workstationId">
            <a-input
              v-model="model.workstationId"
              :disabled="true"
              allowClear
              placeholder="请输入楼层名称"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工位使用状态" prop="stationStatus">
            <a-select
              v-model="model.stationStatus"
              allowClear
              :disabled="isView"
              style="width: 100%"
              placeholder="请选择工位使用状态"
            >
              <a-select-option :value="1">使用中</a-select-option>
              <a-select-option :value="0">未使用</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工位使用人姓名" prop="userName">
            <a-input
              v-model="model.userName"
              :disabled="isView"
              allowClear
              placeholder="请输入工位使用人姓名"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="工位使用人电话" prop="stationPhone">
            <a-input
              v-model="model.stationPhone"
              allowClear
              :disabled="isView"
              placeholder="请输入工位使用人电话"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import { officesList } from '@/mock/office'
import { mapGetters } from 'vuex'

export default {
  name: 'StationManagementModal',
  data() {
    return {
      visible: false,
      Title: '新增',
      confirmLoading: false,
      model: {},
      rules: {
        officeId: [
          { required: true, message: '请选择办公室', trigger: 'change' }
        ],
        workstationId: [
          {
            required: true,
            message: '请选择办公室，自动生成工位编号',
            trigger: 'change'
          }
        ],
        stationStatus: [
          { required: true, message: '请选择工位使用状态', trigger: 'change' }
        ]
      },
      officesList: [],
      actionType: 'add'
    }
  },
  computed: {
    ...mapGetters('account', ['user', 'roles']),
    isView() {
      return this.actionType === 'view'
    }
  },
  watch: {},
  mounted() {},
  methods: {
    openModal(record = {}, type) {
      this.model = record
      this.Title = type === 'add' ? '新增' : type === 'view' ? '详情' : '编辑'
      this.actionType = type
      const { id } = this.roles[0]
      this.officesList = officesList.filter((item) => item.usageStatus)
      if (id.includes('floorAdminB1')) {
        this.officesList = this.officesList.filter((item) => {
          return item.floorName === '1楼'
        })
      }
      this.visible = true
    },
    handleOk() {
      if (this.actionType === 'view') {
        this.visible = false
        return
      }
      this.confirmLoading = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('ok', this.model, this.actionType)
          setTimeout(() => {
            this.confirmLoading = false
            this.visible = false
          }, 500)
        } else {
          setTimeout(() => {
            this.confirmLoading = false
          }, 500)
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    officeIdSelect(value) {
      const obj = officesList.find((item) => item.officeId === value)
      this.model = Object.assign(this.model, obj)
      this.$set(this.model, 'workstationId', value + Math.random().toString(36))
    }
  }
}
</script>

<style lang='less' scoped>
</style>
