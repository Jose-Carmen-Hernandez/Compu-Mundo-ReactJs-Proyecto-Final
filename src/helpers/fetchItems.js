import data from "../data/data.json";

//Funcion para llamar la data de los productos del array.json:
export const fetchItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

//Funcion para mostrar el detalle de producto en ItemDetailContainer. (Tambien se puede hacer sin usar setTimeout):
export const fetchItemsById = (itemId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemFind = data.find((item) => item.id === itemId);
      if (itemFind) {
        resolve(itemFind);
      } else {
        reject({ error: "No se encontro el producto" });
      }
    }, 500);
  });
};

export const fetchItemsByCategory = (categoryId) => {
  return new Promise((resolve, reject) => {
    const itemsByCategory = data.filter(
      (item) => item.categoria.toUpperCase() == categoryId.toUpperCase()
    );
    if (itemsByCategory) {
      resolve(itemsByCategory);
    } else {
      reject({ error: "No se encontro la categoria" });
    }
  }, 500);
};
