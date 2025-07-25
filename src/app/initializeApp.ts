export function customInitializeApp(): () => Promise<any> {
  return () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && localStorage.getItem('sessionId')) {
        resolve(true);
      } else {
        setTimeout(() => resolve(true), 200);
      }
    });
  };
}
