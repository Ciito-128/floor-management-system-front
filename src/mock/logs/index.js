// 使用mock帮我生成办公室工位管理以及登录等日志数据

import Mock from 'mockjs'
// 使用Mock.js生成办公室工位管理数据
const workstationData = Mock.mock({
  'workstations|10-20': [{
    'id|+1': 1,
    'name': '@word(3, 5)',
    'actionPerson': '@cname',
    'action|1': ['新增', '删除', '修改'],
    'actionTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'location': '@county(true)',
    'status|1': ['1', '0'],
    'remark': '@cparagraph(1, 3)'
  }]
});
console.log('办公室工位管理数据：', workstationData.workstations);
export { workstationData };