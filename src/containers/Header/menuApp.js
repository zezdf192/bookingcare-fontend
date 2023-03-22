export const adminMenu = [
    {
        //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud-user',
                link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-manage-redux', link: '/system/user-manage-redux' },
                // ],
            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-manage-redux',
            },
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor',
            },
            {
                //Quản lý kế hoạch
                name: 'menu.doctor.manage-schedule',

                link: '/doctor/manage-schedule',
            },
        ],
    },
    {
        //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic',
            },
        ],
    },
    {
        //Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty',
            },
        ],
    },
    {
        //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook',
            },
        ],
    },
];

export const doctorMenu = [
    {
        //Quản lý kế hoạch
        name: 'menu.doctor.schedule',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
            {
                name: 'menu.doctor.manage-patient',
                link: '/doctor/manage-patient',
            },
        ],
    },
];
