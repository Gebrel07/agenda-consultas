export const useSenha = () => {
  const defaultMinLen = 6;

  const validarSenha = (senha, minLen = null) => {
    const len = minLen ? minLen : defaultMinLen;
    if (!senha || senha.length < len) {
      return { ok: false, msg: `A senha deve ter no mínimo ${len} caracteres` };
    }
    return { ok: true, msg: "" };
  };

  return { validarSenha, defaultMinLen };
};
