const userName = document.querySelector("#user") as HTMLInputElement;
const form = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main-container") as HTMLElement;

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

const myCustomFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  const data = await response.json();
  //   console.log(data);

  return data;
};
const showData = (user: UserData) => {


    
};
const fetchUser = (url: string) => {
  myCustomFetcher<UserData[]>(url, {}).then((users) => {
    for (const user of users) {
      showData(user);
      console.log(user.id, user);
    }
  });
};

fetchUser("https://api.github.com/users");
