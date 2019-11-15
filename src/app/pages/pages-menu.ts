import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Administración',
    icon: 'people-outline',
    link: '/pages/administration'
  },
  {
    title: 'Gestión',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Atletas',
        link: '/pages/management/athletes'
      },
      {
        title: 'Clases',
        link: '/pages/management/classes'
      },
      {
        title: 'Request',
        link: '/pages/management/requests'
      }
    ]
  },
  {
    title: 'Auth Test',
    icon: 'people-outline',
    link: '/auth'
  }
];
