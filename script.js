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
    const climateSelect = document.getElementById("climate");
    const toiletCheckbox = document.getElementById("toilet");
    const furnitureCheckbox = document.getElementById("furniture");
    const fireAlarmCheckbox = document.getElementById("fire-alarm");
    const telephoneConnectionCheckbox = document.getElementById("telephone-connection");
    const ventilationCheckbox = document.getElementById("ventilation");
    const heatingCheckbox = document.getElementById("heating");
    const videoSurveillanceSelect = document.getElementById("video-surveillance");
    const perimeterSecurityAlarmSelect = document.getElementById("perimeter-security-alarm");
    const securityAlarmSystemSelect = document.getElementById("security-alarm-system");
    const securityLightingSystemCheckbox = document.getElementById("security-light");
    const accessControlSelect = document.getElementById("access-control");
    const passageProtectionSelect = document.getElementById("passage-protection");
    const totalPriceElement = document.getElementById("total-price");

    const orgNameInput = document.getElementById("org-name");
    const orgNameErrors = document.getElementById("org-name-errors");
    const emailInput = document.getElementById("email");
    const emailErrors = document.getElementById("email-errors");
    const telInput = document.getElementById("phone");
    const telErrors = document.getElementById("phone-errors");

    const submitButton = document.getElementById("submit-btn");

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

    function calculateOption(optionStatus = false, oprionPrice = 0) {
        let price = 0;

        if (optionStatus) {
            price = oprionPrice;
        }

        return price;
    }

    let totalSum = 0;

    function calculatePrice() {
        let price = 0;

        price += CONFIG.basePrices.size * CONFIG.coefficients.size[sizeSelect.value];
        price += calculateOption(constructCheckbox.checked, CONFIG.basePrices.construct);
        price += CONFIG.basePrices.climate * CONFIG.coefficients.climate[climateSelect.value];
        price += calculateOption(toiletCheckbox.checked, CONFIG.basePrices.toilet);
        price += calculateOption(furnitureCheckbox.checked, CONFIG.basePrices.furniture);
        price += calculateOption(fireAlarmCheckbox.checked, CONFIG.basePrices.fireAlarm);
        price += calculateOption(telephoneConnectionCheckbox.checked, CONFIG.basePrices.telephoneConnection);
        price += calculateOption(ventilationCheckbox.checked, CONFIG.basePrices.ventilation);
        price += calculateOption(heatingCheckbox.checked, CONFIG.basePrices.heating);

        price +=
            CONFIG.basePrices.videoSurveillance * CONFIG.coefficients.videoSurveillance[videoSurveillanceSelect.value];

        price +=
            CONFIG.basePrices.perimeterSecurityAlarm *
            CONFIG.coefficients.perimeterSecurityAlarm[perimeterSecurityAlarmSelect.value];

        price +=
            CONFIG.basePrices.securityAlarmSystem *
            CONFIG.coefficients.securityAlarmSystem[securityAlarmSystemSelect.value];

        price += calculateOption(securityLightingSystemCheckbox.checked, CONFIG.basePrices.securityLightingSystem);
        price += CONFIG.basePrices.accessControl * CONFIG.coefficients.accessControl[accessControlSelect.value];

        price +=
            CONFIG.basePrices.passageProtection * CONFIG.coefficients.passageProtection[passageProtectionSelect.value];

        totalPriceElement.textContent = price.toLocaleString();
        totalSum = price;
    }

    document.querySelectorAll("input[type='checkbox'], select").forEach((el) => {
        el.addEventListener("change", calculatePrice);
    });

    let isValidOrgName = false;
    let isValidEmail = false;
    let isValidPhone = false;

    function validateOrgName() {
        const name = orgNameInput.value.trim();

        if (name === "") {
            orgNameInput.classList.add("is-error");
            orgNameErrors.textContent = "Это поле обязательное";
            return false;
        } else {
            orgNameInput.classList.remove("is-error");
            orgNameErrors.textContent = "";
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") {
            emailInput.classList.add("is-error");
            emailErrors.textContent = "Введите email";
            return false;
        } else if (!emailPattern.test(email.toLowerCase())) {
            emailInput.classList.add("is-error");
            emailErrors.textContent = "Введите корректный email";
            return false;
        } else {
            emailInput.classList.remove("is-error");
            emailErrors.textContent = "";
            return true;
        }
    }

    function validateTel() {
        const tel = telInput.value.trim();
        const telPattern = /^(\+?\d+)$/;

        if (tel === "") {
            telInput.classList.add("is-error");
            telErrors.textContent = "Введите номер телефона";
            return false;
        } else if (!telPattern.test(tel)) {
            telInput.classList.add("is-error");
            telErrors.textContent = "Допустимы только цифры (и + в начале номера)";
            return false;
        } else {
            telInput.classList.remove("is-error");
            telErrors.textContent = "";
            return true;
        }
    }

    function validateForm() {
        const isOrgNameValid = validateOrgName();
        const isEmailValid = validateEmail();
        const isTelValid = validateTel();

        submitButton.disabled = !(isOrgNameValid && isEmailValid && isTelValid);
    }

    orgNameInput.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);
    telInput.addEventListener("input", validateForm);

    calculatePrice();

    configForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            size: sizeSelect.selectedOptions[0].value,
            climate: climateSelect.selectedOptions[0].value,
            toilet: toiletCheckbox.checked,
            furniture: furnitureCheckbox.checked,
            fireAlarm: fireAlarmCheckbox.checked,
            ventilation: ventilationCheckbox.checked,
            heating: heatingCheckbox.checked,
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
