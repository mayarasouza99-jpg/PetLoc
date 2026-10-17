document.addEventListener("DOMContentLoaded", () => {

  // --- FILTRO DE CATEGORIAS DA LOJA (INICIA EM RAÇÕES) ---
  const filterButtons = document.querySelectorAll(".chip");
  const productCards = document.querySelectorAll("#products-grid .card");

  // Esconde inicialmente os produtos que não pertencem à categoria "Rações"
  productCards.forEach(card => {
    if (card.getAttribute("data-category") !== "racoes") {
      card.classList.add("hidden");
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      productCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (cardCategory === filterValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // --- LÓGICA DO CARRINHO DE COMPRAS ---
  let cartItemsCount = 0;
  const cartCountElement = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      cartItemsCount++;
      if (cartCountElement) {
        cartCountElement.textContent = cartItemsCount;
      }
      
      const originalText = button.textContent;
      button.textContent = "Adicionado!";
      button.style.backgroundColor = "#00AFCB";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 1000);
    });
  });

  // --- LÓGICA DO CARROSSEL DE SENSORES ---
  const page1 = document.getElementById("sensor-page-1");
  const page2 = document.getElementById("sensor-page-2");
  const prevBtn = document.getElementById("prev-sensor");
  const nextBtn = document.getElementById("next-sensor");

  let currentPage = 1;

  function toggleSensorPage() {
    if (currentPage === 1) {
      page1.classList.add("active");
      page2.classList.remove("active");
    } else {
      page1.classList.remove("active");
      page2.classList.add("active");
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentPage = currentPage === 1 ? 2 : 1;
      toggleSensorPage();
    });

    nextBtn.addEventListener("click", () => {
      currentPage = currentPage === 1 ? 2 : 1;
      toggleSensorPage();
    });
  }

  // --- LÓGICA DO FORMULÁRIO DE AGENDAMENTO ---
  const bookingForm = document.getElementById("booking-form");
  const confirmBox = document.getElementById("confirm");
  const summaryText = document.getElementById("summary");
  const newBookingBtn = document.getElementById("new-booking");

  if (bookingForm) {
    const tutorInput = document.getElementById("tutor");
    const telInput = document.getElementById("tel");
    const petInput = document.getElementById("pet");
    const especieSelect = document.getElementById("especie");
    const servicoSelect = document.getElementById("servico");
    const dataInput = document.getElementById("data");
    const horaInput = document.getElementById("hora");

    const errTutor = document.getElementById("err-tutor");
    const errTel = document.getElementById("err-tel");
    const errPet = document.getElementById("err-pet");
    const errData = document.getElementById("err-data");
    const errHora = document.getElementById("err-hora");

    function clearErrors() {
      [errTutor, errTel, errPet, errData, errHora].forEach(el => {
        if (el) el.textContent = "";
      });
    }

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      if (!tutorInput.value.trim()) {
        errTutor.textContent = "Por favor, informe seu nome.";
        isValid = false;
      }

      if (!telInput.value.trim()) {
        errTel.textContent = "Por favor, informe um telefone.";
        isValid = false;
      }

      if (!petInput.value.trim()) {
        errPet.textContent = "Por favor, informe o nome do pet.";
        isValid = false;
      }

      if (!dataInput.value) {
        errData.textContent = "Escolha uma data.";
        isValid = false;
      }

      if (!horaInput.value) {
        errHora.textContent = "Escolha um horário.";
        isValid = false;
      }

      if (isValid) {
        const dataFormatada = new Date(dataInput.value + 'T00:00:00').toLocaleDateString('pt-BR');
        
        summaryText.innerHTML = `
          Agendamento solicitado para <strong>${petInput.value}</strong> (${especieSelect.value})<br>
          Serviço: <strong>${servicoSelect.value}</strong><br>
          Data: <strong>${dataFormatada}</strong> às <strong>${horaInput.value}</strong>.<br>
          Entraremos em contato com <strong>${tutorInput.value}</strong> pelo telefone <strong>${telInput.value}</strong>.
        `;

        bookingForm.hidden = true;
        confirmBox.hidden = false;
      }
    });

    if (newBookingBtn) {
      newBookingBtn.addEventListener("click", () => {
        bookingForm.reset();
        clearErrors();
        confirmBox.hidden = true;
        bookingForm.hidden = false;
      });
    }
  }
});