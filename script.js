const menuBtn = document.getElementById("menu-button");
const modal = document.querySelector("#modal");
const closeModal = document.getElementById("modal-header-close-btn");
const modalForm = document.getElementById("modal-form");
const modalInput = document.getElementById("modal-input");
const modalBtn = document.getElementById("modal-btn");

const nomeCidade = document.getElementById("local");
const climaImg = document.getElementById("weather-icon");
const temperaturaAtual = document.getElementById("temperatura-atual");
const climaAtual = document.getElementById("clima-atual");
const dataAtual = document.getElementById("data-atual");
const vento = document.getElementById("vento");
const umidade = document.getElementById("umidade");
const probabilidadeChuva = document.getElementById("chuva");

// PUXAR DADOS DA CIDADE DA API
const getAtualCidadeInfo = async (cidade) => {
    const apiKey = "8765d6a61a2f42b3b04212205242910";

    const climaAtualInfo = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`;

    try {
        const response = await fetch(climaAtualInfo);
        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
    }
};

const getProximasInfosCidade = async (cidade) => {
    const apiKey = "8765d6a61a2f42b3b04212205242910";

    const proximasInfo = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cidade}&days=7`;

    try {
        const response = await fetch(proximasInfo);
        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Erro ao obter informações dos próximos dias", error);
    }
};

// ABRIR MODAL
const handleOpenModal = () => {
    menuBtn.addEventListener("click", () => {
        modal.showModal();
    });
};

// FECHAR MODAL
const handleCloseModal = () => {
    closeModal.addEventListener("click", () => {
        modal.close();
    });
};

const handlePesquisarCidade = (cidadeData, proximasInfos) => {
    if (!cidadeData) return;

    nomeCidade.innerText = cidadeData.location.name;
    temperaturaAtual.innerText = cidadeData.current.temp_c;
    climaAtual.innerText = cidadeData.current.condition.text;
    dataAtual.innerText = new Date(cidadeData.location.localtime).toLocaleDateString("pt-BR");
    vento.innerText = `${cidadeData.current.wind_kph} km/h`;
    umidade.innerText = `${cidadeData.current.humidity}%`;
    probabilidadeChuva.innerText = `${proximasInfos.forecast.forecastday[0].day.daily_chance_of_rain}%`;

}

// PESQUISAR INFORMAÇÕES DE UMA CIDADE: CLIMA, CIDADE, TEMP. ETC
const handleFormModal = () => {
    let cidade = "";

    modalForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        cidade = modalInput.value;

        const cidadeData = await getAtualCidadeInfo(cidade);
        const proximasInfos = await getProximasInfosCidade(cidade);

        modal.close();

        handlePesquisarCidade(cidadeData, proximasInfos);
    });
};

handleOpenModal();
handleCloseModal();
handleFormModal();