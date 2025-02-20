const CONFIG = {
    // Базовая стоимость
    basePrices: {
        // Габариты
        size: 2_000_000,
        // Конструктивное исполнение
        construct: 1_200_000,
        // Климатическое исполнение
        climate: 300_000,
        // Помещение санузла
        toilet: 250_000,
        // Мебель в комплекте
        furniture: 400_000,
        // Пожарная сигнализация
        fireAlarm: 200_000,
        // Телефонная связь
        telephoneConnection: 100_000,
        // Вентиляция и кондициорирование
        ventilation: 500_000,
        // Электроотопление
        heating: 300_000,
        // Видеонаблюдение
        videoSurveillance: 450_000,
        // Периметральная охранная сигнализация
        perimeterSecurityAlarm: 350_000,
        // Объектовая охранная сигнализация
        securityAlarmSystem: 150_000,
        // Система охранного освещения
        securityLightingSystem: 350_000,
        // Контроль доступа
        accessControl: 250_000,
        // Пуль средств защиты проезда
        passageProtection: 250_000,
    },
    // Коэффициенты изменения стоимости
    coefficients: {
        size: [1.0, 1.2, 2.0],
        climate: [1.0, 1.5, 2.0, 3.0],
        videoSurveillance: [0.0, 1.0, 1.1, 1.2],
        perimeterSecurityAlarm: [0.0, 1.0, 1.1, 1.2],
        securityAlarmSystem: [0.0, 1.0, 1.1, 1.2],
        accessControl: [0.0, 1.0, 1.1, 1.2],
        passageProtection: [0.0, 1.0, 1.5, 2.0],
    },
};

document.addEventListener("DOMContentLoaded", function () {
    const configForm = document.getElementById("config-form");
    const sizeSelect = document.getElementById("size");
    const constructCheckbox = document.getElementById("construct");
    const constructTypeSpan = document.getElementById("construct-type");
    const climateSelect = document.getElementById("climate");
    const toiletCheckbox = document.getElementById("toilet");
    const toiletVariantSpan = document.getElementById("toilet-variant");
    const furnitureCheckbox = document.getElementById("furniture");
    const furnitureVariantSpan = document.getElementById("furniture-variant");
    const fireAlarmCheckbox = document.getElementById("fire-alarm");
    const fireAlarmVariantSpan = document.getElementById("fire-alarm-variant");
    const telephoneConnectionCheckbox = document.getElementById("telephone-connection");
    const telephoneConnectionVariantSpan = document.getElementById("telephone-connection-variant");
    const ventilationCheckbox = document.getElementById("ventilation");
    const ventilationVariantSpan = document.getElementById("ventilation-variant");
    const heatingCheckbox = document.getElementById("heating");
    const heatingVariantSpan = document.getElementById("heating-variant");
    const videoSurveillanceSelect = document.getElementById("video-surveillance");
    const perimeterSecurityAlarmSelect = document.getElementById("perimeter-security-alarm");
    const securityAlarmSystemSelect = document.getElementById("security-alarm-system");
    const securityLightingSystemCheckbox = document.getElementById("security-light");
    const securityLightingSystemVariantSpan = document.getElementById("security-light-variant");
    const accessControlSelect = document.getElementById("access-control");
    const passageProtectionSelect = document.getElementById("passage-protection");
    const totalPriceElement = document.getElementById("total-price");

    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay"); // Оверлей
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");

    function openModalWindow() {
        modal.classList.add("is-visible");
        overlay.classList.add("is-visible");
    }

    function closeModalWindow() {
        modal.classList.remove("is-visible");
        overlay.classList.remove("is-visible");
    }

    closeModal.addEventListener("click", closeModalWindow);
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeModalWindow();
        }
    });

    window.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("is-visible") &&
            overlay.classList.contains("is-visible")
        ) {
            closeModalWindow();
        }
    });

    function calculateConstruct() {
        let price = 0;

        if (constructCheckbox.checked) {
            constructTypeSpan.innerText = "Бронь - Бр4";
            price = CONFIG.basePrices.construct;
        } else {
            constructTypeSpan.innerText = "Небронированный";
        }

        return price;
    }

    function calculateToilet() {
        let price = 0;

        if (toiletCheckbox.checked) {
            toiletVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.toilet;
        } else {
            toiletVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateFurniture() {
        let price = 0;

        if (furnitureCheckbox.checked) {
            furnitureVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.furniture;
        } else {
            furnitureVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateFireAlarm() {
        let price = 0;

        if (fireAlarmCheckbox.checked) {
            fireAlarmVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.fireAlarm;
        } else {
            fireAlarmVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateTelephoneConnection() {
        let price = 0;

        if (telephoneConnectionCheckbox.checked) {
            telephoneConnectionVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.telephoneConnection;
        } else {
            telephoneConnectionVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateVentilation() {
        let price = 0;

        if (ventilationCheckbox.checked) {
            ventilationVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.ventilation;
        } else {
            ventilationVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateHeating() {
        let price = 0;

        if (heatingCheckbox.checked) {
            heatingVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.heating;
        } else {
            heatingVariantSpan.innerText = "Нет";
        }

        return price;
    }

    function calculateSecurityLightingSystem() {
        let price = 0;

        if (securityLightingSystemCheckbox.checked) {
            securityLightingSystemVariantSpan.innerText = "Да";
            price = CONFIG.basePrices.securityLightingSystem;
        } else {
            securityLightingSystemVariantSpan.innerText = "Нет";
        }

        return price;
    }

    let totalSum = 0;

    function calculatePrice() {
        let price = 0;

        price += CONFIG.basePrices.size * CONFIG.coefficients.size[sizeSelect.value];
        price += calculateConstruct();
        price += CONFIG.basePrices.climate * CONFIG.coefficients.climate[climateSelect.value];
        price += calculateToilet();
        price += calculateFurniture();
        price += calculateFireAlarm();
        price += calculateTelephoneConnection();
        price += calculateVentilation();
        price += calculateHeating();

        price +=
            CONFIG.basePrices.videoSurveillance * CONFIG.coefficients.videoSurveillance[videoSurveillanceSelect.value];

        price +=
            CONFIG.basePrices.perimeterSecurityAlarm *
            CONFIG.coefficients.perimeterSecurityAlarm[perimeterSecurityAlarmSelect.value];

        price +=
            CONFIG.basePrices.securityAlarmSystem *
            CONFIG.coefficients.securityAlarmSystem[securityAlarmSystemSelect.value];

        price += calculateSecurityLightingSystem();
        price += CONFIG.basePrices.accessControl * CONFIG.coefficients.accessControl[accessControlSelect.value];

        price +=
            CONFIG.basePrices.passageProtection * CONFIG.coefficients.passageProtection[passageProtectionSelect.value];

        totalPriceElement.textContent = price.toLocaleString();
        totalSum = price;
    }

    document.querySelectorAll("input, select").forEach((el) => {
        el.addEventListener("change", calculatePrice);
    });

    calculatePrice();

    configForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            size: document.getElementById("size").selectedOptions[0].value,
            climate: document.getElementById("climate").selectedOptions[0].value,
            toilet: document.getElementById("toilet").checked,
            furniture: document.getElementById("furniture").checked,
            fireAlarm: document.getElementById("fire-alarm").checked,
            ventilation: document.getElementById("ventilation").checked,
            heating: document.getElementById("heating").checked,
            totalPrice: totalSum,
        };

        console.log(formData);

        setTimeout(() => {
            modalTitle.innerText = "Спасибо!";
            modalText.innerText =
                "Для уточнения исходных данных и выполнения подробного расчёта стоимости с Вами свяжется пресейл инженер нашей компании.";
            openModalWindow();
        }, 2000);
        return;

        // Отправка данных на сервер
        fetch("https://yourserver.com/api/order", {
            // ЗАМЕНИ URL НА СВОЙ
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                modalTitle.innerText = "Спасибо!";
                modalText.innerText =
                    "Для уточнения исходных данных и выполнения подробного расчёта стоимости с Вами свяжется пресейл инженер нашей компании.";
                openModalWindow();
            })
            .catch((error) => {
                modalTitle.innerText = "Ошибка на сервере";
                modalText.innerText =
                    "Пожалуйста повторите запрос позднее или направьте свои данные на адрес (email@test.ru)\nС вами свяжется пресейл инженер нашей компании.";
                openModalWindow();
            });

        // или
        // const formData = new FormData();
        // formData.append("size", document.getElementById("size").selectedOptions[0].text);
        // formData.append("climate", document.getElementById("climate").selectedOptions[0].text);
        // formData.append("toilet", document.getElementById("toilet").checked ? "Да" : "Нет");
        // formData.append("furniture", document.getElementById("furniture").checked ? "Да" : "Нет");
        // formData.append("fireAlarm", document.getElementById("fireAlarm").checked ? "Да" : "Нет");
        // formData.append("ventilation", document.getElementById("ventilation").checked ? "Да" : "Нет");
        // formData.append("heating", document.getElementById("heating").checked ? "Да" : "Нет");
        // formData.append("totalPrice", document.getElementById("totalPrice").textContent.replace(/\s/g, ""));

        // fetch("https://yourserver.com/api/order", {
        //     method: "POST",
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         alert("Ваш заказ отправлен!");
        //     })
        //     .catch((error) => {
        //         alert("Ошибка отправки!");
        //         console.error("Ошибка:", error);
        //     });
    });
});
