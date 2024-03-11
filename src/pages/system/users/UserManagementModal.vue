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
          <a-form-model-item label="姓名" prop="userName">
            <a-input
              v-model="model.userName"
              :disabled="isView"
              allowClear
              placeholder="请输入姓名"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="角色" prop="roleId">
            <a-select
              v-model="model.roleId"
              allowClear
              :disabled="isView"
              style="width: 100%"
              placeholder="请选择"
              @select="roleIdSelect"
            >
              <a-select-option
                v-for="item in rolesList"
                :key="item.roleId"
                :value="item.roleId"
              >
                {{ item.roleName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系方式" prop="stationPhone">
            <a-input
              v-model="model.stationPhone"
              :disabled="isView"
              allowClear
              placeholder="请输入联系方式"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import { rolesList } from '@/mock/role'
export default {
  name: 'UserManagementModal',
  data() {
    return {
      visible: false,
      Title: '新增',
      confirmLoading: false,
      model: {},
      rolesList,
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        stationPhone: [
          { required: true, message: '请输入联系方式', trigger: 'change' }
        ]
      },
      actionType: 'add'
    }
  },
  computed: {
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
    roleIdSelect(value) {
      const obj = rolesList.find((item) => item.roleId === value)
      this.model = Object.assign(this.model, obj)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
