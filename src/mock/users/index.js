import {officesList} from '@/mock/office'
import _ from 'lodash' //导入loadsh插件
let usersList = _.cloneDeep(officesList) //深拷贝数据
// 生成工位列表函数
function generateUsersList(office) {
  const usersList = [{
      roleName:'系统管理员A', // 角色类型(系统管理员、楼层管理员、员工employee)
      roleType: 'admin', // 角色类型(系统管理员、楼层管理员、员工employee)
      userId:'adminA', // 工位使用人ID，初始为空
      userName:'系统管理员A', // 工位使用人名称，初始为空
      stationPhone: `19212345422`, // 电话
      createTime:'2024-03-10 21:00:11',
      updateTime:'2024-03-10 21:00:11',
  }];
  for (let i = 1; i <= office.capacity; i++) {
    usersList.push({
      ...office,
      workstationId: `${office.officeId}-${i}`, // 工位编号
      stationStatus: office.usageStatus, // 工位使用状态
      roleName: i == 1 ? `楼层管理员B${office.floorName.split('楼')[0]}` : '员工', // 角色类型(系统管理员、楼层管理员、员工employee)
      roleType: i == 1 ? 'floorAdmin' : 'employee', // 角色类型(系统管理员、楼层管理员、员工employee)
      userId: i == 1 ? `floorAdmin${office.floorAdminId}` : `employee${office.officeId}-${i}`, // 工位使用人ID，初始为空
      userName: i == 1 ? `${office.floorAdminName}` : `员工${office.officeId}-${i}`, // 工位使用人名称，初始为空
      stationPhone: `1921234516${i}`, // 电话
      createTime:'2024-03-10 21:00:11',
      updateTime:'2024-03-10 21:00:11',
    });
  }
  return usersList;
}

// 为每个办公室生成工位列表
usersList.forEach(office => {
  office.usersList = generateUsersList(office);
});

export { usersList } //导出数据