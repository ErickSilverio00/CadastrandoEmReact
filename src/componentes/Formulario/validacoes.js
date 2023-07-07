export function validarNome(nome) {
  if (!nome) {
    return { valido: false, texto: "O nome é obrigatório." };
  }

  if (!/^[\p{L} .'-]+$/u.test(nome)) {
    return {
      valido: false,
      texto:
        "Nome inválido. Use apenas letras, espaços, pontos, hífens e apóstrofos.",
    };
  }

  return { valido: true, texto: "" };
}

export function validarEmail(email) {
  if (!email) {
    return { valido: false, texto: "O email é obrigatório." };
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    return { valido: false, texto: "Email inválido. Insira um email válido." };
  }

  return { valido: true, texto: "" };
}

export function mascararTelefone(valor) {
  valor = valor.replace(/\D/g, "");
  valor = valor.substring(0, 11);
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
  return valor;
}

export function validarTelefone(telefone) {
  if (!telefone) {
    return { valido: false, texto: "O telefone é obrigatório." };
  }

  const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!regexTelefone.test(telefone)) {
    return {
      valido: false,
      texto: "Estão faltando dígitos. O telefone deve estar no formato (##) #####-####.",
    };
  }

  return { valido: true, texto: "" };
}
