import instance from "common/config/api";

const bandeirasService = {
    buscaPorId: async bandeirasIds => {
        const query = new URLSearchParams();
        bandeirasIds.forEach(id => query.append('id', id));

        const resposta = await instance.get(`/bandeiras?${query.toString()}`);

        return resposta.data;
    }
}

export default bandeirasService;