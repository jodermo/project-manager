import {BackendAdminService} from "./backend-admin.service";

export const BackendAdminPages =  (adminService: BackendAdminService)=>{
  return [
    {
      name: 'Dashboard',
      icon: 'home',
      optionIndex: 0,
      menu: () => {
        return true;
      },
    },
    {
      name: 'Projects',
      icon: 'work',
      menu: () => {
        return true;
      },
      dashboard: () => {
        return true;
      },
    },
    {
      name: 'Tasks',
      icon: 'ballot',
      options: [],
      menu: () => {
        return true;
      },
      dashboard: () => {
        return true;
      },
    },
    {
      name: 'Companies',
      icon: 'business',
      options: [],
      menu: () => {
        return true;
      },
      dashboard: () => {
        return true;
      },
    },
    {
      name: 'Users',
      icon: 'person',
      optionIndex: 0,
      options: [
        {
          name: 'Users',
          icon: 'face',
        },
        {
          name: 'Teams',
          icon: 'group_work',
        },
        {
          name: 'User Groups',
          icon: 'group',
        },
        {
          name: 'User Roles',
          icon: 'visibility_off',
        }
      ],
      menu: () => {
        return true;
      },
      dashboard: () => {
        return true;
      },
    },
    {
      name: 'Attributes',
      icon: 'edit_attributes',
      optionIndex: 0,
      options: [
        {
          name: 'Global Attributes',
          icon: 'label',
        },
        {
          name: 'Product Categories',
          icon: 'shop_two',
        },
      ],
      menu: () => {
        return false;
      },
      dashboard: () => {
        return false;
      },
    },
    {
      name: 'Data',
      icon: 'storage',
      optionIndex: 0,
      options: [
        {
          name: 'Locations',
          icon: 'location_on',
        },
        {
          name: 'Files',
          icon: 'file_copy',
        }
      ],
      menu: () => {
        return true;
      },
      dashboard: () => {
        return true;
      },
    },
    {
      name: 'Account',
      icon: 'account_circle',
      optionIndex: 0,
      menu: () => {
        return true;
      },
      dashboard: () => {
        return false;
      },
    }
  ];
};
