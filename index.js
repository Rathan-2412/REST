function handleFormSubmit(event) {
    event.preventDefault();
  
    const userDetails = {
      product: event.target.product.value,
      price: event.target.price.value,
      categories: event.target.categories.value,
    };
  
    axios
      .post(
        "https://crudcrud.com/api/ff85a1962a7e4d2e8f93b1f1f268d8f1/Products",
        userDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data);
      })
      .catch((error) => console.log("Error posting data:", error));
  
    // Clear form fields
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/ff85a1962a7e4d2e8f93b1f1f268d8f1/Products")
      .then((res) => {
        res.data.forEach((user) => displayUserOnScreen(user));
      })
      .catch((err) => console.log("Error fetching data:", err));
  });
  
  function displayUserOnScreen(userDetails) {
    const productItem = document.createElement("li");
    productItem.textContent = `Product: ${userDetails.product}, Price: $${userDetails.price} , Category: ${userDetails.categories}`;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Order";
    deleteButton.style.marginLeft = "10px";
  
    // Append delete button to the product item
    productItem.appendChild(deleteButton);
  
    // Handle delete button click
    deleteButton.addEventListener("click", () => {
      axios
        .delete(
          `https://crudcrud.com/api/ff85a1962a7e4d2e8f93b1f1f268d8f1/Products/${userDetails._id}`
        )
        .then(() => {
          productItem.remove();
        })
        .catch((error) =>
          console.error("Error deleting user:", error)
        );
    });
  
    const categoryListId = `${userDetails.categories}-list`;
    const categoryList = document.getElementById(categoryListId);
    if (categoryList) {
      categoryList.appendChild(productItem);
    } else {
      console.error("Invalid category:", userDetails.categories);
    }
  }
  