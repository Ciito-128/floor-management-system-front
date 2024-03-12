 const rolesList = [
    {
        roleId: 'admin', // 角色ID
        roleType: 'admin', // 角色类型(系统管理员、楼层管理员、员工employee)
        roleName: '系统管理员A', // 角色名称
        roleDescription: '能方便直观的查看每个办公室的使用示意图，管理所有办公室和工位和系统管理。', // 角色描述
    },
    {
        roleId: 'floorAdminB1',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B1',
        roleDescription: '负责维护1楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B1能方便直观的查看1楼每个办公室的使用示意图，也能统计1楼有多少工位，剩余多少工位等信息',
    },
    {
        roleId: 'floorAdminB2',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B2',
        roleDescription: '负责维护2楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B2能方便直观的查看2楼每个办公室的使用示意图，也能统计2楼有多少工位，剩余多少工位等信息',
    }, 
    {
        roleId: 'floorAdminB3',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B3',
        roleDescription : '负责维护3楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B3能方便直观的查看3楼每个办公室的使用示意图，也能统计3楼有多少工位，剩余多少工位等信息',
    }, 
    {
        roleId: 'floorAdminB4',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B4',
        roleDescription: '负责维护4楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B4能方便直观的查看4楼每个办公室的使用示意图，也能统计4楼有多少工位，剩余多少工位等信息',
    }, 
    {
        roleId: 'floorAdminB5',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B5',
        roleDescription: '负责维护5楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B5能方便直观的查看5楼每个办公室的使用示意图，也能统计5楼有多少工位，剩余多少工位等信息',
    }, 
    {
        roleId: 'floorAdminB6',
        roleType: 'floorAdmin',
        roleName: '楼层管理员B6',
        roleDescription: '负责维护6楼的办公室，包括添加办公室，为每个办公室分配工位，工位分配具体使用人。B6能方便直观的查看6楼每个办公室的使用示意图，也能统计6楼有多少工位，剩余多少工位等信息',
    },
    {
        roleId: 'employee',
        roleType: 'employee',
        roleName: '员工',
        roleDescription: '能查看自己所在楼层的办公室使用情况'
    }
]
rolesList.forEach(item => {
    item.createTime = '2024-03-08 14:10:10'
    item.updateTime = '2024-03-08 14:10:10'
})
export { rolesList }