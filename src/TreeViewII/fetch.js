export const getRoot = () => {
  return [{ type: 'folder', name: 'Root', id: Math.random() * 100 }];
};

export const getFolderForParent = (foldername) => {
  // This is a mock for API call. It will fetch the data by folder name:
  switch (foldername) {
    case 'Root':
      return [
        {
          name: 'Application',
          type: 'folder',
          id: Math.random() * 100,
        },
        {
          name: 'Desktop',
          type: 'folder',
          id: Math.random() * 100,
        },
        {
          name: 'Download',
          type: 'folder',
          id: Math.random() * 100,
        },
      ];
    case 'Application':
      return [
        {
          name: 'tools',
          type: 'folder',
          id: Math.random() * 100,
        },
        {
          name: 'game',
          type: 'folder',
          id: Math.random() * 100,
        },
      ];

    case 'Desktop':
      return [
        {
          name: 'code',
          type: 'folder',
          id: Math.random() * 100,
        },
      ];

    default:
      return [];
  }
};

export const getFilesForParent = (foldername) => {
  // do somthing
  switch (foldername) {
    case 'Root':
      return [
        {
          name: 'utility.js',
          type: 'file',
          id: Math.random() * 100,
        },
      ];
    case 'Application':
      return [
        {
          name: 'application.js',
          type: 'file',
          id: Math.random() * 100,
        },
      ];

    case 'tools':
      return [
        {
          name: 'paint.js',
          type: 'file',
          id: Math.random() * 100,
        },
      ];

    case 'Desktop':
      return [
        {
          name: 'hello.js',
          type: 'file',
          id: Math.random() * 100,
        },
      ];

    default:
      return [];
  }
};
