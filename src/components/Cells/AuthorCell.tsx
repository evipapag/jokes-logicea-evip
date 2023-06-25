const AuthorCell = (value: string) => {
  const maskedAuthor = value.replace(
    /@([^@.]+)(\.[^.]+)$/,
    (_, domain, ending) =>
      // const maskedDomain = domain.replace(/./g, );
      `@\\*\\*\\*${ending}`
  );

  return maskedAuthor;
};

export default AuthorCell;
