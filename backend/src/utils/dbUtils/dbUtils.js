export function getBorders(page, objectsPerPage) {
  console.log(parseInt(page) + 1);

  let parsedPage, parsedObjectsPerPage;

  try {
    parsedPage = parseInt(page);
    parsedObjectsPerPage = parseInt(objectsPerPage);
  } catch (e) {
    return {
      error: true,
      errorText: 'values are not numeric',
    };
  }

  const start = parsedPage * parsedObjectsPerPage,
    end = (parsedPage + 1) * parsedObjectsPerPage - 1;

  return {
    start: start,
    end: end,
  };
}
