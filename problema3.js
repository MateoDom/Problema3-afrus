// Problema 3:  Se desea crear un validador para la contraseña de un sitio web, pero esta debe ser muy segura, para ello el cliente solicita los siguientes requerimientos para el password:

// Nota: No debe usar expresión regular.

const validatePassword = (password) => {
  // Validar que el password tenga 16 caracteres
  if (password.length < 16) return false;

  // Debe tener letras minúsculas y mayúsculas.
  let lowerCase = false;
  let upperCase = false;
  password.split("").forEach((char) => {
    char.toLowerCase() === char ? (lowerCase = true) : (upperCase = true);
  });
  if (!lowerCase || !upperCase) return false;

  // No puede tener 2 letras iguales consecutivas.
  let repeated = false;
  password.split("").forEach((char, index) => {
    if (char === password[index + 1]) {
      repeated = true;
    }
  });
  if (repeated) return false;

  // Debe tener al menos 4 números.
  let numbers = 0;
  password.split("").forEach((char) => {
    char.toLowerCase() === char.toUpperCase() ? numbers++ : numbers;
  });
  if (numbers < 4) return false;

  // No puede tener 2 números iguales consecutivos.
  let consecutiveNumbers = false;
  password.split("").forEach((char, index) => {
    if (char.toLowerCase() === char.toUpperCase()) {
      if (password[index + 1] === char) {
        consecutiveNumbers = true;
      }
    }
  });
  if (consecutiveNumbers) return false;

  // Debe tener al menos 2 caracteres especiales (!@#$%ˆ&*-_+=?) pero ninguno de ellos puede
  //repetirse en ninguna posición y además los caracteres no pueden estar juntos.
  const specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "-",
    "_",
    "+",
    "=",
    "?",
  ];
  let filterCharacters = [];
  let specialCharactersCount = 0;
  let specialCharactersRepeated = false;
  let specialCharactersNotTogether = false;

  password.split("").forEach((char, index) => {
    if (specialCharacters.includes(char)) {
      specialCharactersCount++;
      filterCharacters.push(char);
    }
    if (
      specialCharacters.includes(char) &&
      specialCharacters.includes(password[index + 1])
    ) {
      specialCharactersNotTogether = true;
    }
  });

  for (let i = 0; i < filterCharacters.length; i++) {
    var newArray = filterCharacters.filter(
      (char) => char === filterCharacters[i]
    );
    if (newArray.length > 1) {
      specialCharactersRepeated = true;
    }
  }

  if (specialCharactersCount < 2) return false;
  if (specialCharactersRepeated) return false;
  if (specialCharactersNotTogether) return false;

  // No se puede usar el número 0.
  if (password.includes("0")) return false;

  // No se puede colocar espacios.
  if (password.includes(" ")) return false;

  return true;
};

//// Validar que el password tenga 16 caracteres, tendría que dar False.
console.log("a", validatePassword("mateodomin"));

// Debe tener letras minúsculas y mayúsculas, solucion tendría que consologuear false.
console.log("b",validatePassword("mateodominguez@1234-"));

// No puede tener 2 letras iguales consecutivas, solución tendría que consologuear false.
console.log("c",validatePassword("mmateodomingue@Z1234-"));

// Debe tener al menos 4 números, tendría que consologuear true, ya que cumple las condiciones.
console.log("d",validatePassword("MateoDominguez@1234-"));

// No puede tener 2 números iguales consecutivos, tendría que consologuear false ya que se repite el 1.
console.log("e",validatePassword("MateoDomingue@z11345-"));

// Debe tener al menos 2 caracteres especiales (!@#$%ˆ&*-_+=?)
//pero ninguno de ellos puede repetirse en ninguna posición y además los caracteres no pueden estar juntos.
console.log("f",validatePassword("MateoDominguez@1234")); // tendria que dar false
console.log("g",validatePassword("MateoDominguez@1234@")); // false
console.log("h",validatePassword("MateoDominguez@1234-")); // true

// No se puede usar el número 0, solución tendría que dar false ya que ponemos el 0.
console.log("i",validatePassword("MateoDominguez@12340-"));

// No se puede colocar espacios, tendría que consologuear false ya que usamos espacios.
console.log("j",validatePassword("MateoDoming uez@1234 momko- masda"));
