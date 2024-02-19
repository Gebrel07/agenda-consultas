import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthcontext";

export const useThumbnail = () => {
  const { user, dispatch } = useAuthContext();

  const defaultMaxSizeBytes = 100000;

  const updateUserThumbnail = async (newImg) => {
    // realizar upload e pegar url
    const imgUrl = await uploadThumbnail(user.uid, newImg);

    // atualizar perfil no backend
    await projectAuth.currentUser.updateProfile({ photoURL: imgUrl });

    // recarregar infos do usuario no contexto
    dispatch({ type: "LOGIN", payload: projectAuth.currentUser });
  };

  const uploadThumbnail = async (userId, newImg) => {
    // upload imagem
    const uploadPath = `thumbnails/${userId}/${newImg.name}`;
    const resp = await projectStorage.ref(uploadPath).put(newImg);
    // retornar url
    return await resp.ref.getDownloadURL();
  };

  const validateThumbnailImg = (newFile, maxSizeBytes = null) => {
    const maxSize = maxSizeBytes ? maxSizeBytes : defaultMaxSizeBytes;
    if (!newFile) {
      return { ok: false, msg: "Selecione uma Imagem" };
    }
    if (!newFile.type.includes("image")) {
      return { ok: false, msg: "Arquivo deve ser do tipo Imagem" };
    }
    if (newFile.size > maxSize) {
      return { ok: false, msg: `Tamanho máximo do arquivo é de ${maxSize / 1000}kb` };
    }
    return { ok: true, msg: "" };
  };

  return {
    maxSizeBytes: defaultMaxSizeBytes,
    validateThumbnailImg,
    uploadThumbnail,
    updateUserThumbnail,
  };
};
