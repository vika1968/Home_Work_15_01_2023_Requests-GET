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
console.log("Trying to show cat");
const generateRandomNumber = (minValue, maxValue) => {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue) - 1;
};
//---------Find cat by random ID---------
const formHandleCatByID = document.getElementById(`handleCatByID`);
formHandleCatByID.addEventListener('submit', getCatByID);
function getCatByID(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const catId = [generateRandomNumber(2, 21)];
            console.log(catId);
            //@ts-ignore 
            const { data } = yield axios.get(`/api/cats/list/${catId}`);
            const { success, cat } = data;
            console.log(cat);
            renderCat(cat);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//--------Show Cats One By One---------
const formhandleCatsOneByOne = document.getElementById(`handleCatsOneByOne`);
formhandleCatsOneByOne.addEventListener('submit', getCatsOneByOne);
let arrayID = 1;
function getCatsOneByOne(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const catId = arrayID;
            console.log(catId);
            //@ts-ignore 
            const { data } = yield axios.get(`/api/cats/list/${catId}`);
            const { success, cat, arrayLen } = data;
            console.log(cat);
            if (arrayID == arrayLen + 1) {
                arrayID = 1;
                alert(`We got to the end of the array`);
                location.reload();
                return;
            }
            arrayID == arrayID++;
            renderCat(cat);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//--------Show 5 unique photos---------
const formhandleUniquePhotos = document.getElementById(`handUniquePhotos`);
formhandleUniquePhotos.addEventListener('submit', handleUniquePhotos);
let uniquePhotoArray = [];
function handleUniquePhotos(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            let i = 0;
            while (i <= 20 && uniquePhotoArray.length < 5) {
                const catId = [generateRandomNumber(2, 21)];
                //@ts-ignore 
                const { data } = yield axios.get(`/api/cats/list/${catId}`);
                const { success, cat } = data;
                if (getUniqueCatImages(cat) == `unique`) {
                    console.log(cat.image);
                    renderCat(cat);
                }
                i++;
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
const getUniqueCatImages = (cat) => {
    let searchItem = cat.image;
    if (!uniquePhotoArray.find(element => element.image === searchItem)) {
        uniquePhotoArray.push({ "id": cat.id, "image": cat.image });
        return `unique`;
    }
    else {
        return `not unique`;
    }
};
const renderCat = (cat) => {
    const cardList = document.querySelector(`.card_list`);
    const divCard = document.createElement(`div`);
    divCard.classList.add(`card`);
    const img = document.createElement(`img`);
    img.src = cat.image;
    appendChildElement(divCard, img);
    appendChildElement(cardList, divCard);
};
const appendChildElement = (father, son) => {
    father.appendChild(son);
};
