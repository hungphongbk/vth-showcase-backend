export const getAllImages = () =>
  Promise.all([fetch("/upload"), fetch("/upload/stat")]).then(
    async ([res1, res2]) => ({
      ...(await res1.json()),
      ...(await res2.json()),
    })
  );
export const deleteOneImage = (Id: string) =>
  fetch(`/upload/${Id}`, { method: "DELETE" }).then((res) => res.json());
