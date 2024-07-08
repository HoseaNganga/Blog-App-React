const CrudOperation = async (
  url = "",
  optionsObj = null,
  errMessage = null
) => {
  try {
    const resp = await fetch(url, optionsObj);
    if (!resp.ok)
      throw Error(`Couldn't perfom the ${optionsObj.method} operation`);
  } catch (err) {
    errMessage = err.message;
  } finally {
    return errMessage;
  }
};

export default CrudOperation;
