let cards = [];

function addCards() {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvc").value;

    if (cardNumber.trim() === "" || expiryDate.trim() === "" || cvv.trim() === "") {
        alert("Hãy nhập lại");
        return;
    }
    let hideNumbers = ["0", "1", "2", "3", "4", "5", "6"];
    hideNumbers.forEach((number) => {
        cardNumber = cardNumber.replaceAll(number, "*");
    });

    let card = {
        cardNumber,
        expiryDate,
        cvv
    };

    cards.push(card);
    renderCards();
    resetForm();
}

function renderCards() {
    let cardBody = document.getElementById("CardBody");
    cardBody.innerHTML = "";

    cards.forEach((card, index) => {
        const row = document.createElement("tr");
        const cardImgCell = document.createElement("td");
        
        const cardImg = document.createElement("img");
        cardImg.src = getCardImage(card.cardNumber);
        cardImg.alt = "Card Image";
        cardImg.style.width = "100px";
        cardImg.style.height = "50px";
        cardImgCell.appendChild(cardImg);
        row.appendChild(cardImgCell);

        const cardNumberCell = document.createElement("td");
        cardNumberCell.textContent = card.cardNumber;
        row.appendChild(cardNumberCell);

        const expiryDateCell = document.createElement("td");
        expiryDateCell.textContent = card.expiryDate;
        row.appendChild(expiryDateCell);

        const cvvCell = document.createElement("td");
        cardNumberCell.innerText = card.cardNumber;
        row.appendChild(cvvCell);

        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Sửa";
        editButton.addEventListener("click", () => editCard(index));
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.addEventListener("click", () => deleteCard(index));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        cardBody.appendChild(row);
    });
}

function resetForm() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("cvc").value = "";
}

function getCardImage(cardNumber) {
    if (cardNumber.startsWith("4")) {
        return "./images/visa.jpg";
    } else if (cardNumber.startsWith("5")) {
        return "./images/mastercard.jpg";
    } else if (cardNumber.startsWith("3")) {
        return "./images/american express.jpg";
    } else {
        return "./images/discover.jpg";
    }
}

function deleteCard(index) {
    cards.splice(index, 1);
    renderCards();
}

function editCard(index) {
    const card = cards[index];
    document.getElementById("cardNumber").value = card.cardNumber;
    document.getElementById("expiryDate").value = card.expiryDate;
    document.getElementById("cvc").value = card.cvv;

    const addButton = document.getElementById("addButton");
    addButton.textContent = "Submit";
    addButton.removeEventListener("click", addCards);
    addButton.addEventListener("click", () => saveCard(index));
    cards.splice(index,1);
    renderCards();
}

function saveCard(index) {
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvc").value;

    if (cardNumber.trim() === "" || expiryDate.trim() === "" || cvv.trim() === "") {
        alert("Hãy nhập lại");
        return;
    }

    let card = {
        cardNumber,
        expiryDate,
        cvv
    };

    cards[index] = card;
    renderCards();
    resetForm();

    const addButton = document.getElementById("addButton");
    addButton.textContent = "Thêm";
    addButton.removeEventListener("click", saveCard);
    addButton.addEventListener("click", addCards);
}