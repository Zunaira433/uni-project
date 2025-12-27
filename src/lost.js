const searchInput = document.getElementById("searchInput")
function saveLostItem(item) {
  const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
  lostItems.push(item);
  localStorage.setItem("lostItems", JSON.stringify(lostItems));
}


function printItems(items = null) {
  const container = document.getElementById("lostItemsContainer");
  if (!container) return;

  container.innerHTML = "";                                    

  const lostItems = items || JSON.parse(localStorage.getItem("lostItems")) || [];

  lostItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "w-72 bg-white rounded-xl shadow-md overflow-hidden border hover:scale-105 transition";

    card.innerHTML = `
      <div class="h-36 bg-gray-200 flex items-center justify-center">
        <img src="${item.image || 'images/placeholder.jpg'}" class="h-36 w-full object-cover">
      </div>

      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">${item.itemName}</h3>
        <p class="text-sm text-gray-600"><span class="font-medium">Item ID:</span> ${item.id}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Lost at:</span> ${item.location}</p>
        <p class="text-sm text-gray-600"><span class="font-medium">Date:</span> ${item.dateLost}</p>
        <p class="text-sm text-gray-700">${item.description}</p>
        <span class="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          ${item.status || "Pending"}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  printItems(); 

  const lostForm = document.querySelector('.lost_form');
  if (!lostForm) return;

  lostForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const lostFormElements = {
      id : Date.now(),
      itemName: document.querySelector('.lost_title').value,
      category: document.querySelector('.lost_category select').value,
      description: document.querySelector('.lost_description').value,
      dateFound: document.querySelector('.lost_date').value,
      location: document.querySelector('#lostLocation').value,
      studentName: document.querySelector('#lostStudentName').value,
      studentId: document.querySelector('#lostStudentId').value,
      email: document.querySelector('#lostStudentEmail').value,
      phone: document.querySelector('#lostStudentPhone').value,
      image: '' 
    };

    saveLostItem(lostFormElements);
    alert('Lost item submitted successfully!');
    lostForm.reset();
  });
});


searchInput.addEventListener("input", function() { 
  const query = searchInput.value.toLowerCase()
  const items = JSON.parse(localStorage.getItem("lostItems")) || [];

  const filtered = items.filter(item => 
    item.itemName.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
  printItems(filtered)
});


console.log(searchInput.value)


