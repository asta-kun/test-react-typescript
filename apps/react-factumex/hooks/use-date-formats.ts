interface Response {
  date: string;
}

const useDateFormats = (): Response => {
  return {
    date: 'MM/dd/yyyy',
  };
};

export default useDateFormats;
