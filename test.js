const a = async () => Promise.resolve('benis');

const b = (async () => {
  const promise = await a();
  console.log(promise);
})
b();
