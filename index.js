// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    product: event.target.product.value,
    price: event.target.price.value,
    categories: event.target.categories.value,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/454e4a126dbd4e4d9630561a9296b271/Products",
      userDetails
    );
    displayUserOnScreen(response.data);
  } catch (error) {
    console.error("Error posting data:", error);
  }

  // Clear form fields
  document.getElementById("product").value = "";
  document.getElementById("price").value = "";
}

// Fetch data on DOMContentLoaded
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/454e4a126dbd4e4d9630561a9296b271/Products"
    );
    response.data.forEach((user) => displayUserOnScreen(user));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Display user on screen
function displayUserOnScreen(userDetails) {
  const productItem = document.createElement("li");
  productItem.textContent = `Product: ${userDetails.product}, Price: $${userDetails.price} , Category: ${userDetails.categories}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Order";
  deleteButton.style.marginLeft = "10px";

  // Append delete button to the product item
  productItem.appendChild(deleteButton);

  // Handle delete button click
  deleteButton.addEventListener("click", async () => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/454e4a126dbd4e4d9630561a9296b271/Products/${userDetails._id}`
      );
      productItem.remove();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  });

  const categoryListId = `${userDetails.categories}-list`;
  const categoryList = document.getElementById(categoryListId);
  if (categoryList) {
    categoryList.appendChild(productItem);
  } else {
    console.error("Invalid category:", userDetails.categories);
  }
}