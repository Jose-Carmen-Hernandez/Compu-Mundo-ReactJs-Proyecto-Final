//funcion para mostrar el titulo de cada categoria con la primera letra mayuscula. Luego agrega el resto de las letras excepto la primera.

export function toCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
