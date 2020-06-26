interface IMailconfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'emailservice@gustavolemeslleite.com',
      name: 'Gustavo do Gustavo Lemes',
    },
  },
} as IMailconfig;
