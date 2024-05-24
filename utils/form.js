import { required, minValue, minLength, maxLength } from "@vuelidate/validators";

export function numberModifier(value) {
  const notNumberReg = /\D/gi;
  return value.replace(notNumberReg, "");
}

export function getPetOptions() {
  const options = {
    animals: [
      { value: "cat", label: "Cat" },
      { value: "dog", label: "Dog" },
    ],
    breeds: {
      cat: ["Persian", "Siamese", "Maine Coon", "Scottish Fold", "Bengal", "other"],
      dog: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Poodle", "other"],
    },
  };
  return options;
}

export function validationsRules() {
  return {
    name: { required, nameValidation },
    cpf: { required, cpfValidation },
    birthDate: { required, ageValidation },
    monthly_income: { minValueValue: minValue(1000) },
    animal: { required },
    breed: { required },
    cep: {
      required,
      minLengthValue: minLength(8),
      maxLengthValue: maxLength(8),
    },
    street: { required },
    neighborhood: { required },
    state: { required },
    city: { required },
  };
}

function nameValidation(targetName) {
  const nameSplitted = targetName.split(' ')
  return nameSplitted.length >=2 
}

export function cpfValidation(targetCPF) {
  let sum = 0;
  let remainder;

  if (targetCPF === "00000000000") return false;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(targetCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(targetCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(targetCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(targetCPF.substring(10, 11))) return false;
  return true;
}

export function ageValidation(targetDate) {
  const currentDate = new Date();

  const age = currentDate.getFullYear() - targetDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  if (
    currentMonth < targetDate.getMonth() + 1 ||
    (currentMonth === targetDate.getMonth() + 1 && currentDay < targetDate.getDate())
  ) {
    age--;
  }
  return age >= 18 && age <= 65;
}
