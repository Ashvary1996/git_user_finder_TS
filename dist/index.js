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
const userName = document.querySelector("#user");
const form = document.querySelector("#form");
const main_container = document.querySelector(".main-container");
const myCustomFetcher = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, options);
    const data = yield response.json();
    //   console.log(data);
    return data;
});
const showData = (user) => {
};
const fetchUser = (url) => {
    myCustomFetcher(url, {}).then((users) => {
        for (const user of users) {
            showData(user);
            console.log(user.id, user);
        }
    });
};
fetchUser("https://api.github.com/users");
