"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getUsernameInput = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main_container");
function fetchJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Network response was not ok - status: ${response.status}`);
        return response.json();
    });
}
const showUserCard = ({ avatar_url, login, html_url }) => {
    const cardTemplate = `
    <div class="card">
      <img src="${avatar_url}" alt="${login}" />
      <hr />
      <div class="card-footer">
        <img src="${avatar_url}" alt="${login}" />
        <a href="${html_url}" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </div>
  `;
    mainContainer.insertAdjacentHTML("beforeend", cardTemplate);
};
function fetchUserData(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = yield fetchJSON(`https://api.github.com/users/${username}`);
            mainContainer.innerHTML = "";
            showUserCard(userInfo);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    });
}
function fetchRandomUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const randomUserList = yield fetchJSON("https://api.github.com/search/users?q=type:user&per_page=12");
            mainContainer.innerHTML = "";
            randomUserList.items.forEach(showUserCard);
        }
        catch (error) {
            console.error("Error fetching random users:", error);
        }
    });
}
formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = getUsernameInput.value.trim().toLowerCase();
    if (searchTerm)
        fetchUserData(searchTerm);
});
document.addEventListener("DOMContentLoaded", fetchRandomUsers);
getUsernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = getUsernameInput.value.trim().toLowerCase();
        if (searchTerm)
            fetchUserData(searchTerm);
    }
});
