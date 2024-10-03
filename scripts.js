//ดึงเบอรจากชีตแล้วเอามาแสดงเป็นการ์ด
const cardContainer = document.getElementById('card-container');
        const selectedNumberInput = document.getElementById('selected-number');

        const spreadsheetId = '1SDsHmbx2x14JS7Qvf-AFC1ZSKxgXzyva3a1NPE74mDg';
        const sheetName = 'card_number';
        const range = 'A:A';

        const cardsPerPage = 12; // Number of cards to display per page
        let currentPage = 1;

        const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?sheet=${sheetName}&range=${range}&tqx=out:csv`;

        function updateCards(data) {
            cardContainer.innerHTML = ''; // Clear existing cards

            const rows = data.split('\n');
            const startIndex = (currentPage - 1) * cardsPerPage;
            const endIndex = Math.min(startIndex + cardsPerPage, rows.length - 1);

            for (let i = startIndex + 1; i <= endIndex; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.textContent = rows[i].replace(/"/g, '');
                card.addEventListener('click', () => {
                    cardContainer.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
                    card.classList.add('selected');
                    selectedNumberInput.value = card.textContent;
                });
                cardContainer.appendChild(card);
            }

            // Update navigation button states
            const prevButton = document.getElementById('prev-page');
            const nextButton = document.getElementById('next-page');

            prevButton.disabled = currentPage === 1;
            nextButton.disabled = endIndex === rows.length - 1;
        }

        fetch(url)
            .then(response => response.text())
            .then(data => {
                updateCards(data);

                // Navigation button event listeners
                const prevButton = document.getElementById('prev-page');
                const nextButton = document.getElementById('next-page');

                prevButton.addEventListener('click', () => {
                    currentPage--;
                    updateCards(data);
                });

                nextButton.addEventListener('click', () => {
                    currentPage++;
                    updateCards(data);
                });
            });
            
            
            

//ซ่อนแสดงรายละเอียด การจัดส่ง
function showValue() {
  const pickupOptions = document.getElementById('pickup-options');
  const deliveryOptions = document.getElementById('delivery-options');
  const selectedValue = document.querySelector('input[name="delivery"]:checked').value;

  if (selectedValue === 'นัดรับ') {
    pickupOptions.style.display = 'block';
    deliveryOptions.style.display = 'none';
  } else if (selectedValue === 'จัดส่ง') {
    pickupOptions.style.display = 'none';
    deliveryOptions.style.display = 'block';
  }
}



  // ฟังก์ชันนี้จะถูกเรียกใช้เมื่อส่งฟอร์มสำเร็จ
  function handleFormSubmit(event) {
    event.preventDefault();// ป้องกันการส่งฟอร์มแบบปกติ
      // ส่งข้อมูลไปยัง Google Apps Script
    fetch(event.target.action, {
      method: 'POST',
      body: new FormData(event.target)
     
    })
    .then(response => {
      if (response.ok) {
        // ถ้าส่งข้อมูลสำเร็จ ให้ Redirect ไปยัง Google.com
        window.location.href = "https://atsk44.w3spaces.com/successful.html";
             } else {
        // ถ้าเกิดข้อผิดพลาดในการส่งข้อมูล ให้แสดงข้อความแจ้งเตือน
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    });
  }

  // กำหนดให้ฟังก์ชัน handleFormSubmit ถูกเรียกใช้เมื่อมีการส่งฟอร์ม
  document.getElementById('myForm').addEventListener('submit', handleFormSubmit);

// ซ่อนปุ่มแสดงโหลดเดอร์
function checkForm() {
  const form = document.getElementById('myForm');
   
  if (form.checkValidity()) {
    // ถ้าฟอร์มถูกต้อง ให้ซ่อนปุ่ม
    document.getElementById('buttonSubmit').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';
  }
}
