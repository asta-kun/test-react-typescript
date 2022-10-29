interface Response {
  date: string;
}

const useDate = (): Response => {
  return {
    date: 'MM/DD/YYYY',
  };
};

export default useDate;
