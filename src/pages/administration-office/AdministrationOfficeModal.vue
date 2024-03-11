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
          <a-form-model-item label="办公室名称" prop="officeName">
            <a-input
              v-model="model.officeName"
              allowClear
              :disabled="isView"
              placeholder="请输入办公室名称"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="办公室使用状态" prop="usageStatus">
            <a-select
              v-model="model.usageStatus"
              allowClear
              :disabled="isView"
              style="width: 100%"
              placeholder="请选择办公室使用状态"
            >
              <a-select-option :value="1">使用中</a-select-option>
              <a-select-option :value="2">未使用</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <!-- 工位 -->
        <a-col :span="12">
          <a-form-model-item label="工位（个）" prop="capacity">
            <a-input-number
              v-model="model.capacity"
              :min="1"
              :precision="0"
              :max="20"
              :disabled="isView"
              allowClear
              placeholder="请输入工位"
              style="width: 100%"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="楼层名称" prop="floorName">
            <a-input
              v-model="model.floorName"
              :disabled="isView"
              allowClear
              placeholder="请输入楼层名称"
            />
          </a-form-model-item>
        </a-col>
        <!-- 楼层管理员姓名 -->
        <a-col :span="12">
          <a-form-model-item label="楼层管理员姓名" prop="floorAdminName">
            <a-input
              v-model="model.floorAdminName"
              :disabled="isView"
              allowClear
              placeholder="请输入楼层管理员姓名"
            />
          </a-form-model-item>
        </a-col>
        <!-- 楼层管理员电话 -->
        <a-col :span="12">
          <a-form-model-item label="楼层管理员电话" prop="floorAdminPhone">
            <a-input
              v-model="model.floorAdminPhone"
              allowClear
              :disabled="isView"
              placeholder="请输入楼层管理员电话"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  name: 'AdministrationOfficeModal',
  data() {
    return {
      visible: false,
      Title: '新增',
      confirmLoading: false,
      model: {},
      rules: {
        officeName: [
          { required: true, message: '请输入办公室名称', trigger: 'blur' }
        ],
        usageStatus: [
          { required: true, message: '请选择办公室使用状态', trigger: 'change' }
        ],
        capacity: [{ required: true, message: '请输入工位', trigger: 'blur' }],
        floorName: [
          { required: true, message: '请输入楼层名称', trigger: 'blur' }
        ],
        floorAdminName: [
          { required: true, message: '请输入楼层管理员姓名', trigger: 'blur' }
        ],
        floorAdminPhone: [
          { required: true, message: '请输入楼层管理员电话', trigger: 'blur' }
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
          this.$emit('ok', this.model)
        } else {
          this.confirmLoading = false
        }
      })
      setTimeout(() => {
        this.confirmLoading = false
        this.visible = false
      }, 1000)
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang='less' scoped>
</style>
