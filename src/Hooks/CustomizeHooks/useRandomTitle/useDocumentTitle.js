import { useEffect } from 'react';

export const useDocumentTitle = (titleInput) => {
  useEffect(() => {
    document.title = titleInput;
  }, [titleInput]);
};
