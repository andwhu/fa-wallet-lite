// Pure JS:
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userAddress").addEventListener("click", copyAddress);
  document.getElementById("transferFund").addEventListener("click", handler);

    const openRestoreBtn = document.getElementById("openRestore");
  if (openRestoreBtn) openRestoreBtn.addEventListener("click", openRestore);

  const restoreCancelBtn = document.getElementById("restore_cancel");
  if (restoreCancelBtn) restoreCancelBtn.addEventListener("click", closeRestore);

  const restoreMnemonicBtn = document.getElementById("restore_mnemonic_btn");
  if (restoreMnemonicBtn) restoreMnemonicBtn.addEventListener("click", restoreByMnemonic);

  const restorePkBtn = document.getElementById("restore_privatekey_btn");
  if (restorePkBtn) restorePkBtn.addEventListener("click", restoreByPrivateKey);

  const backToLoginBtn = document.getElementById("back_to_login");
  if (backToLoginBtn) backToLoginBtn.addEventListener("click", backToLogin);
  
  document
    .getElementById("header_network")
    .addEventListener("click", getOpenNetwork);

  document
    .getElementById("network_item")
    .addEventListener("click", getSelectedNetwork);

  document.getElementById("add_network").addEventListener("click", setNetwork);

  document.getElementById("loginAccount").addEventListener("click", loginUser);

  document
    .getElementById("accountCreate")
    .addEventListener("click", createUser);

  document.getElementById("openCreate").addEventListener("click", openCreate);

  document.getElementById("sign_up").addEventListener("click", signUp);
  document.getElementById("login_up").addEventListener("click", login);
  document.getElementById("logout").addEventListener("click", logout);

  document
    .getElementById("open_Transfer")
    .addEventListener("click", openTransfer);

  document.getElementById("goBack").addEventListener("click", goBack);

  document.getElementById("open_Import").addEventListener("click", openImport);

  document
    .getElementById("goBack_import")
    .addEventListener("click", importGoBack);

  document.getElementById("open_assets").addEventListener("click", openAssets);

  document
    .getElementById("open_activity")
    .addEventListener("click", openActivity);

  document.getElementById("goHomePage").addEventListener("click", goHomePage);

  document
    .getElementById("openAccountImport")
    .addEventListener("click", openImportModel);

  document
    .getElementById("close_import_account")
    .addEventListener("click", closeImportModel);

  document.getElementById("add_new_token").addEventListener("click", addToken);

  document
    .getElementById("add_New_Account")
    .addEventListener("click", addAcount);

    const togglePassword = document.getElementById("toggle_password");
if (togglePassword) {
  togglePassword.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("login_password");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
  });
}

const network = document.getElementById("network");
if (network) {
  network.addEventListener("click", (e) => {
    if (e.target === network) network.style.display = "none";
  });
}
});

//NETWORKS RPC URL
const POLYGON = "https://rpc.ankr.com/polygon";
const POLYGON_AMOY = "https://rpc.ankr.com/polygon_amoy";
const ETHEREUM = "https://rpc.ankr.com/eth";
const SEPOLIA_TEST = "https://rpc.ankr.com/eth_sepolia";
const FINCHAINLAB = "https://rpc.finchainlab.ru";

let providerURL = FINCHAINLAB;

const allToken = [
  {
    name: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    symbol: "MATIC",
  },
  {
    name: "@theblockchaincoders",
    address: "0xb309098bcB51E5C687a16FA41bD6055f47c9eBb0",
    symbol: "TBC",
  },
];

let privateKey;
let address;

function handler() {
  document.getElementById("transfer_center").style.display = "flex";

  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;

  //PROVIDER
  const provider = new ethers.providers.JsonRpcProvider(providerURL);

  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  var a = document.getElementById("link");
  a.href = "somelink url";

  wallet.sendTransaction(tx)
  .then((txObj) => {
    console.log("txHash", txObj.hash);

    document.getElementById("transfer_center").style.display = "none";

    const a = document.getElementById("link");
    // ссылка на explorer finchainlab (проверьте формат, ниже дам вариант)
    a.href = `https://explorer.finchainlab.ru/tx/${txObj.hash}`;
    document.getElementById("link").style.display = "block";
  })
  .catch((err) => {
    console.error("Send tx error:", err);
    document.getElementById("transfer_center").style.display = "none";
    alert(err?.message || "Transaction failed");
  });
}

function checkBlance(address) {
  const provider = new ethers.providers.JsonRpcProvider(providerURL);
  provider.getBalance(address).then((balance) => {
    const balanceInEth = ethers.utils.formatEther(balance);

    console.log("MATIC", balanceInEth);

    document.getElementById(
      "accountBlance"
    ).innerHTML = `${balanceInEth} MATIC`;
    document.getElementById("userAddress").innerHTML = `${address.slice(
      0,
      15
    )}..`;
  });
}

function getOpenNetwork() {
  const network = document.getElementById("network");
  if (network) network.style.display = "block";
}

function getSelectedNetwork(e) {
  const element = document.getElementById("selected_network") || "Polygon Amoy";
  element.innerHTML = e.target.innerHTML;

  if (e.target.innerHTML === "Ethereum Mainnet") {
    providerURL = ETHEREUM;
    localStorage.setItem("ACTIVE_NETWORK", "Ethereum Mainnet");
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Mainnet") {
    providerURL = POLYGON;
    localStorage.setItem("ACTIVE_NETWORK", "Polygon Mainnet");
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Polygon Amoy") {
    providerURL = POLYGON_AMOY;
    localStorage.setItem("ACTIVE_NETWORK", "Polygon Amoy");
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Sepolia test network") {
    providerURL = SEPOLIA_TEST;
    localStorage.setItem("ACTIVE_NETWORK", "Sepolia test network");
    document.getElementById("network").style.display = "none";
  } else if (e.target.innerHTML === "Finchainlab") {
    providerURL = FINCHAINLAB;
    localStorage.setItem("ACTIVE_NETWORK", "Finchainlab");
    document.getElementById("network").style.display = "none";
  }

  console.log(providerURL);
}

function setNetwork() {
  const network = document.getElementById("network");
  if (network) network.style.display = "none";
}

function loginUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "block";
}

function openRestore() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "none";
  document.getElementById("restore_wallet").style.display = "block";
}

function closeRestore() {
  document.getElementById("restore_wallet").style.display = "none";
  document.getElementById("createAccount").style.display = "block";
}

function restoreByMnemonic() {
  const phrase = document.getElementById("restore_mnemonic").value.trim();

  try {
    const wallet = ethers.Wallet.fromMnemonic(phrase);

    const userWallet = {
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: phrase,
    };

    localStorage.setItem("userWallet", JSON.stringify(userWallet));
    window.location.reload();
  } catch (e) {
    alert("Seed phrase неверная. Проверьте слова и пробелы.");
    console.error(e);
  }
}

function restoreByPrivateKey() {
  let pk = document.getElementById("restore_private_key").value.trim();
  if (pk && !pk.startsWith("0x")) pk = "0x" + pk;

  try {
    const wallet = new ethers.Wallet(pk);

    const userWallet = {
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: "",
    };

    localStorage.setItem("userWallet", JSON.stringify(userWallet));
    window.location.reload();
  } catch (e) {
    alert("Private key неверный. Обычно это 64 hex символа (часто с 0x).");
    console.error(e);
  }
}

function createUser() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("LoginUser").style.display = "none";
}

function openCreate() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("create_popUp").style.display = "block";
}

function backToLogin() {
  // закрываем экран регистрации
  const createPopUp = document.getElementById("create_popUp");
  if (createPopUp) createPopUp.style.display = "none";

  // открываем экран входа
  const login = document.getElementById("LoginUser");
  if (login) login.style.display = "block";

  // (опционально) сбросить лоадер/форму на регистрации, если вы их прячете
  const field = document.getElementById("field");
  const center = document.getElementById("center");
  if (field) field.style.display = "block";
  if (center) center.style.display = "none";
}

// ✅ LOCAL SIGN UP
function signUp() {
  const name = document.getElementById("sign_up_name").value.trim();
  const email = document.getElementById("sign_up_email").value.trim();
  const password = document.getElementById("sign_up_password").value.trim();
  const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value.trim();

if (!name || !email || !password || !passwordConfirm) {
  alert("Заполните все поля");
  return;
}
if (password !== passwordConfirm) {
  alert("Пароли не совпадают");
  return;
}

  document.getElementById("field").style.display = "none";
  document.getElementById("center").style.display = "block";

  const wallet = ethers.Wallet.createRandom();

  const user = {
    name,
    email,
    password,
    passwordConfirm,
    address: wallet.address,
    private_key: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem(
    "userWallet",
    JSON.stringify({
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    })
  );

  document.getElementById("createdAddress").innerHTML = wallet.address;
  document.getElementById("createdPrivateKey").innerHTML = wallet.privateKey;
  document.getElementById("createdMnmonic").innerHTML = wallet.mnemonic.phrase;
  document.getElementById("center").style.display = "none";
  document.getElementById("accountData").style.display = "block";
  document.getElementById("sign_up").style.display = "none";
  document.getElementById("goHomePage").style.display = "block";
}

// ✅ LOCAL LOGIN
function login() {
  
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";

  const email = document.getElementById("login_email").value.trim();
const password = document.getElementById("login_password").value.trim();

if (!email || !password) {
  alert("Введите email и пароль");
  document.getElementById("center").style.display = "none";
  document.getElementById("login_form").style.display = "block";
  return;
}

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email === email && user.password === password) {
    localStorage.setItem(
      "userWallet",
      JSON.stringify({
        address: user.address,
        private_key: user.private_key,
        mnemonic: user.mnemonic,
      })
    );
    window.location.reload();
  } else {
    alert("Неверный email или пароль");
    document.getElementById("center").style.display = "none";
    document.getElementById("login_form").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("userWallet");
  window.location.reload();
}

function openTransfer() {
  document.getElementById("transfer_form").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function goBack() {
  document.getElementById("transfer_form").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImport() {
  document.getElementById("import_token").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function importGoBack() {
  document.getElementById("import_token").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openActivity() {
  document.getElementById("activity").style.display = "block";
  document.getElementById("assets").style.display = "none";
}

function openAssets() {
  document.getElementById("activity").style.display = "none";
  document.getElementById("assets").style.display = "block";
}

function goHomePage() {
  // закрыть регистрацию
  document.getElementById("create_popUp").style.display = "none";

  // открыть экран входа
  document.getElementById("LoginUser").style.display = "block";

  // на всякий случай: home прячем, чтобы не мигал/не перекрывал
  const home = document.getElementById("home");
  if (home) home.style.display = "none";
}

function openImportModel() {
  document.getElementById("import_account").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function closeImportModel() {
  document.getElementById("import_account").style.display = "none";
  document.getElementById("home").style.display = "block";
}

// ✅ LOCAL TOKENS
function addToken() {
  const address = document.getElementById("token_address").value;
  const name = document.getElementById("token_name").value;
  const symbol = document.getElementById("token_symbol").value;

  const tokens = JSON.parse(localStorage.getItem("tokens") || "[]");
  tokens.push({ address, name, symbol });
  localStorage.setItem("tokens", JSON.stringify(tokens));

  window.location.reload();
}

// ✅ LOCAL ACCOUNTS
function addAcount() {
  const privateKey = document.getElementById("add_account_private_key").value;

  const provider = new ethers.providers.JsonRpcProvider(providerURL);
  let wallet = new ethers.Wallet(privateKey, provider);

  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  accounts.push({ address: wallet.address, privateKey });
  localStorage.setItem("accounts", JSON.stringify(accounts));

  closeImportModel();
}

function myFunction() {
  const str = localStorage.getItem("userWallet");
  const parsedObj = JSON.parse(str);

  // Restore selected network (default: Finchainlab)
const savedNetwork = localStorage.getItem("ACTIVE_NETWORK") || "Finchainlab";

if (savedNetwork === "Finchainlab") providerURL = FINCHAINLAB;
else if (savedNetwork === "Polygon Amoy") providerURL = POLYGON_AMOY;
else if (savedNetwork === "Polygon Mainnet") providerURL = POLYGON;
else if (savedNetwork === "Ethereum Mainnet") providerURL = ETHEREUM;
else if (savedNetwork === "Sepolia test network") providerURL = SEPOLIA_TEST;

// Update header label
const networkEl = document.getElementById("selected_network");
if (networkEl) networkEl.innerHTML = savedNetwork;

  if (parsedObj?.address) {
    document.getElementById("LoginUser").style.display = "none";
    document.getElementById("home").style.display = "block";
    privateKey = parsedObj.private_key;
    address = parsedObj.address;

    checkBlance(parsedObj.address);
  }

  // ✅ TOKENS LOCAL
  const tokenRender = document.querySelector(".assets");
  const tokens = JSON.parse(localStorage.getItem("tokens") || "[]");
  let elements = "";
  tokens.forEach((token) => {
    elements += `
      <div class="assets_item">
        <img class="assets_item_img" src="./assets/theblockchaincoders.png" alt="" />
        <span>${token.address.slice(0, 15)}...</span>
        <span>${token.symbol}</span>
      </div>
    `;
  });
  tokenRender.innerHTML = elements;

  // ✅ ACCOUNTS LOCAL
  const accountRender = document.querySelector(".accountList");
  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  let accountsHtml = "";
  accounts.forEach((account, i) => {
    accountsHtml += `
      <div class="lists">
        <p>${i + 1}</p>
        <p class="accountValue" data-address="${account.address}" data-privateKey="${account.privateKey}">
          ${account.address.slice(0, 25)}..
        </p>
      </div>
    `;
  });
  accountRender.innerHTML = accountsHtml;

  const accountElements = document.querySelectorAll(".lists");
  accountElements.forEach((element) => {
    element.addEventListener("click", function () {
      changeAccount(element);
    });
  });
}

function copyAddress() {
  navigator.clipboard.writeText(address);
}

function changeAccount(element) {
  const data = element.querySelector(".accountValue");
  const address = data.getAttribute("data-address");
  const privateKey = data.getAttribute("data-privateKey");

  const userWallet = {
    address: address,
    private_key: privateKey,
    mnemonic: "Changed",
  };

  const jsonObj = JSON.stringify(userWallet);
  localStorage.setItem("userWallet", jsonObj);
  window.location.reload();
}

window.onload = myFunction;