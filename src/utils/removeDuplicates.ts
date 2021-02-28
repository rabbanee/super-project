const removeDuplicates = (duplicates) => {
  const flag = {};
  const unique = [];

  duplicates.forEach(elem => {
    if (!flag[elem.value]) {
      flag[elem.value] = true;
      unique.push(elem);
    }
  });
  console.log(unique);
  
  return unique;
}

export default removeDuplicates;