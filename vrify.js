const verifyBtn = document.querySelector("button");
const inputs = document.querySelectorAll("input");


inputs.forEach((input, index)=> {
  input.addEventListener("keyup", (evt) => {
         let key = evt.keyCode;
         if(key === 8 || key=== 46){  
          if(index > 0){
            inputs[index - 1].focus()
          }
         }
         else{
          if(index != inputs.length -1) {
            inputs[index +1].focus()
          }
         }
  })
})


verifyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (isValid) {
    const code =
      inputs[0].value + inputs[1].value + inputs[2].value + inputs[3].value;

    console.log(code);
    let usermail = localStorage.getItem("user_email");
    var formdata = new FormData();
    formdata.append("Email", usermail);
    formdata.append("Code", code);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://185.217.131.186:81/api/accounts/verify-email", requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("something went wrong");
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("X-Access-Token", data);
        window.location = "./src/chat_ui.html"
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
