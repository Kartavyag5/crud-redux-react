export const getData = async () => {
  const rsep = await fetch("https://reqres.in/api/users");
  const resp2 = await rsep.json();
  return resp2.data;
};
