export const officesList = [
  {
    officeId: '001-1', // 办公室ID
    officeName: '一楼办公室1', // 办公室名称
    floorId: '001', // 楼层ID
    floorName: '1楼', // 楼层名称
    floorAdminId: '101', // 楼层管理员ID
    floorAdminName: '张三', // 楼层管理员名称
    floorAdminPhone: '1234567891112', // 楼层管理员电话
    usageStatus: 1, // 使用状态
    capacity: 10 //  办公室容量（工位）
  },
  {
    officeId: '001-2',
    officeName: '一楼办公室2',
    floorId: '001',
    floorName: '1楼',
    floorAdminId: '101',
    floorAdminName: '张三',
    floorAdminPhone: '1234567891112',
    usageStatus: 1,
    capacity: 6
  },
  {
    officeId: '002-1',
    officeName: '二楼办公室1',
    floorId: '002',
    floorName: '2楼',
    floorAdminId: '102',
    floorAdminName: '李四',
    floorAdminPhone: '1234567891122',
    usageStatus: 0,
    capacity: 8
  },
  {
    officeId: '002-2',
    officeName: '二楼办公室2',
    floorId: '002',
    floorName: '2楼',
    floorAdminId: '102',
    floorAdminName: '李四',
    floorAdminPhone: '1234567891122',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '003-1',
    officeName: '三楼办公室1',
    floorId: '003',
    floorName: '3楼',
    floorAdminId: '103',
    floorAdminName: '王五',
    floorAdminPhone: '1234567891132',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '003-2',
    officeName: '三楼办公室2',
    floorId: '003',
    floorName: '3楼',
    floorAdminId: '103',
    floorAdminName: '王五',
    floorAdminPhone: '1234567891132',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '004-1',
    officeName: '四楼办公室1',
    floorId: '004',
    floorName: '4楼',
    floorAdminId: '104',
    floorAdminName: '赵六',
    floorAdminPhone: '1234567891142',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '004-2',
    officeName: '四楼办公室2',
    floorId: '004',
    floorName: '4楼',
    floorAdminId: '104',
    floorAdminName: '赵六',
    floorAdminPhone: '1234567891142',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '005-1',
    officeName: '五楼办公室1',
    floorId: '005',
    floorName: '5楼',
    floorAdminId: '105',
    floorAdminName: '钱七',
    floorAdminPhone: '1234567891152',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '005-2',
    officeName: '五楼办公室2',
    floorId: '005',
    floorName: '5楼',
    floorAdminId: '105',
    floorAdminName: '钱七',
    floorAdminPhone: '1234567891152',
    usageStatus: 1,
    capacity: 10
  },
  {
    officeId: '006-1',
    officeName: '六楼办公室1',
    floorId: '006',
    floorName: '6楼',
    floorAdminId: '106',
    floorAdminName: '孙八',
    floorAdminPhone: '1234567891162',
    usageStatus: 0,
    capacity: 10
  },
  {
    officeId: '006-2',
    officeName: '六楼办公室2',
    floorId: '006',
    floorName: '6楼',
    floorAdminId: '106',
    floorAdminName: '孙八',
    floorAdminPhone: '1234567891162',
    usageStatus: 0,
    capacity: 10
  }
]

// 示例用法
// 生成工位列表函数
function generateWorkstations(office) {
  const workstations = []
  for (let i = 1; i <= office.capacity; i++) {
    workstations.push({
      ...office,
      workstationId: `${office.officeId}-${i}`, // 工位编号
      stationStatus: office.usageStatus, // 工位使用状态
      userId:
        i == 1
          ? `floorAdmin${office.floorAdminId}`
          : office.usageStatus
          ? `employee${office.officeId}-${i}`
          : null, // 工位使用人ID，初始为空
      userName:
        i == 1
          ? `${office.floorAdminName}`
          : office.usageStatus
          ? `员工${office.officeId}-${i}`
          : null, // 工位使用人名称，初始为空
      stationPhone:
        i == 1 ? `1921234516${i}` : office.usageStatus ? `1921234516${i}` : null // 电话，初始为空
    })
  }
  return workstations
}

// 为每个办公室生成工位列表
officesList.forEach(office => {
  office.workstations = generateWorkstations(office)
})
