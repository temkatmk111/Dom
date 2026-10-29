const ShowGeneratedPasswordInput = document.getElementById(
  "ShowGeneratedPassword",
);
const Copy = document.getElementById("Copy");
const Message = document.getElementById("Message");
const ShowLenght = document.getElementById("ShowLenght");
const InputLength = document.getElementById("InputLength");
const GeneratePasswordButton = document.getElementById(
  "GeneratePasswordButton",
);

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const ShowGeneratedPassword = () => {
let password = "";
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;
  for (let i = 0; i < Number(InputLength.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] > limit);
    password += characters[random[0] % characters.length];
  }
  ShowGeneratedPasswordInput.textContent = password;
};

const generatePasswordFromRange = () => {
  ShowLenght.textContent = InputLength.value;
  ShowGeneratedPassword();
};
const CopiedPassword = () =>{
    navigator.clipboard.writeText(ShowGeneratedPasswordInput.textContent)
    Copy.textContent = "copied"
    Message.textContent = "Password copied to clipboard"
    setTimeout(() =>{
        Copy.textContent="copy"
        Message.textContent="Uses letters, numbers, and symbols."
    },1500)
}
Copy.addEventListener("click" , CopiedPassword)
InputLength.addEventListener("input", generatePasswordFromRange);
GeneratePasswordButton.addEventListener("click", ShowGeneratedPassword);
ShowGeneratedPassword();
