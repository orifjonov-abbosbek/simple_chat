let elSignIn = document.getElementById("signin");
let elModal = document.getElementById("modal");

elSignIn.onclick = function () {
  elModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target === elModal) {
    elModal.style.display = "none";
  }
};

let elModalFormBtn = document.getElementById("createacc");

elModalFormBtn.addEventListener("click", () => {
  let elFullName = document.getElementById("m-fullname");
  let elMemail = document.getElementById("m-email");
  let elMpassword = document.getElementById("m-password");

  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("FullName", elFullName.value);
  formdata.append("Email", elMemail.value);
  formdata.append("Password", elMpassword.value);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch("http://185.217.131.186:81/api/accounts/register", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .then((result) => {
      console.log(result);
      window.location = "/src/succes_register.html";
      let usermail = elMemail.value;
      localStorage.setItem("user_email", usermail);

      var formdatas = new FormData();
      formdatas.append("Email", usermail);

      var newrequestOptions = {
        method: "POST",
        body: formdatas,
      };

      return fetch(
        "http://185.217.131.186:81/api/accounts/send-to-email",
        newrequestOptions
      );
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});


let loginBtn = document.getElementById("js-login-btn");

loginBtn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  
  let elLogin = document.getElementById("login-email").value;
  let elPassword = document.getElementById("login-password").value;
  
  let loginFormdata = new FormData();
  
  loginFormdata.append("Email", elLogin);
  loginFormdata.append("Password", elPassword);
  
  const loginRequestOption = {
    method: "POST",
    body: loginFormdata
  };
  
  fetch("http://185.217.131.186:81/api/accounts/login", loginRequestOption)
  .then(response => response.text())
  .then(data => {
    localStorage.setItem("X-Access-Token", data.token);
    window.location = "/src/chatui.html";
  })
  .catch(error => console.error(error));
});
