console.log("Trying to show cat");

interface Cat {
    id: number,
    image: string
}

const generateRandomNumber = (minValue: number, maxValue: number) => {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue) - 1;
};

//---------Find cat by random ID---------
const formHandleCatByID = document.getElementById(`handleCatByID`) as HTMLFormElement;
formHandleCatByID.addEventListener('submit', getCatByID);

async function getCatByID(event: any) {
    try {
        event.preventDefault();

        const catId = [generateRandomNumber(2, 21)];
        console.log(catId);

        //@ts-ignore 
        const { data } = await axios.get(`/api/cats/list/${catId}`);

        const { success, cat } = data;
        console.log(cat);
        renderCat(cat);

    } catch (error) {
        console.error(error);
    }
}

//--------Show Cats One By One---------
const formhandleCatsOneByOne = document.getElementById(`handleCatsOneByOne`) as HTMLFormElement;
formhandleCatsOneByOne.addEventListener('submit', getCatsOneByOne);
let arrayID: number = 1;

async function getCatsOneByOne(event: any) {
    try {
        event.preventDefault();

        const catId = arrayID;

        console.log(catId);

        //@ts-ignore 
        const { data } = await axios.get(`/api/cats/list/${catId}`);

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
    } catch (error) {
        console.error(error);
    }
}

//--------Show 5 unique photos---------
const formhandleUniquePhotos = document.getElementById(`handUniquePhotos`) as HTMLFormElement;
formhandleUniquePhotos.addEventListener('submit', handleUniquePhotos);
let uniquePhotoArray: Cat[] = [];

async function handleUniquePhotos(event: any) {
    try {
        event.preventDefault();

        let i: number = 0;

        while (i <= 20 && uniquePhotoArray.length < 5) {
            const catId = [generateRandomNumber(2, 21)];

            //@ts-ignore 
            const { data } = await axios.get(`/api/cats/list/${catId}`);
            const { success, cat } = data;           

            if (getUniqueCatImages(cat) == `unique`) {
                console.log(cat.image);
                renderCat(cat);
            }

            i++;
        }

    } catch (error) {
        console.error(error);
    }
}

const getUniqueCatImages = (cat: Cat) => {

    let searchItem = cat.image;
    if (!uniquePhotoArray.find(element => element.image === searchItem)) {
        uniquePhotoArray.push({ "id": cat.id, "image": cat.image });
        return `unique`
    }
    else {
        return `not unique`
    }
}

const renderCat = (cat: { id: number, image: string }) => {
    const cardList = document.querySelector(`.card_list`) as HTMLDivElement;
    const divCard = document.createElement(`div`) as HTMLDivElement;
    divCard.classList.add(`card`);
    const img = document.createElement(`img`) as HTMLImageElement;
    img.src = cat.image;
    appendChildElement(divCard, img);
    appendChildElement(cardList, divCard);
}

const appendChildElement = (father: HTMLElement, son: HTMLElement) => {
    father.appendChild(son);
}



