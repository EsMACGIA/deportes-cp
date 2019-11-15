import { NbMenuItem } from '@nebular/theme';

export const MENU_ADMIN: NbMenuItem[] = [
  {
    title: 'Administración',
    icon: 'people-outline',
    children : [
      {
        title : 'Comisiones',
        link : '/pages/administration/commissions',
      },
      {
        title : 'Entrenadores',
        link : '/pages/administration/trainers',
      }
    ]
  },
  {
    title: 'Gestión',
    icon: 'edit-2-outline',
    link: '/pages/management',
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
        title: 'Solicitudes',
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

export const MENU_COMMISSION: NbMenuItem[] = [
  {
    title: 'Administración',
    icon: 'people-outline',
    children : [
      {
        title : 'Entrenadores',
        link : '/pages/administration/trainers',
      }
    ]
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
        title: 'Generar Solicitud',
        link: '/pages/management/requests-form'
      }
    ]
  },
  {
    title: 'Auth Test',
    icon: 'people-outline',
    link: '/auth'
  }
]

export const MENU_TRAINER: NbMenuItem[] = [
  {
    title: 'Auth Test',
    icon: 'people-outline',
    link: '/auth'
  }
]
