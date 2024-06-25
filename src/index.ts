const getUsernameInput = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const mainContainer = document.querySelector(".main_container") as HTMLElement;

interface UserData {
  login: string;
  avatar_url: string;
  html_url: string;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Network response was not ok - status: ${response.status}`);
  return response.json();
}

const showUserCard = ({ avatar_url, login, html_url }: UserData) => {
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

async function fetchUserData(username: string) {
  try {
    const userInfo = await fetchJSON<UserData>(
      `https://api.github.com/users/${username}`
    );
    mainContainer.innerHTML = "";
    showUserCard(userInfo);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

async function fetchRandomUsers() {
  try {
    const randomUserList = await fetchJSON<{ items: UserData[] }>(
      "https://api.github.com/search/users?q=type:user&per_page=12"
    );
    mainContainer.innerHTML = "";
    randomUserList.items.forEach(showUserCard);
  } catch (error) {
    console.error("Error fetching random users:", error);
  }
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = getUsernameInput.value.trim().toLowerCase();
  if (searchTerm) fetchUserData(searchTerm);
});

document.addEventListener("DOMContentLoaded", fetchRandomUsers);

getUsernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const searchTerm = getUsernameInput.value.trim().toLowerCase();
    if (searchTerm) fetchUserData(searchTerm);
  }
});
