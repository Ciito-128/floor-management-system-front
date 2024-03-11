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
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
    >
      <a-row>
        <a-col :span="24">
          <a-form-model-item label="角色名称" prop="roleName">
            <a-input
              v-model="model.roleName"
              :disabled="isView"
              allowClear
              placeholder="请输入角色名称"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="角色描述" prop="roleDescription">
            <a-textarea
              v-model="model.roleDescription"
              :disabled="isView"
              allowClear
              placeholder="请输入角色描述"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  name: 'RoleManagementModal',
  data() {
    return {
      visible: false,
      Title: '新增',
      confirmLoading: false,
      model: {},
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
        roleDescription: [
          { required: true, message: '请输入角色描述', trigger: 'change' }
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
    }
  }
}
</script>

<style lang='less' scoped>
</style>
